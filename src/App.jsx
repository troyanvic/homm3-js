import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

// import styles
import "@styles/global.scss";

// import constants
import { DIALOG_TYPE_MESSAGE } from "@constants";

// import selectors
import { selectIsShowingMainMenu } from "@slices/menuLayoutSlice.js";

// import components
import Home from "@layout/Home/Home.jsx";
import StartGame from "@components/StartGame/StartGame.jsx";
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
  const isShowingMainMenu = useSelector(selectIsShowingMainMenu);

  useEffect(() => {
    const handleResize = () => {
      setIsWindowWidth(window.innerWidth);
    };

    // Add event listener on component mount
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isWindowWidth >= 768 ? (
    isShowingMainMenu ? (
      <div className="main-container">
        <Home />
      </div>
    ) : (
      <StartGame />
    )
  ) : (
    <div className="main-container">
      <Dialog
        isOpen={true}
        type={DIALOG_TYPE_MESSAGE}
        message={t("app.screenSizeNotSupported")}
        hasActions={false}
        hasCancel={false}
      />
    </div>
  );
}

export default App;
