import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom"; // This registers the matchers automatically

// Run cleanup after each test case
afterEach(() => {
  cleanup();
});
