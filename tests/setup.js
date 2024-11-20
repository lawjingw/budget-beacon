import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// hooks are reset before each suite
afterEach(() => {
  cleanup();
});
