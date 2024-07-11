import { useState, useContext, createContext, useEffect } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalChild, setModalChild] = useState(null);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isModalOpen]);

  function showModal(child) {
    setModalChild(child);
    setIsModalOpen(true);
  }

  function hideModal() {
    setModalChild(false);
    setIsModalOpen(null);
  }

  return (
    <ModalContext.Provider
      value={{ isModalOpen, showModal, hideModal, modalChild }}
    >
      {children}
    </ModalContext.Provider>
  );
};
