#[derive(serde::Serialize, serde::Deserialize, Clone, Debug)]
#[serde(rename_all = "camelCase")]
pub enum ResourceType {
    #[serde(rename = "file")]
    File,
    #[serde(rename = "folder")]
    Folder,
    #[serde(rename = "url")]
    Url,
}

#[derive(serde::Serialize, serde::Deserialize, Clone, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Resource {
    pub id: String,
    pub path: String,
    pub resource_type: ResourceType,
    pub name: String,
}