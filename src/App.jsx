import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

// import styles
import "@styles/global.scss";

// import constants
import { DIALOG_TYPE_MESSAGE } from "@constants";

// import selectors
import { selectIsShowingHomeScreen } from "@slices/homeScreenSlice.js";

// import components
import StartGame from "@components/StartGame/StartGame.jsx";
import Home from "@layout/Home/Home.jsx";
import Dialog from "@common/Dialog/Dialog.jsx";

/**
 * The main application component renders a dynamic layout based on the screen width.
 * If the window width is 768 pixels or greater, the `MainMenu` component is displayed;
 * otherwise, a fallback message is shown. This ensures the application adjusts
 * its content for supported screen sizes gracefully.
 *
 * @return {JSX.Element} The main application interface with a responsive design.
 */
function App() {
  const { t } = useTranslation("dialogs");

  // define a component state
  const [isWindowWidth, setIsWindowWidth] = useState(window.innerWidth);

  // get Redux state
  const isShowingHomeScreen = useSelector(selectIsShowingHomeScreen);

  /**
   * Effect hook that sets up a window resize event listener to update the window width state.
   * The listener is added on component mount and cleaned up on unmount to prevent memory leaks.
   */
  useEffect(() => {
    const handleResize = () => {
      setIsWindowWidth(window.innerWidth);
    };

    // Add an event listener on the component mount
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on the component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const screenSizeNotSupportedMessage = t("app.screenSizeNotSupported").split("||");

  return isWindowWidth >= 768 ? (
    isShowingHomeScreen ? (
      <Home />
    ) : (
      <StartGame />
    )
  ) : (
    <div className="main-container">
      <Dialog
        isOpen={true}
        type={DIALOG_TYPE_MESSAGE}
        message={
          <>
            {screenSizeNotSupportedMessage.map((paragraph, index) => (
              <span key={index}>{paragraph}</span>
            ))}
          </>
        }
        hasActions={false}
        hasCancel={false}
      />
    </div>
  );
}

export default App;
