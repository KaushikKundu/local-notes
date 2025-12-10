# OwnSpace (formerly Local Notes)

**Your Private Writing Space.**

OwnSpace is a local-first, privacy-focused note-taking application built for the modern web. It runs entirely in your browser, storing your data locally on your device. No accounts, no servers, no tracking.


## Features
https://github.com/KaushikKundu/local-notes
- **🔒 100% Private**: Your notes never leave your device. All data is stored locally using IndexedDB.
- **⚡ Lightning Fast**: Built with performance in mind, offering a seamless writing experience without loading screens.
- **📶 Works Offline**: No internet connection required. Access and edit your notes anytime, anywhere.
- **📝 Rich Text Editor**: Powered by [Tiptap](https://tiptap.dev/), offering a clean and powerful writing interface.
- **🌗 Dark/Light Mode**: Beautifully designed themes to suit your preference.
- **📂 Export to Markdown**: Easily export all your notes to a single Markdown file (`notes.md`) for backup or portability.
- **📱 Responsive Design**: Works great on desktop, tablet, and mobile browsers.

## Tech Stack

OwnSpace is built with modern web technologies:

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Editor**: [Tiptap](https://tiptap.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Database**: [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) (via `idb`)

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine. This project works best with [Bun](https://bun.sh/) or [npm](https://www.npmjs.com/).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/KaushikKundu/local-notes.git
   cd local-notes
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   bun run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to see the application running.

## Usage

1. **Create a Note**: Click the "New Note" button or simply start typing in a new editor instance.
2. **Edit Title**: Click on the note title in the breadcrumb bar to rename it.
3. **Format Text**: Use the floating menu or keyboard shortcuts to format your text (bold, italic, headings, lists, tasks).
4. **Organize**: Use the sidebar to switch between notes.
5. **Export**: Click "Export Notes" in the header to download all your notes as a `.md` file.

## Contributing

Contributions are welcome! If you have ideas for improvements or new features, feel free to open an issue or submit a pull request.

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Built with ❤️ by [Kaushik Kundu](https://github.com/KaushikKundu).
