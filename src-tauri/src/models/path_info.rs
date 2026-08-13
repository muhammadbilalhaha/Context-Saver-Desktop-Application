#[derive(serde::Serialize, serde::Deserialize, Clone, Debug)]
#[serde(rename_all = "camelCase")]
pub struct PathInfo {
    pub exists: bool,
    pub is_dir: bool,
    pub is_file: bool,
    pub name: String,
}