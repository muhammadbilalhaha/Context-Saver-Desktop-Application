import { useState, useEffect, useRef, useCallback } from "react";
import { tauriCommands } from "../services/tauriCommands";
import { normalizePath, generateId, createResource } from "../utils/helpers";

/**
 * Custom hook for workspace management
 * Handles all CRUD operations for workspaces and their resources
 */
export function useWorkspaces() {
    const [workspaces, setWorkspaces] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    // Refs for latest state access in callbacks
    const workspacesRef = useRef(workspaces);
    const selectedIdRef = useRef(selectedId);

    // Keep refs synchronized with state
    useEffect(() => {
        workspacesRef.current = workspaces;
    }, [workspaces]);

    useEffect(() => {
        selectedIdRef.current = selectedId;
    }, [selectedId]);

    // Load workspaces on mount
    useEffect(() => {
        loadWorkspaces();
    }, []);

    const loadWorkspaces = async () => {
        try {
            const data = await tauriCommands.getWorkspaces();
            setWorkspaces(data);
            if (data.length > 0) {
                setSelectedId(data[0].id);
            }
        } catch (e) {
            console.error("Failed to load workspaces:", e);
        }
    };

    const createWorkspace = useCallback(async (name, description) => {
        const newWorkspace = {
            id: generateId(),
            name,
            description: description || null,
            createdAt: new Date().toISOString(),
            resources: [],
        };

        const updatedWorkspaces = [...workspacesRef.current, newWorkspace];
        setWorkspaces(updatedWorkspaces);
        setSelectedId(newWorkspace.id);
        await tauriCommands.saveWorkspaces(updatedWorkspaces);
    }, []);

    const deleteWorkspace = useCallback(async (id) => {
        const updatedWorkspaces = workspacesRef.current.filter((ws) => ws.id !== id);
        setWorkspaces(updatedWorkspaces);

        if (selectedIdRef.current === id) {
            setSelectedId(updatedWorkspaces.length > 0 ? updatedWorkspaces[0].id : null);
        }

        await tauriCommands.saveWorkspaces(updatedWorkspaces);
    }, []);

    const addResource = useCallback(async (path, type, name) => {
        const currentId = selectedIdRef.current;
        const wsIndex = workspacesRef.current.findIndex((ws) => ws.id === currentId);
        if (wsIndex === -1) return false;

        const currentWorkspace = workspacesRef.current[wsIndex];

        // Check for duplicates
        if (currentWorkspace.resources.some((r) => normalizePath(r.path) === normalizePath(path))) {
            console.log('Duplicate resource, skipping');
            return false;
        }

        const updatedWorkspaces = [...workspacesRef.current];
        updatedWorkspaces[wsIndex] = {
            ...currentWorkspace,
            resources: [...currentWorkspace.resources, createResource(path, type, name)]
        };

        setWorkspaces(updatedWorkspaces);
        await tauriCommands.saveWorkspaces(updatedWorkspaces);
        return true;
    }, []);

    const addLocalResource = useCallback(async (path) => {
        const currentId = selectedIdRef.current;
        const wsIndex = workspacesRef.current.findIndex((ws) => ws.id === currentId);
        if (wsIndex === -1) return false;

        const currentWorkspace = workspacesRef.current[wsIndex];

        // Check for duplicates
        if (currentWorkspace.resources.some((r) => normalizePath(r.path) === normalizePath(path))) {
            console.log('Duplicate resource, skipping');
            return false;
        }

        try {
            const info = await tauriCommands.inspectPath(path);
            if (info.exists) {
                const type = info.isDir ? "folder" : "file";
                const updatedWorkspaces = [...workspacesRef.current];
                updatedWorkspaces[wsIndex] = {
                    ...currentWorkspace,
                    resources: [...currentWorkspace.resources, createResource(path, type, info.name)]
                };

                setWorkspaces(updatedWorkspaces);
                await tauriCommands.saveWorkspaces(updatedWorkspaces);
                return true;
            }
        } catch (e) {
            console.error("Failed to add resource:", e);
        }
        return false;
    }, []);

    const removeResource = useCallback(async (resourceId) => {
        const currentId = selectedIdRef.current;
        const wsIndex = workspacesRef.current.findIndex((ws) => ws.id === currentId);
        if (wsIndex === -1) return;

        const updatedWorkspaces = [...workspacesRef.current];
        updatedWorkspaces[wsIndex] = {
            ...updatedWorkspaces[wsIndex],
            resources: updatedWorkspaces[wsIndex].resources.filter((r) => r.id !== resourceId)
        };

        setWorkspaces(updatedWorkspaces);
        await tauriCommands.saveWorkspaces(updatedWorkspaces);
    }, []);

    const launchWorkspace = useCallback(async (ws) => {
        try {
            const paths = ws.resources.map((r) => r.path);
            const failed = await tauriCommands.launchResources(paths);
            return failed;
        } catch (e) {
            console.error("Failed to launch workspace:", e);
            throw e;
        }
    }, []);

    const launchResource = useCallback(async (path) => {
        try {
            await tauriCommands.launchResources([path]);
        } catch (e) {
            console.error("Failed to launch individual resource:", e);
        }
    }, []);

    const getSelectedWorkspace = useCallback(() => {
        return workspaces.find((ws) => ws.id === selectedId);
    }, [workspaces, selectedId]);

    return {
        workspaces,
        setWorkspaces,
        selectedId,
        setSelectedId,
        workspacesRef,
        selectedIdRef,
        createWorkspace,
        deleteWorkspace,
        addResource,
        addLocalResource,
        removeResource,
        launchWorkspace,
        launchResource,
        getSelectedWorkspace,
    };
}