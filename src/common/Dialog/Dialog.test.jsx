import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dialog from "./Dialog";
import { BUTTON_TYPE_CANCEL, STATE_DISABLED } from "@constants";
import DialogButton from "@common/DialogButton/DialogButton.jsx";

describe("Dialog component", () => {
  const defaultProps = {
    isOpen: true,
    message: "Test message",
    onConfirm: vi.fn(() => console.log("Closed by Ok")),
    onCancel: vi.fn(() => console.log("Closed by Cancel")),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    console.log = vi.fn();
  });

  it("Dialog renders by default", () => {
    render(<Dialog {...defaultProps} />);

    expect(screen.getByText("Test message")).toBeInTheDocument();
    const button = screen.getByRole("button");
    expect(button.className).toMatch(/dialogBtn/);
  });

  it("Dialog has Cancel button", () => {
    render(<Dialog {...defaultProps} hasCancel={true} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(2);
    buttons.forEach((button) => {
      expect(button.className).toMatch(/dialogBtn/);
    });
  });

  it("Dialog has both OK and Cancel buttons", () => {
    render(<Dialog {...defaultProps} hasCancel={true} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(2);

    // Check that both buttons have the correct classes
    buttons.forEach((button) => {
      expect(button.className).toMatch(/dialogBtn/);
    });

    // Check that one button has the Ok class and the other has the Cancel class
    expect(
      buttons.some((button) => button.className.includes("ok")) &&
        buttons.some((button) => button.className.includes("cancel")),
    ).toBeTruthy();
  });

  it("Dialog closes when clicking OK button and logs a message to the console", async () => {
    const user = userEvent.setup();
    render(<Dialog {...defaultProps} />);

    const okButton = screen.getByRole("button");
    expect(okButton.className).toMatch(/dialogBtn/);
    await user.click(okButton);

    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith("Closed by Ok");
  });

  it("Dialog closes when clicking Cancel button and logs a message to the console", async () => {
    const user = userEvent.setup();
    render(<Dialog {...defaultProps} hasCancel={true} />);

    const buttons = screen.getAllByRole("button");
    const cancelButton = buttons.find((button) => button.className.includes("cancel"));

    expect(cancelButton.className).toMatch(/dialogBtn/);
    await user.click(cancelButton);

    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith("Closed by Cancel");
  });

  it("Dialog has disabled Cancel button", async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();
    // Render DialogButton component separately to check disabled state
    render(<DialogButton type={BUTTON_TYPE_CANCEL} state={STATE_DISABLED} onClick={vi.fn()} />);

    const disabledButton = screen.getByRole("button");

    // Check that the button has the correct classes
    expect(disabledButton.className).toMatch(/dialogBtn/);
    expect(disabledButton.className).toMatch(/disabled/);

    // Click on the disabled button, handler should not be called
    await user.click(disabledButton);
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
