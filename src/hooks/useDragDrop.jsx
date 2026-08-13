import { useState, useEffect, useRef, useCallback } from "react";
import { listen } from "@tauri-apps/api/event";
import { tauriCommands } from "../services/tauriCommands";
import { normalizePath, createResource } from "../utils/helpers";

export function useDragDrop(workspacesRef, selectedIdRef, setWorkspaces, showNotification) {
    const [isDragging, setIsDragging] = useState(false);
    const processingDropRef = useRef(false);

    // Store setWorkspaces in a ref
    const setWorkspacesRef = useRef(setWorkspaces);
    useEffect(() => {
        setWorkspacesRef.current = setWorkspaces;
    }, [setWorkspaces]);

    const handleDroppedPaths = useCallback(async (paths) => {
        const currentId = selectedIdRef.current;
        if (!currentId) {
            showNotification("Please select or create a workspace first before adding resources!", "warning");
            return;
        }

        const updatedWorkspaces = [...workspacesRef.current];
        const wsIndex = updatedWorkspaces.findIndex((ws) => ws.id === currentId);

        if (wsIndex === -1) {
            console.error("Workspace not found");
            return;
        }

        const currentWorkspace = { ...updatedWorkspaces[wsIndex] };

        // Create a Set of existing paths for faster lookup
        const existingPaths = new Set(
            currentWorkspace.resources.map(r => normalizePath(r.path))
        );

        const newResources = [];
        const processedPaths = new Set();

        for (const path of paths) {
            const normalizedPath = normalizePath(path);

            // Skip duplicates
            if (existingPaths.has(normalizedPath) || processedPaths.has(normalizedPath)) {
                continue;
            }

            try {
                const info = await tauriCommands.inspectPath(path);
                if (info.exists) {
                    const type = info.isDir ? "folder" : "file";
                    const newResource = createResource(path, type, info.name);
                    newResources.push(newResource);
                    processedPaths.add(normalizedPath);
                    console.log(`✅ Added: ${path} (${type})`);
                } else {
                    console.warn(`⚠️ Path does not exist: ${path}`);
                }
            } catch (e) {
                console.error(`❌ Failed to inspect path: ${path}`, e);
            }
        }

        if (newResources.length > 0) {
            console.log(`📦 Adding ${newResources.length} new resources`);

            updatedWorkspaces[wsIndex] = {
                ...currentWorkspace,
                resources: [...currentWorkspace.resources, ...newResources]
            };

            setWorkspacesRef.current(updatedWorkspaces);
            workspacesRef.current = updatedWorkspaces;

            await tauriCommands.saveWorkspaces(updatedWorkspaces);
            console.log('💾 Workspaces saved successfully');

            showNotification(`Successfully added ${newResources.length} resource(s)`, "success");
        } else {
            console.log('ℹ️ No new resources to add (all duplicates or invalid)');
        }
    }, [workspacesRef, selectedIdRef, showNotification]);

    useEffect(() => {
        let unlistenDragDrop;
        let unlistenDragOver;
        let unlistenDragLeave;

        const setupListeners = async () => {
            unlistenDragOver = await listen("tauri://drag-over", () => {
                setIsDragging(true);
            });

            unlistenDragLeave = await listen("tauri://drag-leave", () => {
                setIsDragging(false);
            });

            unlistenDragDrop = await listen("tauri://drag-drop", async (event) => {
                setIsDragging(false);

                if (processingDropRef.current) {
                    console.log("Already processing a drop, skipping this event");
                    return;
                }

                const paths = event.payload.paths;
                if (paths && paths.length > 0) {
                    processingDropRef.current = true;
                    try {
                        await handleDroppedPaths(paths);
                    } finally {
                        processingDropRef.current = false;
                    }
                }
            });
        };

        setupListeners();

        return () => {
            if (unlistenDragDrop) unlistenDragDrop();
            if (unlistenDragOver) unlistenDragOver();
            if (unlistenDragLeave) unlistenDragLeave();
        };
    }, [handleDroppedPaths]);

    return { isDragging };
}