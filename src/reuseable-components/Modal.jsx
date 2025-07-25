import { useModal } from "../contexts/ModalContext";

import React from "react";

const Modal = () => {
  const { isModalOpen, modalChild } = useModal();

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 w-full  flex items-center justify-center bg-black bg-opacity-80 mr-3 tablet:mr-0 z-70">
      <div className="bg-white dark:bg-secondaryBg tablet: flex tablet:justify-center  w-[86%] h-[550px] tablet-portrait:w-[80%] tablet-portrait:h-[75%] tablet:w-[40%] tablet:h-[580px]  z-70 rounded-xl overflow-y-hidden absolute p-2  tablet:ml-0 ">
        {modalChild}
      </div>
    </div>
  );
};

export default Modal;
