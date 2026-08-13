import React, { useState } from "react";
import {
    X,
    Database,
    Info,
    Trash2,
    AlertTriangle,
    HardDrive,
    FolderOpen,
    ExternalLink,
    ChevronRight
} from "lucide-react";

const SETTINGS_SECTIONS = [
    {
        id: "data",
        label: "Data Management",
        icon: Database,
        description: "Storage & workspaces"
    },
    {
        id: "about",
        label: "About",
        icon: Info,
        description: "App info & links"
    }
];

function SettingsModal({ isOpen, onClose, workspaces, onDeleteAllWorkspaces }) {
    const [activeSection, setActiveSection] = useState("data");
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    if (!isOpen) return null;

    const activeSectionData = SETTINGS_SECTIONS.find(s => s.id === activeSection);
    const totalResources = workspaces.reduce((acc, ws) => acc + (ws.resources?.length || 0), 0);

    const handleDeleteAll = () => {
        onDeleteAllWorkspaces?.();
        setShowDeleteConfirmation(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Premium Frosted Backdrop */}
            <div
                className="absolute inset-0 bg-[#050505]/80 backdrop-blur-md animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Compact Modal Container */}
            <div className="relative bg-[#0E0E11] border border-white/10 rounded-2xl w-full max-w-[640px] h-[420px] shadow-[0_0_40px_-10px_rgba(0,0,0,0.7)] ring-1 ring-white/5 animate-in zoom-in-95 fade-in duration-300 flex overflow-hidden">

                {/* Left Sidebar Navigation */}
                <div className="w-52 border-r border-white/5 bg-white/[0.01] flex flex-col">
                    {/* Header */}
                    <div className="p-4 border-b border-white/5">
                        <h2 className="text-xs font-bold text-white uppercase tracking-widest text-slate-300">Settings</h2>
                    </div>

                    {/* Navigation Items */}
                    <div className="flex-1 p-2 space-y-1">
                        {SETTINGS_SECTIONS.map((section) => {
                            const Icon = section.icon;
                            const isActive = activeSection === section.id;

                            return (
                                <button
                                    key={section.id}
                                    onClick={() => {
                                        setActiveSection(section.id);
                                        setShowDeleteConfirmation(false); // Reset delete state on tab switch
                                    }}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group ${isActive
                                        ? "bg-white/[0.06] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-white/5"
                                        : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.03] border border-transparent"
                                        }`}
                                >
                                    <div className={`p-1.5 rounded-lg transition-colors ${isActive ? "bg-indigo-500/20 text-indigo-400" : "bg-transparent text-slate-500 group-hover:text-slate-400"}`}>
                                        <Icon className="h-4 w-4 shrink-0" />
                                    </div>
                                    <div className="text-left">
                                        <p className={`font-medium text-xs ${isActive ? "text-slate-200" : "text-slate-400"}`}>
                                            {section.label}
                                        </p>
                                        <p className="text-[9.5px] text-slate-500 mt-0.5 tracking-wide">
                                            {section.description}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Footer Version */}
                    <div className="p-3 border-t border-white/5 flex justify-center">
                        <p className="text-[9px] text-slate-600 font-mono tracking-wider">
                            v0.1.0-alpha
                        </p>
                    </div>
                </div>

                {/* Right Content Area */}
                <div className="flex-1 flex flex-col bg-gradient-to-br from-transparent to-white/[0.01]">
                    {/* Content Header */}
                    <div className="px-6 py-4 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-slate-100 tracking-wide">
                            {activeSectionData?.label}
                        </h3>
                        <button
                            onClick={onClose}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-200"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Content Body */}
                    <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar">
                        {activeSection === "data" && (
                            <DataManagementSection
                                workspaces={workspaces}
                                totalResources={totalResources}
                                showDeleteConfirmation={showDeleteConfirmation}
                                onShowDeleteConfirmation={() => setShowDeleteConfirmation(true)}
                                onCancelDelete={() => setShowDeleteConfirmation(false)}
                                onConfirmDelete={handleDeleteAll}
                            />
                        )}

                        {activeSection === "about" && (
                            <AboutSection />
                        )}
                    </div>
                </div>
            </div>

            {/* Custom Scrollbar Injection */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
                .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); }
            `}</style>
        </div>
    );
}

// --- DATA MANAGEMENT SECTION ---
function DataManagementSection({ workspaces, totalResources, showDeleteConfirmation, onShowDeleteConfirmation, onCancelDelete, onConfirmDelete }) {
    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Storage Info */}
            <div className="p-3.5 rounded-xl bg-[#0A0A0B] border border-white/5 flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                        <Database className="h-4 w-4 text-indigo-400" />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-slate-300">Local Storage</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">Data is securely saved in <code className="text-[10px] text-indigo-300 font-mono">workspaces.json</code></p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-[#0A0A0B]/50 border border-white/5">
                    <div className="flex items-center gap-2 mb-1">
                        <FolderOpen className="h-3.5 w-3.5 text-sky-400" />
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Workspaces</p>
                    </div>
                    <p className="text-3xl font-light text-slate-100 tracking-tight">{workspaces.length}</p>
                </div>
                <div className="p-4 rounded-xl bg-[#0A0A0B]/50 border border-white/5">
                    <div className="flex items-center gap-2 mb-1">
                        <HardDrive className="h-3.5 w-3.5 text-emerald-400" />
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Resources</p>
                    </div>
                    <p className="text-3xl font-light text-slate-100 tracking-tight">{totalResources}</p>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="p-4 rounded-xl border border-rose-500/10 bg-rose-500/[0.02]">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h4 className="text-xs font-semibold text-rose-400 flex items-center gap-1.5">
                            <AlertTriangle className="h-3.5 w-3.5" /> Danger Zone
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                            Permanently erase all workspaces and their resources. This cannot be undone.
                        </p>
                    </div>

                    {!showDeleteConfirmation ? (
                        <button
                            onClick={onShowDeleteConfirmation}
                            disabled={workspaces.length === 0}
                            className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${workspaces.length === 0
                                ? "bg-white/5 text-slate-600 cursor-not-allowed border border-white/5"
                                : "bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 hover:border-rose-500/30 active:scale-95"
                                }`}
                        >
                            Delete All
                        </button>
                    ) : (
                        <div className="flex items-center gap-2 shrink-0 animate-in zoom-in-95 duration-200">
                            <button
                                onClick={onCancelDelete}
                                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 text-xs font-medium transition-all active:scale-95"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirmDelete}
                                className="px-3 py-1.5 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 hover:bg-rose-500/30 hover:text-rose-200 text-xs font-semibold transition-all shadow-[0_0_15px_rgba(244,63,94,0.15)] active:scale-95"
                            >
                                Confirm
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// --- ABOUT SECTION ---
function AboutSection() {
    return (
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300 h-full flex flex-col justify-center pb-4">

            {/* App Hero */}
            <div className="text-center">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-b from-indigo-500 to-violet-600 flex items-center justify-center mx-auto  shadow-[0_8px_16px_-6px_rgba(99,102,241,0.5)] ring-1 ring-white/20">
                    <FolderOpen className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-base font-bold text-white tracking-wide">Context Saver</h3>
                <p className="text-[11px] text-slate-400 mt-1 max-w-[240px] mx-auto leading-relaxed">
                    Save and restore your development context. Pick up exactly where you left off.
                </p>
            </div>

            {/* Compact Details Grid */}
            <div className="grid grid-cols-2 gap-4">

                {/* Tech Stack */}
                <div className="p-3.5 rounded-xl bg-[#0A0A0B]/50 border border-white/5">
                    <h4 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3">Built With</h4>
                    <div className="space-y-2">
                        {[
                            { label: "Framework", val: "Tauri v2" },
                            { label: "Frontend", val: "React + Vite" },
                            { label: "Styling", val: "Tailwind CSS" },
                            { label: "Backend", val: "Rust" },
                        ].map((item, i) => (
                            <div key={i} className="flex justify-between items-center text-[11px]">
                                <span className="text-slate-500">{item.label}</span>
                                <span className="text-slate-300 font-medium">{item.val}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div className="p-3.5 rounded-xl bg-[#0A0A0B]/50 border border-white/5">
                    <h4 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3">Resources</h4>
                    <div className="space-y-1.5 text-[11px]">
                        {[
                            { label: "Report an Issue", href: "#" },
                            { label: "Feature Request", href: "#" },
                            { label: "Documentation", href: "#" },
                        ].map((link, i) => (
                            <a
                                key={i}
                                href={link.href}
                                className="flex items-center justify-between group py-1 border-b border-transparent hover:border-indigo-500/20 transition-all"
                            >
                                <span className="text-slate-400 group-hover:text-indigo-300 transition-colors">{link.label}</span>
                                <ExternalLink className="h-3 w-3 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                            </a>
                        ))}
                    </div>
                </div>
                {/* Centered Premium Credit */}

            </div>
            <div className="text-center w-full">
                <div className="inline-flex items-center gap-2 px-5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-[11px] text-slate-500 font-medium">Made with ❤️ by</span>
                    <span className="text-[11px] font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                        Muhammad Bilal
                    </span>
                </div>
            </div>
        </div>
    );
}

export default SettingsModal;