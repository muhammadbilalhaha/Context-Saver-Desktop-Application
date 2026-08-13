mod commands;
mod models;
mod config;

use std::sync::Mutex;
use tauri::async_runtime::spawn;
use tauri::{AppHandle, Manager, State};
use tokio::time::{sleep, Duration};
use commands::*;

struct SetupState {
    frontend_task: bool,
    backend_task: bool,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .manage(Mutex::new(SetupState {
            frontend_task: false,
            backend_task: false,
        }))
        .setup(|app| {
            spawn(setup_backend(app.handle().clone()));
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            workspace_commands::get_workspaces,
            workspace_commands::save_workspaces,
            file_picker::pick_file,
            file_picker::pick_folder,
            resource_ops::inspect_path,
            resource_ops::launch_resources,
            set_complete,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
async fn set_complete(
    app: AppHandle,
    state: State<'_, Mutex<SetupState>>,
    task: String,
) -> Result<(), ()> {
    let mut state_lock = state.lock().unwrap();
    match task.as_str() {
        "frontend" => state_lock.frontend_task = true,
        "backend" => state_lock.backend_task = true,
        _ => panic!("invalid task completed!"),
    }
    
    if state_lock.backend_task && state_lock.frontend_task {
        let splash_window = app.get_webview_window("splashscreen").unwrap();
        let main_window = app.get_webview_window("main").unwrap();
        splash_window.close().unwrap();
        main_window.show().unwrap();
    }
    Ok(())
}

async fn setup_backend(app: AppHandle) -> Result<(), ()> {
    println!("Loading workspaces...");
    sleep(Duration::from_millis(1500)).await;
    println!("Backend ready!");
    
    set_complete(
        app.clone(),
        app.state::<Mutex<SetupState>>(),
        "backend".to_string(),
    ).await?;
    Ok(())
}