import { useSelector } from "react-redux";

// import styles
import "@styles/global.scss";

// import selectors
import { selectIsShowingMainMenu } from "@slices/menuLayoutSlice.js";

// import components
import MainMenu from "@layout/MainMenu/MainMenu.jsx";
import StartGame from "@components/StartGame/StartGame.jsx";

/**
 * The main application component renders a dynamic layout based on the screen width.
 * If the window width is 768 pixels or greater, the `MainMenu` component is displayed;
 * otherwise, a fallback message is shown. This ensures the application adjusts
 * its content for supported screen sizes gracefully.
 *
 * @return {JSX.Element} The main application interface with a responsive design.
 */
// TODO: connect the DialogButton to effectsVolume
// TODO: add playing music
// TODO: add favicon
// TODO: add responsive message
function App() {
  // get Redux state
  const isShowingMainMenu = useSelector(selectIsShowingMainMenu);

  return isShowingMainMenu ? (
    <div className="main-container">
      {window.innerWidth >= 768 ? <MainMenu /> : <div>no support small screen resolution message</div>}
    </div>
  ) : (
    <StartGame />
  );
}

export default App;
