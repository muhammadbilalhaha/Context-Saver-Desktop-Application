import React from "react";
import { Trash2, Calendar } from "lucide-react";

function ExpandedWorkspaceCard({ workspace, isSelected, onSelect, onDeleteClick }) {
    const resourceCount = workspace.resources?.length || 0;
    const formattedDate = new Date(workspace.createdAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
    });

    return (
        <div
            onClick={() => onSelect(workspace.id)}
            className={`group relative p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden animate-in fade-in ${isSelected
                    ? "bg-indigo-500/10 border-indigo-500/30 text-white shadow-[0_4px_24px_-4px_rgba(99,102,241,0.15)]"
                    : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10 text-slate-300"
                }`}
        >
            {isSelected && (
                <div className="absolute top-0 right-0 p-8 bg-indigo-500/10 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            )}
            {isSelected && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1/2 w-1 rounded-r-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
            )}

            <div className="flex justify-between items-start gap-3 relative z-10">
                <div className="truncate flex-1">
                    <h3 className={`font-semibold text-sm truncate transition-colors duration-300 ${isSelected ? "text-indigo-100" : "text-slate-200 group-hover:text-white"}`}>
                        {workspace.name}
                    </h3>
                    {workspace.description && (
                        <p className="text-xs text-slate-500 mt-1 line-clamp-1 group-hover:text-slate-400 transition-colors">
                            {workspace.description}
                        </p>
                    )}
                </div>
                <button
                    onClick={(e) => onDeleteClick(e, workspace)}
                    className="p-1.5 shrink-0 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                    title="Delete workspace"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>

            <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/5 text-[11px] font-medium relative z-10">
                <span className="flex items-center gap-1.5 text-slate-500">
                    <Calendar className="h-3.5 w-3.5 opacity-70" /> {formattedDate}
                </span>
                <span className={`px-2.5 py-1 rounded-md transition-colors ${isSelected ? "bg-indigo-500/20 text-indigo-200" : "bg-white/5 text-slate-400 group-hover:bg-white/10"}`}>
                    {resourceCount} {resourceCount === 1 ? "item" : "items"}
                </span>
            </div>
        </div>
    );
}

export default ExpandedWorkspaceCard;