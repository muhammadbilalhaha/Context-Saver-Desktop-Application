import React from "react";

function CollapsedWorkspaceCard({ workspace, isSelected, onSelect }) {
    const initials = workspace.name.substring(0, 2).toUpperCase();

    return (
        <div
            onClick={() => onSelect(workspace.id)}
            title={workspace.name}
            className={`relative w-full aspect-square rounded-xl flex items-center justify-center text-xs font-bold tracking-wider cursor-pointer transition-all duration-300 overflow-hidden ${isSelected
                    ? "bg-indigo-500/20 text-indigo-200 border border-indigo-500/40 shadow-[0_4px_12px_rgba(99,102,241,0.2)]"
                    : "bg-white/[0.03] text-slate-400 border border-white/5 hover:bg-white/[0.08]"
                }`}
        >
            {isSelected && (
                <div className="absolute top-0 right-0 p-4 bg-indigo-500/20 blur-xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            )}
            {isSelected && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1/2 w-1 rounded-r-full bg-indigo-500" />
            )}
            <span className="relative z-10">{initials}</span>
        </div>
    );
}

export default CollapsedWorkspaceCard;