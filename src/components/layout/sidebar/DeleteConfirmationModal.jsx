import React from "react";
import { AlertTriangle, X } from "lucide-react";

function DeleteConfirmationModal({ workspace, onConfirm, onCancel }) {
    if (!workspace) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onCancel}
            />

            {/* Modal */}
            <div className="relative bg-[#141419] border border-white/10 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl animate-in zoom-in-95 fade-in duration-200">
                {/* Warning Icon */}
                <div className="flex justify-center mb-4">
                    <div className="h-14 w-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                        <AlertTriangle className="h-7 w-7 text-red-400" />
                    </div>
                </div>

                {/* Content */}
                <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-white mb-2">
                        Delete Workspace
                    </h3>
                    <p className="text-sm text-slate-400">
                        Are you sure you want to delete{" "}
                        <span className="text-white font-medium">
                            "{workspace.name}"
                        </span>
                        ? This action cannot be undone.
                    </p>
                    {workspace.resources && workspace.resources.length > 0 && (
                        <div className="mt-3 px-4 py-2.5 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-left">
                            <p className="text-xs text-yellow-400 font-medium flex items-center gap-1.5">
                                <AlertTriangle className="h-3.5 w-3.5" />
                                Warning
                            </p>
                            <p className="text-xs text-yellow-400/70 mt-1">
                                This workspace contains {workspace.resources.length}{" "}
                                {workspace.resources.length === 1 ? "resource" : "resources"}{" "}
                                that will also be permanently deleted.
                            </p>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-200 text-sm font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white transition-all duration-200 text-sm font-medium shadow-lg shadow-red-600/20 active:scale-[0.98]"
                    >
                        Delete
                    </button>
                </div>

                {/* Close Button */}
                <button
                    onClick={onCancel}
                    className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-all"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}

export default DeleteConfirmationModal;