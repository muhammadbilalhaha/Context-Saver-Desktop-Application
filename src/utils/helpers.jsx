/**
 * Normalize file path for consistent comparison
 * Handles Windows/Unix path separators and trailing slashes
 */
export const normalizePath = (p) => {
    return p.replace(/\\/g, '/').replace(/\/$/, '');
};

/**
 * Generate unique ID
 * Uses crypto.randomUUID when available, falls back to random string
 */
export const generateId = () => {
    return crypto.randomUUID ?
        crypto.randomUUID() :
        Math.random().toString(36).substring(2);
};

/**
 * Create a new resource object
 */
export const createResource = (path, type, name) => {
    return {
        id: generateId(),
        path,
        resourceType: type,
        name,
    };
};