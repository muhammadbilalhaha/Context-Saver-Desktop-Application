use std::path::Path;
use crate::models::path_info::PathInfo;

#[tauri::command]
pub fn inspect_path(path: String) -> PathInfo {
    let p = Path::new(&path);
    let exists = p.exists();
    let is_dir = p.is_dir();
    let is_file = p.is_file();
    let name = p.file_name()
        .map(|n| n.to_string_lossy().to_string())
        .unwrap_or_else(|| {
            // For URLs, extract hostname or last segment
            if path.starts_with("http") {
                path.split('/')
                    .filter(|s| !s.is_empty())
                    .last()
                    .unwrap_or(&path)
                    .to_string()
            } else {
                path.clone()
            }
        });
    PathInfo {
        exists,
        is_dir,
        is_file,
        name,
    }
}

#[tauri::command]
pub fn launch_resources(paths: Vec<String>) -> Result<Vec<String>, String> {
    let mut failed = Vec::new();
    for path in paths {
        if let Err(_) = open::that_detached(&path) {
            failed.push(path);
        }
    }
    Ok(failed)
}