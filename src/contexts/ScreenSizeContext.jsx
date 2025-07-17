import { createContext, useEffect, useState } from "react";

export const ScreenSizeContext = createContext();

export const ScreenSizeProvider = ({ children }) => {
  const breakpoints = {
    mobile: 375,
    tablet: 768,
    laptop: 1024,
    desktop: 1280,
    xlScreen: 1600,
    tabletPortrait:
      "(min-width: 768px) and (max-width: 1023px) and (orientation: portrait)",
    tabletLandscape:
      "(min-width: 768px) and (max-width: 1023px) and (orientation: landscape)",
  };

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth >= breakpoints.mobile,
    isTablet: window.innerWidth >= breakpoints.tablet,
    isLaptop: window.innerWidth >= breakpoints.laptop,
    isDesktop: window.innerWidth >= breakpoints.desktop,
    isXlScreen: window.innerWidth >= breakpoints.xlScreen,
    isTabletPortrait: false,
    isTabletLandscape: false,
  });

  useEffect(() => {
    const tabletPortraitQuery = window.matchMedia(breakpoints.tabletPortrait);
    const tabletLandscapeQuery = window.matchMedia(breakpoints.tabletLandscape);

    const handleScreenResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth >= breakpoints.mobile,
        isTablet: window.innerWidth >= breakpoints.tablet,
        isLaptop: window.innerWidth >= breakpoints.laptop,
        isDesktop: window.innerWidth >= breakpoints.desktop,
        isXlScreen: window.innerWidth >= breakpoints.xlScreen,
        isTabletPortrait: tabletPortraitQuery.matches,
        isTabletLandscape: tabletLandscapeQuery.matches,
      });
    };

    handleScreenResize();

    window.addEventListener("resize", handleScreenResize);
    tabletPortraitQuery.addEventListener("change", handleScreenResize);
    tabletLandscapeQuery.addEventListener("change", handleScreenResize);

    return () => {
      window.removeEventListener("resize", handleScreenResize);
      tabletPortraitQuery.removeEventListener("change", handleScreenResize);
      tabletLandscapeQuery.removeEventListener("change", handleScreenResize);
    };
  }, []);

  return (
    <ScreenSizeContext.Provider value={screenSize}>
      {children}
    </ScreenSizeContext.Provider>
  );
};
