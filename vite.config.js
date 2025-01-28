import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss({
      theme: {
        extend: {
          colors: {
            bg: "#212121",
            black: "#131313",
            blue: "#1a44f0",
            sky: "#50b0f3",
            card: "#2c2d35",
          },
        },
      },
    }),
    react(),
  ],
});
