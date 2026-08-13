import {
    Globe,
    FolderOpen,
    File,
    FileText,
    FileSpreadsheet,
    FileImage,
    Video,
    Music,
    Archive,
} from "lucide-react";

/**
 * Returns appropriate icon component and color based on file type/extension
 */
export const getFileIcon = (path, type) => {
    if (type === "url") return <Globe className="h-4 w-4 text-sky-400" />;
    if (type === "folder") return <FolderOpen className="h-4 w-4 text-amber-400" />;

    const ext = path.split(".").pop()?.toLowerCase();

    if (["pdf", "txt", "doc", "docx", "rtf", "md"].includes(ext)) {
        return <FileText className="h-4 w-4 text-emerald-400" />;
    }
    if (["xls", "xlsx", "csv"].includes(ext)) {
        return <FileSpreadsheet className="h-4 w-4 text-green-400" />;
    }
    if (["png", "jpg", "jpeg", "gif", "svg", "webp"].includes(ext)) {
        return <FileImage className="h-4 w-4 text-purple-400" />;
    }
    if (["mp4", "mkv", "avi", "mov"].includes(ext)) {
        return <Video className="h-4 w-4 text-rose-400" />;
    }
    if (["mp3", "wav", "flac", "m4a"].includes(ext)) {
        return <Music className="h-4 w-4 text-cyan-400" />;
    }
    if (["zip", "rar", "7z", "tar"].includes(ext)) {
        return <Archive className="h-4 w-4 text-yellow-500" />;
    }

    return <File className="h-4 w-4 text-slate-400" />;
};