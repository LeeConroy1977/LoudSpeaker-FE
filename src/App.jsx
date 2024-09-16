import AppRoutes from "./components/AppRoutes";
import { ArticleScrollProvider } from "./contexts/ArticleScrollContext";
import { CommentScrollProvider } from "./contexts/CommentScrollContext";
import { ModalProvider } from "./contexts/ModalContext";

import Modal from "./reuseable-components/Modal";

function App() {
  return (
    <ArticleScrollProvider>
      <CommentScrollProvider>
        <ModalProvider>
          <div className="w-full h-screen flex justify-center dark:bg-darkBg overflow-auto scrollbar-hide">
            <AppRoutes />
            <Modal />
          </div>
        </ModalProvider>
      </CommentScrollProvider>
    </ArticleScrollProvider>
  );
}

export default App;
