// import React, { useContext } from "react";
// import { IoIosCloseCircleOutline } from "react-icons/io";
// import { ScreenSizeContext } from "../contexts/ScreenSizeContext";
import { useModal } from "../contexts/ModalContext";

import React from "react";

const Modal = () => {
  const { isModalOpen, modalChild } = useModal();

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white sm: flex sm:justify-center  w-[86%] h-[550px] sm:w-[40%] sm:h-[580px]  top-10 z-50 rounded-xl overflow-y-hidden absolute p-2  sm:ml-0 mt-5 sm:mt-0 ">
        {modalChild}
      </div>
    </div>
  );
};

export default Modal;
