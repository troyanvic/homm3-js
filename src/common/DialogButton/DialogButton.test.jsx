import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DialogButton from "./DialogButton";
import { BUTTON_TYPE_OK, BUTTON_TYPE_CANCEL, STATE_DISABLED } from "@constants";

describe("DialogButton", () => {
  it("renders button with OK type and active state by default", () => {
    render(<DialogButton />);
    const button = screen.getByRole("button");
    expect(button.className).toMatch(/dialogBtn/);
    expect(button.className).toMatch(/dialog-btn--ok--active/);
  });

  it("renders button with Cancel type", () => {
    render(<DialogButton type={BUTTON_TYPE_CANCEL} />);
    const button = screen.getByRole("button");
    expect(button.className).toMatch(/dialogBtn/);
    expect(button.className).toMatch(/dialog-btn--cancel--active/);
  });

  it("renders button in disabled state", () => {
    render(<DialogButton state={STATE_DISABLED} />);
    const button = screen.getByRole("button");
    expect(button.className).toMatch(/dialogBtn/);
    expect(button.className).toMatch(/dialog-btn--ok--disabled/);
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<DialogButton onClick={handleClick} />);
    const button = screen.getByRole("button");

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders Cancel button in disabled state", () => {
    render(<DialogButton type={BUTTON_TYPE_CANCEL} state={STATE_DISABLED} />);
    const button = screen.getByRole("button");
    expect(button.className).toMatch(/dialogBtn/);
    expect(button.className).toMatch(/dialog-btn--cancel--disabled/);
  });

  it("does not call onClick handler when in disabled state", () => {
    const handleClick = vi.fn();
    render(<DialogButton type={BUTTON_TYPE_OK} state={STATE_DISABLED} onClick={handleClick} />);
    const button = screen.getByRole("button");
    expect(button.className).toMatch(/dialog-btn--ok--disabled/);

    fireEvent.click(button);

    // Verify that the handler was not called
    expect(handleClick).not.toHaveBeenCalled();
  });
});
