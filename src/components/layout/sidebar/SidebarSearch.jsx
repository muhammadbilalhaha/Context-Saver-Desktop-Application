import React from "react";
import { Search } from "lucide-react";

function SidebarSearch({ isExpanded, searchQuery, onSearchChange, onExpand }) {
    if (!isExpanded) {
        return (
            /* Changed to <button> for better accessibility. 
               Added `outline-none` and `focus:outline-none` to prevent any click-flash.
            */
            <button
                type="button"
                className="w-full h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors outline-none focus:outline-none"
                onClick={onExpand}
                title="Search"
            >
                <Search className="h-4 w-4 text-slate-400" />
            </button>
        );
    }

    return (
        <div className="relative group animate-in fade-in duration-300">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors duration-300" />
            <input
                type="text"
                placeholder="Search workspaces..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                /* 1. Changed `focus:outline-none` to global `outline-none`
                   2. Changed `transition-all` to `transition-colors` 
                */
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-500 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors duration-300"
            />
        </div>
    );
}

export default SidebarSearch;