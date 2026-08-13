import React from "react";
import { Folder } from "lucide-react";
import CollapsedWorkspaceCard from "./CollapsedWorkspaceCard";
import ExpandedWorkspaceCard from "./ExpandedWorkspaceCard";

function SidebarWorkspaceList({ isExpanded, workspaces, selectedId, onSelect, onDeleteClick }) {
    return (
        <div className={`flex-1 overflow-y-auto pb-6 space-y-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-track]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-white/20 ${isExpanded ? "px-5" : "px-3"}`}>

            {isExpanded && (
                <div className="flex items-center justify-between px-1 mb-3 pt-2 animate-in fade-in">
                    <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        Your Sessions
                    </h2>
                    <span className="text-[10px] font-medium text-slate-600 bg-white/5 px-2 py-0.5 rounded-full">
                        {workspaces.length}
                    </span>
                </div>
            )}

            {workspaces.length === 0 ? (
                <div className={`text-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] flex flex-col items-center justify-center ${isExpanded ? "py-10 px-4" : "py-6 px-2"}`}>
                    <Folder className={`text-slate-600 opacity-50 ${isExpanded ? "h-8 w-8 mb-3" : "h-5 w-5"}`} />
                    {isExpanded && (
                        <>
                            <p className="text-sm text-slate-400 font-medium">No workspaces found</p>
                            <p className="text-xs text-slate-500 mt-1">Try a different search term</p>
                        </>
                    )}
                </div>
            ) : (
                workspaces.map((ws) => {
                    if (!isExpanded) {
                        return (
                            <CollapsedWorkspaceCard
                                key={ws.id}
                                workspace={ws}
                                isSelected={ws.id === selectedId}
                                onSelect={onSelect}
                            />
                        );
                    }

                    return (
                        <ExpandedWorkspaceCard
                            key={ws.id}
                            workspace={ws}
                            isSelected={ws.id === selectedId}
                            onSelect={onSelect}
                            onDeleteClick={onDeleteClick}
                        />
                    );
                })
            )}
        </div>
    );
}

export default SidebarWorkspaceList;