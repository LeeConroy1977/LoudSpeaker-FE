import AppRoutes from "./components/AppRoutes";
import { ModalProvider } from "./contexts/ModalContext";
import Modal from "./reuseable-components/Modal";

function App() {
  return (
    <ModalProvider>
      <div className="w-full h-screen flex justify-center ">
        <AppRoutes />
        <Modal />
      </div>
    </ModalProvider>
  );
}

export default App;
