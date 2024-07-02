import React, { useContext } from "react";
import { ScreenSizeContext } from "../contexts/ScreenSizeContext";

const AppLayout = () => {
  const { width, height } = useContext(ScreenSizeContext);
  console.log(width);

  return (
    <div>
      {width < 640 ? (
        <>
          <p>Mobile</p>
        </>
      ) : (
        <>
          <p>Not mobile!!!</p>
        </>
      )}
    </div>
  );
};

export default AppLayout;
