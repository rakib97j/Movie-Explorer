# 🎬 MovieExplorer

Welcome to **MovieExplorer**! A sleek, fast, and modern web application built to help you search, discover, and dive into your favorite movies and TV shows effortlessly. 

Powered by **React 19**, **Vite**, and the **TVMaze API**, MovieExplorer features a fluid dark theme, glassmorphism UI elements, smooth transitions, and a responsive layout that looks great on any screen size.

---

## 🔥 Key Features

- 🍿 **Hero Highlights**: Instantly see trending titles and featured content right when you land on the page.
- ⚡ **Instant Search**: Type away and get real-time search suggestions with built-in debouncing so it doesn't overload the network.
- 🎭 **Genre Filtering**: Pick your vibe — whether you're in the mood for Action, Sci-Fi, Drama, Comedy, or Horror.
- 📊 **Flexible Sorting**: Sort titles by rating, release year, or alphabetically to find exactly what you're looking for.
- 📖 **Deep Dive Modal**: Click any card to pop open a detailed view with show summaries, cast info, runtime, official website links, and trailer previews.
- 📱 **Mobile & Desktop Friendly**: Designed from the ground up to feel natural whether you're on a phone, tablet, or monitor.

---

## 🧰 Tech Stack & Tools

- **Frontend**: [React 19](https://react.dev/)
- **Build Tooling**: [Vite](https://vitejs.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Source**: [TVMaze API](https://www.tvmaze.com/api)
- **Styling**: Vanilla CSS (Custom Design System, Glassmorphism, CSS Variables)

---

## 🚀 Getting Started

Want to run MovieExplorer on your local machine? Here's how to get up and running in just a couple of minutes:

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v18 or newer recommended) installed.

### Step-by-Step Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/rakib97j/Movie-Explorer.git
   cd Movie-Explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the dev server**
   ```bash
   npm run dev
   ```

4. **Explore away!**  
   Open your browser and pop over to `http://localhost:5173`.

---

## 📜 Available Commands

| Command | Description |
|---|---|
| `npm run dev` | Runs the app in development mode with live reload. |
| `npm run build` | Builds the production bundle inside the `dist` folder. |
| `npm run preview` | Serves the production build locally for testing. |
| `npm run lint` | Checks your code for potential errors and styling formatting. |

---

## 📁 Project Structure

Here is a quick overview of how the files are organized:

```text
MovieExplorer/
├── public/              # Static assets & favicon
├── src/
│   ├── api/             # API helpers (TVMaze endpoints)
│   ├── assets/          # Images & visual media
│   ├── components/      # UI components (Navbar, HeroBanner, SearchBar, MovieGrid, etc.)
│   ├── App.jsx          # Main page logic & state
│   ├── App.css          # App-specific layout styles
│   ├── index.css        # Core design system & theme variables
│   └── main.jsx         # React application entry point
├── package.json         # Project metadata & scripts
└── vite.config.js       # Vite configuration
```

---

## 🤝 Contributing & Feedback

Got an idea to make MovieExplorer even better, or noticed a bug? Feel free to open an issue or submit a pull request!

---

## 📄 License

Distributed under the [MIT License](LICENSE). Feel free to use, modify, and share!
