import React from "react";
import { Settings, Pipette } from "lucide-react";

function SidebarFooter({ isExpanded, onOpenColorPicker, onOpenSettings }) {
    return (
        <div className="mt-auto p-2 border-t border-white/5 bg-[#0A0A0B]/80 backdrop-blur-md relative z-20">

            {/* Settings Button */}
            <button
                onClick={onOpenSettings}
                className={`w-full flex items-center rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all duration-300 ${isExpanded ? "p-3 gap-3" : "p-3 justify-center"
                    }`}
                title="Settings"
            >
                <Settings className="h-5 w-5 shrink-0" />
                {isExpanded && (
                    <span className="text-sm font-medium animate-in fade-in whitespace-nowrap overflow-hidden">
                        Settings
                    </span>
                )}
            </button>
        </div>
    );
}

export default SidebarFooter;