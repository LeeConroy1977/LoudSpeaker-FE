import AppRoutes from "./components/AppRoutes";
import { ArticleScrollProvider } from "./contexts/ArticleScrollContext";
import { CommentScrollProvider } from "./contexts/CommentScrollContext";
import { ModalProvider } from "./contexts/ModalContext";
import { PopupProvider } from "./contexts/PopupContext";

import Modal from "./reuseable-components/Modal";

function App() {
  return (
    <ArticleScrollProvider>
      <CommentScrollProvider>
        <ModalProvider>
          <div className="relative w-screen h-screen flex items-center justify-center dark:bg-darkBg tablet:overflow-hidden  scrollbar-hide">
            <PopupProvider>
              <AppRoutes />
              <Modal />
            </PopupProvider>
          </div>
        </ModalProvider>
      </CommentScrollProvider>
    </ArticleScrollProvider>
  );
}

export default App;
