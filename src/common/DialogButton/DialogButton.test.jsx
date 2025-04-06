import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// import constants
import { BUTTON_TYPE_CANCEL, STATE_DISABLED } from "@constants";

// import slices
import systemOptionsReducer from "@slices/systemOptionsSlice";
import menuLayoutReducer from "@slices/menuLayoutSlice.js";

// Mock the useClickWithSound hook to return test-specific mock implementations
const mockHandleMouseDown = vi.fn();
const mockHandleClick = vi.fn();

vi.mock("@hooks/useClickWithSound.js", () => ({
  useClickWithSound: () => ({
    handleMouseDown: mockHandleMouseDown,
    handleClick: mockHandleClick,
  }),
}));

// import components
import DialogButton from "./DialogButton";

// Create a test store
const store = configureStore({
  reducer: {
    systemOptions: systemOptionsReducer,
    menuLayout: menuLayoutReducer,
  },
});

// Update test rendering function to include the Provider
const renderWithRedux = (ui) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

/**
 * This test suite validates the functionality of the DialogButton component.
 *
 * Scope:
 * - Proper rendering of the DialogButton in various states and types:
 *   - Default button
 *   - Disabled button
 *   - Cancel type button
 *   - Cancel type button in a disabled state
 * - Event handling behavior for mouse down and click events:
 *   - Verifies that event handlers (onMouseDown, onClick) are correctly called for active buttons
 *   - Ensures disabled buttons do not trigger event handlers
 * - Integration with Redux store for rendering within the application state context
 *
 * Mocking:
 * - Custom hooks such as `useClickWithSound` are mocked to isolate component behavior.
 *
 * Utilities:
 * - Uses a custom render function `renderWithRedux` to include the Redux provider for testing.
 */
describe("DialogButton component", () => {
  // Reset the mock before each test
  beforeEach(() => {
    mockHandleMouseDown.mockClear();
  });

  // Clean up after each test
  afterEach(() => {
    vi.restoreAllMocks();
  });

  /**
   * Validates that the DialogButton component renders correctly in its default state.
   *
   * This test ensures:
   * - The button is rendered with the default "OK" type.
   * - The button has the expected CSS classes for a default "active" state.
   */
  it("Renders button by default", () => {
    renderWithRedux(<DialogButton />);

    const button = screen.getByRole("button");

    // Check that the button has the active class
    expect(button.className).toMatch(/dialogBtn/);
    expect(button.className).toMatch(/dialog-btn--ok--active/);
  });

  /**
   * Ensures the DialogButton component renders correctly when in a disabled state.
   *
   * This test ensures:
   * - The button should have the expected CSS classes for a disabled state.
   * - It should render as disabled and block user interactions.
   */
  it("Renders button with disabled state", () => {
    renderWithRedux(<DialogButton state={STATE_DISABLED} />);

    const button = screen.getByRole("button");

    // Check that the button has the disabled class and attribute
    expect(button.className).toMatch(/dialogBtn/);
    expect(button.className).toMatch(/dialog-btn--ok--disabled/);
    expect(button).toHaveAttribute("disabled");
  });

  /**
   * Ensures the DialogButton component renders correctly with a Cancel button type in the default active state.
   *
   * This test validates:
   * - Proper rendering of the button with the "Cancel" type.
   * - The button is displayed with the correct CSS classes for an active "Cancel" button.
   */
  it("Renders button with Cancel type", () => {
    renderWithRedux(<DialogButton type={BUTTON_TYPE_CANCEL} />);

    const button = screen.getByRole("button");

    // Check that the button has the active class
    expect(button.className).toMatch(/dialogBtn/);
    expect(button.className).toMatch(/dialog-btn--cancel--active/);
  });

  /**
   * Ensures the DialogButton component renders correctly with a Cancel type button in a disabled state.
   *
   * This test validates:
   * - Proper rendering of the button with the "Cancel" type when it is disabled.
   * - The button has the expected CSS classes for a disabled "Cancel" button.
   * - The button is rendered as disabled and blocks user interactions.
   */
  it("Renders button with Cancel type and disabled state", () => {
    renderWithRedux(<DialogButton type={BUTTON_TYPE_CANCEL} state={STATE_DISABLED} />);

    const button = screen.getByRole("button");

    // Check that the button has the disabled class and attribute
    expect(button.className).toMatch(/dialogBtn/);
    expect(button.className).toMatch(/dialog-btn--cancel--disabled/);
    expect(button).toHaveAttribute("disabled");
  });

  /**
   * Ensures the DialogButton component triggers the onMouseDown event when the mouse down action occurs
   * on an active OK button.
   *
   * This test validates:
   * - The button correctly calls the provided `onMouseDown` event handler.
   * - The `onMouseDown` handler is triggered only once for a single mouse down action.
   */
  it("Triggers onMouseDown event when mouse down on OK button", () => {
    renderWithRedux(<DialogButton />);

    const button = screen.getByRole("button");

    // Trigger mouseDown event
    fireEvent.mouseDown(button);

    // Verify the mouseDown handler was called
    expect(mockHandleMouseDown).toHaveBeenCalledTimes(1);
  });

  /**
   * Ensures the DialogButton component triggers the onMouseDown event when the mouse down action occurs
   * on an active Cancel button.
   *
   * This test validates:
   * - The button is rendered with the correct CSS classes for an active "Cancel" button.
   * - The provided `onMouseDown` event handler is called correctly upon a mouse down action.
   * - The `onMouseDown` handler is triggered only once for a single mouse down action.
   */
  it("Triggers onMouseDown event when mouse down on Cancel button", () => {
    renderWithRedux(<DialogButton type={BUTTON_TYPE_CANCEL} />);

    const button = screen.getByRole("button");

    // Check that the button has the active class
    expect(button.className).toMatch(/dialogBtn/);
    expect(button.className).toMatch(/dialog-btn--cancel--active/);

    // Trigger mouseDown event
    fireEvent.mouseDown(button);

    // Verify the mouseDown handler was called
    expect(mockHandleMouseDown).toHaveBeenCalledTimes(1);
  });

  /**
   * Ensures the DialogButton component does not trigger the onMouseDown event
   * when the button is in a disabled state.
   *
   * This test validates:
   * - The button is rendered with the correct CSS classes for a disabled "OK" button.
   * - The disabled state is accurately reflected by the button's attributes.
   * - The `onMouseDown` event handler is not invoked when interacting with a disabled button.
   */
  it("Does not trigger onMouseDown event when the button has disabled state", () => {
    renderWithRedux(<DialogButton state={STATE_DISABLED} />);

    const button = screen.getByRole("button");

    // Check that the button has the disabled class and attribute
    expect(button.className).toMatch(/dialogBtn/);
    expect(button.className).toMatch(/dialog-btn--ok--disabled/);
    expect(button).toHaveAttribute("disabled");

    // Check that the button is disabled
    expect(button).toBeDisabled();

    // Trigger mouseDown event
    fireEvent.mouseDown(button);

    // Verify the mouseDown handler was NOT called
    expect(mockHandleMouseDown).not.toHaveBeenCalled();
  });

  /**
   * Ensures the DialogButton component triggers the onClick event when the button is clicked.
   *
   * This test validates:
   * - The button renders correctly as an active "OK" button.
   * - The provided `onClick` event handler is called correctly upon a click action.
   * - The `onClick` handler is triggered only once for a single click action.
   */
  it("Triggers onClick event on OK button", () => {
    renderWithRedux(<DialogButton />);

    const button = screen.getByRole("button");

    // Check that the button has the active class
    expect(button.className).toMatch(/dialogBtn/);
    expect(button.className).toMatch(/dialog-btn--ok--active/);

    // Trigger click event
    fireEvent.click(button);

    // Verify the click handler was called
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });

  /**
   * Ensures the DialogButton component triggers the onClick event when
   * the Cancel button is clicked.
   *
   * This test validates:
   * - The button renders correctly as an active "Cancel" button.
   * - The provided `onClick` event handler is called correctly upon a click action.
   * - The `onClick` handler is triggered only once for a single click action.
   */
  it("Triggers onClick event on Cancel button", () => {
    renderWithRedux(<DialogButton type={BUTTON_TYPE_CANCEL} />);

    const button = screen.getByRole("button");

    // Check that the button has the active class
    expect(button.className).toMatch(/dialogBtn/);
    expect(button.className).toMatch(/dialog-btn--cancel--active/);

    // Trigger click event
    fireEvent.click(button);

    // Verify the click handler was called
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });

  /**
   * Ensures the DialogButton component does not trigger the onClick event
   * when the Cancel button is in a disabled state.
   *
   * This test validates:
   * - Proper rendering of the button as a disabled "Cancel" button.
   * - The button correctly reflects its disabled state via CSS classes and the "disabled" attribute.
   * - The `onClick` event handler is not invoked when interacting with a disabled button.
   */
  it("Does not trigger onClick event when the Cancel button has disabled state", () => {
    renderWithRedux(<DialogButton type={BUTTON_TYPE_CANCEL} state={STATE_DISABLED} />);

    const button = screen.getByRole("button");

    // Check that the button has the disabled class and attribute
    expect(button.className).toMatch(/dialogBtn/);
    expect(button.className).toMatch(/dialog-btn--cancel--disabled/);
    expect(button).toHaveAttribute("disabled");

    // Check that the button is disabled
    expect(button).toBeDisabled();

    // Trigger click event
    fireEvent.click(button);

    // Verify the click handler was NOT called
    expect(mockHandleClick).not.toHaveBeenCalled();
  });
});
