// import styles
import "@styles/global.scss";

// import components
import MainMenu from "@layout/MainMenu/MainMenu.jsx";

/**
 * The main application component renders a dynamic layout based on the screen width.
 * If the window width is 768 pixels or greater, the `MainMenu` component is displayed;
 * otherwise, a fallback message is shown. This ensures the application adjusts
 * its content for supported screen sizes gracefully.
 *
 * @return {JSX.Element} The main application interface with a responsive design.
 */
function App() {
  return (
    <div className="main-container">
      {window.innerWidth >= 768 ? <MainMenu /> : <div>no support screen message</div>}
    </div>
  );
}

export default App;
