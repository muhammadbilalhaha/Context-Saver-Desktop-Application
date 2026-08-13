import React from "react";
import { Folder, Sparkles } from "lucide-react";

function SplashScreen() {
    return (
        <div className="fixed inset-0 z-[9999] bg-[#050507] flex flex-col items-center justify-center overflow-hidden">

            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/15 rounded-full blur-[120px] pointer-events-none animate-pulse duration-1000" />

            {/* Subtle Tech Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] pointer-events-none" />

            {/* Main Content Wrapper */}
            <div className="relative flex flex-col items-center z-10 animate-in fade-in zoom-in-95 duration-1000 ease-out">

                {/* Logo Section */}
                <div className="relative mb-8">
                    {/* Outer glowing aura */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 rounded-full blur-2xl opacity-20 animate-pulse duration-1000" />

                    {/* Premium Glass Logo Card */}
                    <div className="relative h-24 w-24 rounded-[2rem] bg-[#0a0a0e]/80 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-[0_0_40px_-10px_rgba(99,102,241,0.3)]">
                        {/* Top glass highlight */}
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                        {/* Dynamic inner gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent rounded-[2rem]" />

                        <Folder
                            className="h-10 w-10 text-indigo-50 relative z-10 drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]"
                            fill="currentColor"
                            fillOpacity={0.15}
                            strokeWidth={1.5}
                        />

                        {/* Decorative sparkles */}
                        <Sparkles className="absolute top-5 right-5 h-4 w-4 text-cyan-400 opacity-80" strokeWidth={2} />
                        <Sparkles className="absolute bottom-6 left-5 h-3 w-3 text-indigo-400 opacity-60" strokeWidth={2} />
                    </div>
                </div>

                {/* Typography */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 drop-shadow-sm mb-3">
                        Context Saver
                    </h1>
                    <p className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase font-semibold">
                        System Initialization
                    </p>
                </div>

                {/* Upgraded Loading Indicator */}
                <div className="flex flex-col items-center gap-4">
                    {/* Glowing Orbs */}
                    <div className="flex items-center gap-2.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-bounce shadow-[0_0_10px_rgba(129,140,248,0.8)] [animation-delay:0ms]" />
                        <div className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-bounce shadow-[0_0_10px_rgba(192,132,252,0.8)] [animation-delay:150ms]" />
                        <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce shadow-[0_0_10px_rgba(34,211,238,0.8)] [animation-delay:300ms]" />
                    </div>

                    {/* Loading Text */}
                    <span className="text-xs text-zinc-400 font-medium tracking-wide">
                        Restoring workspace memory...
                    </span>
                </div>

            </div>
        </div>
    );
}

export default SplashScreen;