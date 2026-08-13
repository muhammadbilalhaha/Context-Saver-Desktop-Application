use tauri::AppHandle;
use crate::models::workspace::Workspace;
use crate::config;

#[tauri::command]
pub fn get_workspaces(app: AppHandle) -> Result<Vec<Workspace>, String> {
    config::load_workspaces(&app)
}

#[tauri::command]
pub fn save_workspaces(app: AppHandle, workspaces: Vec<Workspace>) -> Result<(), String> {
    config::save_workspaces_to_disk(&app, workspaces)
}