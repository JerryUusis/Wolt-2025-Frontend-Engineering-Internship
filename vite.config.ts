/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./__tests__/testSetup.ts",
    globals: true,
    exclude: ["./__tests__/e2e/**", "./node_modules"], // Exclude Playwright or E2E test files
  },
});
