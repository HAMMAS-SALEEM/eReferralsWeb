/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();
// https://vitejs.dev/config/

export default defineConfig({
  define: {
    "process.env.VIRTUAL_HOST": JSON.stringify(process.env.VIRTUAL_HOST),
  },
  plugins: [react()],
});
