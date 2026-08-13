import React from "react";
import { Globe, FolderOpen, File, PlusCircle } from "lucide-react";
import ResourceGroup from "./ResourceGroup";

function ResourceList({ workspace, onLaunchResource, onRemoveResource, copyToClipboard, copiedId }) {
    // --- EMPTY STATE ---
    if (!workspace?.resources || workspace.resources.length === 0) {
        return (
            <div className="flex-1 p-6 sm:p-8 flex flex-col animate-in fade-in duration-500">
                <div className="flex-1 rounded-3xl border border-dashed border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent flex flex-col items-center justify-center p-8 text-center transition-all duration-500 hover:border-white/20 hover:bg-white/[0.03] group relative overflow-hidden min-h-[400px]">

                    {/* Subtle ambient radial glow that follows the theme */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-700" />

                    {/* Elevated Icon Container */}
                    <div className="h-16 w-16 rounded-2xl bg-[#0A0A0B] flex items-center justify-center text-slate-500 mb-6 border border-white/5 shadow-[inset_0_2px_10px_rgba(255,255,255,0.02)] group-hover:scale-110 group-hover:text-indigo-400 group-hover:border-indigo-500/20 transition-all duration-500 relative z-10">
                        <PlusCircle className="h-8 w-8" />
                    </div>

                    {/* Typography */}
                    <h3 className="text-lg font-bold text-white tracking-wide relative z-10">
                        Workspace is empty
                    </h3>
                    <p className="text-sm text-slate-400 max-w-sm mt-3 leading-relaxed relative z-10">
                        Add resources using the controls below or <span className="text-slate-300 font-medium border-b border-slate-600 border-dashed pb-0.5">drag & drop</span> files and folders anywhere on this screen.
                    </p>
                </div>
            </div>
        );
    }

    // --- POPULATED STATE ---
    const urls = workspace.resources.filter((r) => r.resourceType === "url");
    const folders = workspace.resources.filter((r) => r.resourceType === "folder");
    const files = workspace.resources.filter((r) => r.resourceType === "file");

    return (
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-track]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
            {/* 
        Responsive grid: 
        1 col on mobile, 2 cols on tablet, 3 cols on desktop 
        to give the detailed list items room to breathe.
      */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-8">

                <ResourceGroup
                    title="Web Links"
                    icon={<Globe className="h-4 w-4 text-sky-400" />}
                    resources={urls}
                    onLaunch={onLaunchResource}
                    onRemove={onRemoveResource}
                    onCopy={copyToClipboard}
                    copiedId={copiedId}
                    emptyMessage="No web links saved"
                />

                <ResourceGroup
                    title="Folders"
                    icon={<FolderOpen className="h-4 w-4 text-amber-400" />}
                    resources={folders}
                    onLaunch={onLaunchResource}
                    onRemove={onRemoveResource}
                    onCopy={copyToClipboard}
                    copiedId={copiedId}
                    emptyMessage="No folders saved"
                />

                <ResourceGroup
                    title="Files"
                    icon={<File className="h-4 w-4 text-emerald-400" />}
                    resources={files}
                    onLaunch={onLaunchResource}
                    onRemove={onRemoveResource}
                    onCopy={copyToClipboard}
                    copiedId={copiedId}
                    emptyMessage="No files saved"
                />

            </div>
        </div>
    );
}

export default ResourceList;