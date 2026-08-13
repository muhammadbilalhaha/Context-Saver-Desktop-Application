use rfd::FileDialog;

#[tauri::command]
pub fn pick_file() -> Option<String> {
    FileDialog::new()
        .set_title("Select File to Add")
        .pick_file()
        .map(|p| p.to_string_lossy().to_string())
}

#[tauri::command]
pub fn pick_folder() -> Option<String> {
    FileDialog::new()
        .set_title("Select Folder to Add")
        .pick_folder()
        .map(|p| p.to_string_lossy().to_string())
}