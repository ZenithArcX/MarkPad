# MarkPad

**A fast, minimal, distraction-free Markdown Workspace IDE.**

MarkPad is a file-system-first markdown editor built to feel like a native desktop application. It combines the simplicity of Notepad with the power of VSCode-like workspace management and Obsidian's distraction-free writing environment.

## 🚀 Features

- **Workspace First**: Seamlessly manage an entire directory of Markdown files.
- **Side-by-Side Preview**: Instantly see your rendered Markdown as you type.
- **Fast & Lightweight**: Built with Vite, React, CodeMirror 6, and Electron for high performance.
- **Native Experience**: Clean window layout, resizable sidebar, and native menus.
- **Cross-Platform**: Available for Windows, macOS, and Linux.

---

## 📥 Installation

Download the latest version for your platform from the **[Releases](#)** page.

### Windows
1. Download **`MarkPad-Setup-1.0.0.exe`**.
2. Run the installer to automatically install and launch MarkPad.
3. *Alternative*: Download the `MarkPad-Portable-1.0.0.zip` for a portable, no-install version.

### macOS
1. Download **`MarkPad-1.0.0.dmg`**.
2. Open the `.dmg` file and drag MarkPad to your Applications folder.

### Linux
1. Download **`MarkPad-1.0.0.AppImage`** or **`MarkPad-1.0.0.deb`**.
2. For AppImage: Make the file executable (`chmod +x MarkPad-1.0.0.AppImage`) and run it.
3. For Deb: Install via `sudo apt install ./MarkPad-1.0.0.deb`.

---

## 💻 Development

MarkPad is built with Electron + Vite + React.

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/markpad.git
cd markpad

# Install dependencies
npm install
```

### Running Locally

```bash
# Start the development server with Hot Module Replacement (HMR)
npm run dev
```

### Building for Production

To generate the final executables for your platform:

```bash
# Build the Vite renderer and Electron main process
npm run build

# Package the application into native executables
npm run dist
```

Executables will be output to the `release/` directory.

---

## 🎨 Technology Stack
- **Electron**: Desktop application framework.
- **React**: UI library.
- **Vite**: Ultra-fast build tool and development server.
- **CodeMirror 6**: Code editor component.
- **Tailwind CSS**: Utility-first styling.
- **Zustand**: Lightweight state management.

## 📄 License
MIT License
