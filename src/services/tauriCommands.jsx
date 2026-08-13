import { invoke } from "@tauri-apps/api/core";

/**
 * Centralized Tauri API calls
 * Single source of truth for all backend communication
 */
export const tauriCommands = {
    getWorkspaces: () => invoke("get_workspaces"),

    saveWorkspaces: (workspaces) => invoke("save_workspaces", { workspaces }),

    pickFile: () => invoke("pick_file"),

    pickFolder: () => invoke("pick_folder"),

    inspectPath: (path) => invoke("inspect_path", { path }),

    launchResources: (paths) => invoke("launch_resources", { paths }),
};