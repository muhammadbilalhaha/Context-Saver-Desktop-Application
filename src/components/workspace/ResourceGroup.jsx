import React from "react";
import ResourceItem from "./ResourceItem";

// Helper function to extract extensions or resource types
const getClusterCategory = (resource) => {
    if (resource.resourceType === "url") return "Web Links";
    if (resource.resourceType === "folder") return "Folders";

    // Extract file extension for files
    const parts = resource.path.split('.');
    if (parts.length > 1) {
        const ext = parts.pop().toLowerCase();
        return ext.toUpperCase(); // e.g., "PDF", "JS", "PNG"
    }

    return "Other Files"; // Files with no extension
};

function ResourceGroup({
    title,
    icon,
    resources,
    onLaunch,
    onRemove,
    onCopy,
    copiedId,
    emptyMessage
}) {
    const isEmpty = resources.length === 0;

    // 1. Identify duplicate paths within this group
    const pathCounts = resources.reduce((acc, resource) => {
        acc[resource.path] = (acc[resource.path] || 0) + 1;
        return acc;
    }, {});

    // 2. Cluster resources by their extension/type
    const clusteredResources = resources.reduce((acc, resource) => {
        const category = getClusterCategory(resource);
        if (!acc[category]) acc[category] = [];
        acc[category].push(resource);
        return acc;
    }, {});

    // Sort categories alphabetically for a cleaner UI (optional but recommended)
    const sortedCategories = Object.keys(clusteredResources).sort();

    return (
        <div className="flex flex-col mb-8 animate-in fade-in duration-500">

            {/* Premium Section Header (Main Group) */}
            <div className="flex items-center mb-5 group">
                <div className="flex items-center gap-2.5">
                    <span className="text-indigo-400/70 group-hover:text-indigo-400 transition-colors duration-300 flex items-center justify-center">
                        {icon}
                    </span>
                    <h3 className="text-[11px] font-bold text-slate-300 uppercase tracking-[0.2em]">
                        {title}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-semibold text-slate-400 group-hover:bg-white/10 group-hover:text-slate-300 transition-all duration-300">
                        {resources.length}
                    </span>
                </div>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 via-white/5 to-transparent ml-4" />
            </div>

            {/* Content Area */}
            <div className="relative">
                {isEmpty ? (
                    <div className="w-full py-8 px-4 rounded-xl border border-dashed border-white/10 bg-white/[0.01] flex flex-col items-center justify-center text-center hover:bg-white/[0.02] hover:border-white/20 transition-all duration-300 group">
                        <p className="text-xs text-slate-500 font-medium tracking-wide group-hover:text-slate-400 transition-colors">
                            {emptyMessage}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Render each cluster dynamically */}
                        {sortedCategories.map((category, clusterIndex) => (
                            <div key={category} className="flex flex-col space-y-2.5">

                                {/* Cluster Sub-header Badge */}
                                <div className="flex items-center gap-3 pl-1 opacity-80">
                                    <span className="px-2 py-1 rounded-md bg-white/[0.03] border border-white/[0.05] text-[9px] font-bold text-slate-400 uppercase tracking-widest shadow-sm">
                                        {category}
                                    </span>
                                    <div className="flex-1 h-[1px] bg-white/[0.03]" />
                                </div>

                                {/* Items inside this cluster */}
                                <div className="space-y-2">
                                    {clusteredResources[category].map((resource, itemIndex) => {
                                        const isDuplicate = pathCounts[resource.path] > 1;

                                        // Maintain staggered animation delay based on both cluster and item index
                                        const totalDelay = (clusterIndex * 100) + (itemIndex * 40);

                                        return (
                                            <div
                                                key={resource.id}
                                                className="animate-in fade-in slide-in-from-bottom-2"
                                                style={{
                                                    animationDelay: `${totalDelay}ms`,
                                                    animationFillMode: 'both'
                                                }}
                                            >
                                                <ResourceItem
                                                    resource={resource}
                                                    onLaunch={onLaunch}
                                                    onRemove={onRemove}
                                                    onCopy={onCopy}
                                                    copied={copiedId === resource.id}
                                                    isDuplicate={isDuplicate}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ResourceGroup;