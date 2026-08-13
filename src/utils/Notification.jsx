// src/components/common/Notification.jsx
import { useEffect } from "react";

export default function Notification({ message, type = "info", onClose }) {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    if (!message) return null;

    const styles = {
        info: {
            background: '#1e1e2e',
            borderColor: '#6c7086',
            iconColor: '#89b4fa',
        },
        warning: {
            background: '#1e1e2e',
            borderColor: '#f9e2af',
            iconColor: '#f9e2af',
        },
        success: {
            background: '#1e1e2e',
            borderColor: '#a6e3a1',
            iconColor: '#a6e3a1',
        },
        error: {
            background: '#1e1e2e',
            borderColor: '#f38ba8',
            iconColor: '#f38ba8',
        }
    };

    const icons = {
        info: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
        ),
        warning: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
        ),
        success: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
        ),
        error: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
        )
    };

    const currentStyle = styles[type];

    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999,
            animation: 'slideDown 0.3s ease-out',
        }}>
            <div style={{
                background: currentStyle.background,
                border: `1px solid ${currentStyle.borderColor}`,
                borderLeft: `3px solid ${currentStyle.borderColor}`,
                color: '#cdd6f4',
                padding: '14px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '400',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                minWidth: '320px',
                maxWidth: '420px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
            }}>
                <div style={{
                    color: currentStyle.iconColor,
                    flexShrink: 0,
                    marginTop: '1px'
                }}>
                    {icons[type]}
                </div>

                <div style={{ flex: 1, lineHeight: '1.5' }}>
                    {message}
                </div>

                <button
                    onClick={onClose}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#6c7086',
                        cursor: 'pointer',
                        padding: '2px 4px',
                        fontSize: '16px',
                        lineHeight: '1',
                        flexShrink: 0,
                        borderRadius: '4px',
                        transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.color = '#cdd6f4';
                        e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.color = '#6c7086';
                        e.target.style.background = 'none';
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>
        </div>
    );
}