# Context Saver 💾

**Save and restore your complete desktop environment with one click. Built with Tauri, React, JavaScript, and Rust for maximum performance.**

## What is Context Saver?

Context Saver is a blazing-fast desktop application that captures your entire working environment - open applications, files, folders, browser tabs, and window layouts - and saves them as named contexts. Switch between Development, Gaming, Entertainment, or Work modes instantly without losing your setup.

## ✨ Key Features

🚀 **One-Click Environment Switching**
- Save complete desktop states instantly
- Restore everything with a single click
- Switch between contexts seamlessly

💾 **Comprehensive Capture**
- Open applications and windows with exact positions
- File states and window layouts
- Open folders and explorer states
- Browser tabs and URLs
- IDE sessions and terminal states
- System tray integration

🎯 **Context Categories**
- Development environments
- Gaming setups
- Work configurations
- Entertainment stations
- Custom contexts with colors and icons

⚡ **Lightning-Fast Performance**
- Powered by Rust backend for system operations
- Minimal memory footprint (< 10MB RAM)
- Instant startup time
- Native performance with web technologies

🎨 **Beautiful Modern UI**
- Clean, responsive interface with TailwindCSS
- Dark/Light theme support
- Visual context cards with previews
- Smooth animations and transitions
- Keyboard shortcuts for power users

🔒 **Privacy-Focused**
- All data stored locally
- No telemetry or tracking
- Your contexts never leave your machine
- Optional encryption for sensitive data

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **JavaScript (ES6+)** - Application logic
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling and theming
- **Framer Motion** - Animations (optional)

### Backend
- **Rust** - Core system operations
- **Tauri 2.0** - Desktop application framework
- **SQLite** - Local database storage
- **serde** - Serialization
- **tokio** - Async runtime

### System Integration
- Window management APIs
- Process monitoring
- File system watchers
- System tray integration
- Global shortcuts

## 🚀 Why Context Saver?

**Stop wasting time** reopening files and applications every time you switch tasks. Context Saver remembers everything, so you don't have to. Built with modern technologies for the best performance and user experience.

## 📦 Installation

### Prerequisites
- Node.js 18+
- Rust 1.70+
- Platform-specific build tools

### Development Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/context-saver.git
cd context-saver

# Install dependencies
npm install

# Run in development mode
npm run tauri dev

# Build for production
npm run tauri build

Made by Muhammad Bilal ❤
