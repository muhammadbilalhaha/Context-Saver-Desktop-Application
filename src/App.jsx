import { useState, useEffect, useCallback } from "react";
import { useWorkspaces } from "./hooks/useWorkspaces";
import { useDragDrop } from "./hooks/useDragDrop";
import "./App.css";

import WorkspaceDetails from "./components/workspace/WorkspaceDetails";
import DragDropOverlay from "./components/layout/DragDropOverlay";
import { tauriCommands } from "./services/tauriCommands";
import Sidebar from "./components/layout/sidebar/Sidebar";
import SplashScreen from "./components/layout/SplashScreen";
import Notification from "./utils/Notification";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState({ message: "", type: "info" });

  const showNotification = useCallback((message, type = "warning") => {
    setNotification({ message, type });
  }, []);

  const closeNotification = useCallback(() => {
    setNotification({ message: "", type: "info" });
  }, []);

  // Workspace management
  const {
    workspaces,
    setWorkspaces,
    selectedId,
    setSelectedId,
    workspacesRef,
    selectedIdRef,
    createWorkspace,
    deleteWorkspace,
    addResource,
    addLocalResource,
    removeResource,
    launchWorkspace,
    launchResource,
  } = useWorkspaces();

  // Drag & drop
  const { isDragging } = useDragDrop(
    workspacesRef,
    selectedIdRef,
    setWorkspaces,
    showNotification
  );

  // Hide splash screen when workspaces are loaded
  useEffect(() => {
    if (workspaces !== undefined && !isLoading) return;

    // Small delay for smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [workspaces]);

  const selectedWorkspace = workspaces.find((ws) => ws.id === selectedId);

  const handleBrowseFile = async () => {
    if (!selectedId) {
      showNotification("Please select a workspace first!", "warning");
      return;
    }
    try {
      const path = await tauriCommands.pickFile();
      if (path) {
        await addLocalResource(path);
        showNotification("File added successfully!", "success");
      }
    } catch (e) {
      console.error("Failed to pick file:", e);
      showNotification("Failed to add file", "error");
    }
  };

  const handleBrowseFolder = async () => {
    if (!selectedId) {
      showNotification("Please select a workspace first!", "warning");
      return;
    }
    try {
      const path = await tauriCommands.pickFolder();
      if (path) {
        await addLocalResource(path);
        showNotification("Folder added successfully!", "success");
      }
    } catch (e) {
      console.error("Failed to pick folder:", e);
      showNotification("Failed to add folder", "error");
    }
  };

  return (
    <>
      {/* Splash Screen */}
      {isLoading && <SplashScreen />}

      {/* Notification */}
      <Notification 
        message={notification.message}
        type={notification.type}
        onClose={closeNotification}
      />

      {/* Main App */}
      <div className={`flex h-screen w-screen overflow-hidden select-none bg-[#0A0A0B] relative transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}>
        {/* Background decorations */}
        <div className="absolute top-[-10%] right-[-10%] w-[55%] h-[55%] rounded-full bg-indigo-600/10 blur-[130px] pointer-events-none animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-fuchsia-600/5 blur-[120px] pointer-events-none animate-pulse-slow" />

        <Sidebar
          workspaces={workspaces}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onCreateWorkspace={createWorkspace}
          onDeleteWorkspace={deleteWorkspace}
        />

        <WorkspaceDetails
          workspace={selectedWorkspace}
          onAddResource={addResource}
          onRemoveResource={removeResource}
          onLaunchWorkspace={launchWorkspace}
          onLaunchResource={launchResource}
          onBrowseFile={handleBrowseFile}
          onBrowseFolder={handleBrowseFolder}
        />

        <DragDropOverlay isVisible={isDragging} />
      </div>
    </>
  );
}

export default App;