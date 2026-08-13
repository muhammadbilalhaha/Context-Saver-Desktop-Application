import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SidebarHeader from "./SidebarHeader";
import SidebarSearch from "./SidebarSearch";
import SidebarCreateForm from "./SidebarCreateForm";
import SidebarWorkspaceList from "./SidebarWorkspaceList";
import SidebarFooter from "./SidebarFooter";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import SettingsModal from "./SettingsModal";

function Sidebar({
  workspaces,
  selectedId,
  onSelect,
  onCreateWorkspace,
  onDeleteWorkspace,
}) {
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreateWorkspace(name.trim(), description.trim());
    setName("");
    setDescription("");
    setIsCreating(false);
  };

  const handleDeleteClick = (e, workspace) => {
    e.stopPropagation();
    setDeleteConfirmation(workspace);
  };

  const confirmDelete = () => {
    if (deleteConfirmation) {
      onDeleteWorkspace(deleteConfirmation.id);
      setDeleteConfirmation(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmation(null);
  };

  const handleDeleteAllWorkspaces = async () => {
    const allIds = [...workspaces].map(ws => ws.id);
    for (const id of allIds) {
      await onDeleteWorkspace(id);
    }
  };

  const filteredWorkspaces = workspaces.filter((ws) =>
    ws.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Added z-40 to the aside to guarantee its overflow sits on top of your main dashboard layout */}
      <aside
        className={`relative z-40 border-r border-white/5 bg-[#0A0A0B] flex flex-col h-full select-none text-slate-300 overflow-visible transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isExpanded ? "w-[340px]" : "w-[88px]"
        }`}
      >
        {/* PREMIUM HIGH-VISIBILITY FLOATING TOGGLE BUTTON */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
          className="absolute -right-5 top-8 h-8 w-8 rounded-full flex items-center justify-center z-50 cursor-pointer select-none outline-none focus:outline-none transition-all duration-200
            /* VISIBILITY FIX: Upgraded to a lighter, distinct grey background and stronger white border by default */
            bg-[#1E1E22] border border-white/20 hover:border-indigo-500/50
            /* TEXT FIX: Swapped dim slate-400 for a bright slate-200 so the arrow pops */
            text-slate-200 hover:text-indigo-400 hover:scale-110 active:scale-95
            /* SHADOW FIX: High-contrast ambient shadow casted underneath so it physically divides from the layout */
            shadow-[0_4px_12px_rgba(0,0,0,0.8),_0_0_0_1px_rgba(255,255,255,0.08)] hover:shadow-[0_4px_20px_rgba(99,102,241,0.3)]"
        >
          {isExpanded ? (
            <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
          ) : (
            <ChevronRight className="h-4 w-4 stroke-[2.5]" />
          )}
        </button>

        {/* INNER CONTENT CONTAINER */}
        <div className="w-full h-full flex flex-col overflow-hidden">
          <SidebarHeader isExpanded={isExpanded} />

          <div className={`px-5 pb-4 space-y-4 flex-shrink-0 ${!isExpanded ? "px-3" : ""}`}>
            <SidebarSearch
              isExpanded={isExpanded}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onExpand={() => setIsExpanded(true)}
            />

            <SidebarCreateForm
              isExpanded={isExpanded}
              isCreating={isCreating}
              name={name}
              description={description}
              onNameChange={setName}
              onDescriptionChange={setDescription}
              onSubmit={handleSubmit}
              onStartCreating={() => setIsCreating(true)}
              onCancelCreating={() => setIsCreating(false)}
              onExpand={() => setIsExpanded(true)}
            />
          </div>

          <SidebarWorkspaceList
            isExpanded={isExpanded}
            workspaces={filteredWorkspaces}
            selectedId={selectedId}
            onSelect={onSelect}
            onDeleteClick={handleDeleteClick}
          />

          <SidebarFooter
            isExpanded={isExpanded}
            onOpenColorPicker={() => setIsColorPickerOpen(true)}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        </div>
      </aside>

      {/* Modals */}
      <DeleteConfirmationModal
        workspace={deleteConfirmation}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        workspaces={workspaces}
        onDeleteAllWorkspaces={handleDeleteAllWorkspaces}
      />
    </>
  );
}

export default Sidebar;