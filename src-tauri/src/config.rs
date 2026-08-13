use std::fs;
use std::path::{Path, PathBuf};
use tauri::{AppHandle, Manager};
use crate::models::workspace::Workspace;

pub fn get_config_path(app: &AppHandle) -> Result<PathBuf, String> {
    let mut path = app.path().app_local_data_dir().map_err(|e| e.to_string())?;
    fs::create_dir_all(&path).map_err(|e| e.to_string())?;
    path.push("workspaces.json");
    Ok(path)
}

pub fn load_workspaces(app: &AppHandle) -> Result<Vec<Workspace>, String> {
    let path = get_config_path(app)?;
    if !path.exists() {
        return Ok(Vec::new());
    }
    let data = fs::read_to_string(&path).map_err(|e| e.to_string())?;
    let mut workspaces: Vec<Workspace> = serde_json::from_str(&data).unwrap_or_else(|_| Vec::new());
    
    // Fix any resources that are missing names (backward compatibility)
    for workspace in &mut workspaces {
        for resource in &mut workspace.resources {
            if resource.name.is_empty() {
                // Extract name from path if missing
                let p = Path::new(&resource.path);
                resource.name = p.file_name()
                    .map(|n| n.to_string_lossy().to_string())
                    .unwrap_or_else(|| resource.path.clone());
            }
        }
    }
    
    Ok(workspaces)
}

pub fn save_workspaces_to_disk(app: &AppHandle, workspaces: Vec<Workspace>) -> Result<(), String> {
    let path = get_config_path(app)?;
    
    // Create a backup of the current file if it exists
    if path.exists() {
        let backup_path = path.with_extension("json.bak");
        let _ = fs::copy(&path, &backup_path); // Best effort backup
    }
    
    // Write to a temporary file first
    let temp_path = path.with_extension("json.tmp");
    let data = serde_json::to_string_pretty(&workspaces)
        .map_err(|e| format!("Failed to serialize workspaces: {}", e))?;
    
    fs::write(&temp_path, &data)
        .map_err(|e| format!("Failed to write temp file: {}", e))?;
    
    // Rename temp file to actual file
    fs::rename(&temp_path, &path)
        .map_err(|e| format!("Failed to save workspaces: {}", e))?;
    
    Ok(())
}