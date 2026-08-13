import React, { useState } from "react";
import { Folder } from "lucide-react";
import WorkspaceHeader from "./WorkspaceHeader";
import ResourceList from "./ResourceList";
import AddResourceBar from "./AddResourceBar";
import LaunchFeedback from "./LaunchFeedback";

function WorkspaceDetails({
    workspace,
    onAddResource,
    onRemoveResource,
    onLaunchWorkspace,
    onLaunchResource,
    onBrowseFile,
    onBrowseFolder,
}) {
    const [urlInput, setUrlInput] = useState("");
    const [urlName, setUrlName] = useState("");
    const [launchStatus, setLaunchStatus] = useState(null); // 'success', 'partial-fail', 'launching', or null
    const [failedPaths, setFailedPaths] = useState([]);
    const [copiedId, setCopiedId] = useState(null);

    if (!workspace) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 select-none">
                <div className="h-16 w-16 rounded-full bg-slate-900/60 flex items-center justify-center text-slate-600 mb-4 border border-slate-800/40">
                    <Folder className="h-8 w-8" />
                </div>
                <h2 className="text-lg font-bold text-slate-300">No Session Selected</h2>
                <p className="text-xs text-slate-500 max-w-sm mt-1">
                    Create a workspace in the sidebar or select an existing one to load your workspace resources.
                </p>
            </div>
        );
    }

    const handleAddUrl = (e) => {
        e.preventDefault();
        if (!urlInput.trim()) return;

        let formattedUrl = urlInput.trim();
        if (!/^https?:\/\//i.test(formattedUrl)) {
            formattedUrl = "https://" + formattedUrl;
        }

        const name = urlName.trim() || new URL(formattedUrl).hostname || formattedUrl;
        onAddResource(formattedUrl, "url", name);
        setUrlInput("");
        setUrlName("");
    };

    const handleLaunchAll = async () => {
        if (workspace.resources.length === 0) return;
        setLaunchStatus("launching");
        setFailedPaths([]);

        try {
            const failed = await onLaunchWorkspace(workspace);
            if (failed && failed.length > 0) {
                setFailedPaths(failed);
                setLaunchStatus("partial-fail");
            } else {
                setLaunchStatus("success");
            }
        } catch (e) {
            setLaunchStatus("partial-fail");
            setFailedPaths(["Unknown error occurred during launch"]);
        }
    };

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
            <WorkspaceHeader
                workspace={workspace}
                launchStatus={launchStatus}
                onLaunchAll={handleLaunchAll}
            />

            {/* Modal is rendered here. It handles its own visibility via the launchStatus prop. */}
            <LaunchFeedback
                launchStatus={launchStatus}
                failedPaths={failedPaths}
                onClose={() => setLaunchStatus(null)}
            />

            <ResourceList
                workspace={workspace}
                onLaunchResource={onLaunchResource}
                onRemoveResource={onRemoveResource}
                copyToClipboard={copyToClipboard}
                copiedId={copiedId}
            />

            <AddResourceBar
                urlInput={urlInput}
                urlName={urlName}
                onUrlInputChange={setUrlInput}
                onUrlNameChange={setUrlName}
                onAddUrl={handleAddUrl}
                onBrowseFile={onBrowseFile}
                onBrowseFolder={onBrowseFolder}
            />
        </div>
    );
}

export default WorkspaceDetails;