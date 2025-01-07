// vite.chatwidget.config.js

import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import eslint from "vite-plugin-eslint2"; // Correct ESLint plugin
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js"; // CSS-in-JS plugin

export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    return defineConfig({
        root: "src",
        build: {
            lib: {
                entry: path.resolve(__dirname, "src/ChatWidget.tsx"),
                name: "Chatwidget",
                fileName: (format) => `chatwidget.${format}.js`,
                formats: ["es", "cjs"],
            },
            rollupOptions: {
                external: [
                    "react",
                    "react-dom",
                    "react-dom/server",
                    "react/jsx-runtime",
                    "react/jsx-dev-runtime",
                ],
                output: {
                    globals: {
                        react: "React",
                        "react-dom": "ReactDOM",
                    },
                },
            },
            outDir: "../../web/chatbuild", // Output directory for the chatwidget build
            emptyOutDir: true,
            cssCodeSplit: false, // Disable CSS code splitting to bundle CSS with JS
        },
        plugins: [
            svgr({
                svgrOptions: {
                    ref: true,
                },
            }),
            react({
                include: "**/*.{jsx,tsx}",
            }),
            eslint(), // Use the correct ESLint plugin
            cssInjectedByJsPlugin(), // Add the CSS injection plugin
        ],
        assetsInclude: ["**/*.svg", "**/*.png", "**/*.wav"],
        server: {
            port: 3001, // Different port to avoid conflicts
            host: true,
        },
    });
};
