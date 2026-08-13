import React from "react";
import { Folder, Zap, Save, Rocket, Sparkles } from "lucide-react";

function SidebarHeader({ isExpanded }) {
    return (
        <div
            className={`py-6 flex items-center transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                isExpanded ? "px-6 gap-4" : "justify-center px-0"
            }`}
        >
            {/* Logo Container with Premium Hover Effects */}
            <div className="group relative h-12 w-12 shrink-0 cursor-pointer">
                {/* Animated Glowing Aura (Visible on hover) */}
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 rounded-2xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-500" />

                {/* Main Logo Card */}
                <div className="relative h-full w-full rounded-2xl bg-[#0f111a] flex items-center justify-center border border-white/10 overflow-hidden shadow-[0_8px_32px_-4px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:scale-[1.02] group-hover:border-white/20 group-hover:shadow-[0_16px_48px_-12px_rgba(99,102,241,0.5)]">
                    
                    {/* Dynamic Inner Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Top glass highlight */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                    <Folder
                        className="h-5.5 w-5.5 text-indigo-100 relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]"
                        fill="currentColor"
                        fillOpacity={0.15}
                        strokeWidth={1.5}
                    />
                </div>

            </div>

            {/* Text & Info Section (Expanded State) */}
            {isExpanded && (
                <div className="flex items-center justify-between flex-1 animate-in fade-in slide-in-from-left-4 duration-700 whitespace-nowrap overflow-hidden">
                    <div className="flex flex-col justify-center">
                        <h1 className="text-[1.15rem] font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70 drop-shadow-sm leading-tight">
                            Context Saver
                        </h1>

                        <div className="flex items-center gap-2 mt-1">
                            {/* Premium Status Indicator */}
                            <div className="relative flex h-2 w-2 items-center justify-center">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                            </div>

                            <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-[0.2em] font-mono">
                                Workspace Hub
                            </span>
                        </div>
                    </div>

                    {/* Premium Info Tooltip Trigger */}
                    <div className="relative group/tooltip flex items-center p-2 cursor-default">
                        {/* Interactive dots or trigger icon can go here; currently relying on hover zone */}
                        <div className="h-1.5 w-1.5 rounded-full bg-zinc-700 group-hover/tooltip:bg-indigo-400 transition-colors duration-300 shadow-[0_0_10px_rgba(0,0,0,0)] group-hover/tooltip:shadow-[0_0_10px_rgba(99,102,241,0.5)]" />

                        {/* Mega Tooltip Panel */}
                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 w-72 p-1 rounded-2xl bg-gradient-to-b from-zinc-800/80 to-zinc-950/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 z-[60] pointer-events-none origin-left scale-95 group-hover/tooltip:scale-100">
                            
                            <div className="bg-zinc-950/50 rounded-xl p-4 h-full w-full">
                                {/* Tooltip Header */}
                                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                                    <div className="flex items-center gap-2.5">
                                        <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-inner">
                                            <Folder className="h-3.5 w-3.5 text-white" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-white leading-none mb-1">Context Saver</span>
                                            <span className="text-[10px] text-zinc-400 leading-none">System Memory</span>
                                        </div>
                                    </div>
                                    <span className="text-[10px] px-2 py-1 rounded-md bg-white/5 text-zinc-300 border border-white/10 font-mono">
                                        v0.1.0
                                    </span>
                                </div>

                                {/* Feature Grid */}
                                <div className="grid grid-cols-1 gap-2 mb-4">
                                    <div className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-white/5 transition-colors">
                                        <div className="p-1.5 rounded-md bg-indigo-500/10 text-indigo-400">
                                            <Save className="h-3 w-3" />
                                        </div>
                                        <span className="text-xs text-zinc-300 font-medium">Smart Context Saving</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-white/5 transition-colors">
                                        <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-400">
                                            <Rocket className="h-3 w-3" />
                                        </div>
                                        <span className="text-xs text-zinc-300 font-medium">Instant Restoration</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-white/5 transition-colors">
                                        <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-400">
                                            <Zap className="h-3 w-3" />
                                        </div>
                                        <span className="text-xs text-zinc-300 font-medium">Lightning Fast Search</span>
                                    </div>
                                </div>

                                {/* Creator Credit */}
                                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                                    <p className="text-[10px] text-zinc-500">Crafted by</p>
                                    <p className="text-[10px] font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
                                        Muhammad Bilal
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SidebarHeader;