use super::resource::Resource;

#[derive(serde::Serialize, serde::Deserialize, Clone, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Workspace {
    pub id: String,
    pub name: String,
    pub description: Option<String>,
    pub created_at: String,
    pub resources: Vec<Resource>,
}