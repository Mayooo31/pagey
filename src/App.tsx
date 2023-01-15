import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCtx } from "./context/context";

import Home from "./pages/Home";
import CreatePage from "./pages/CreatePage";
import Pages from "./pages/Pages";

import SignInModal from "./components/SignInModal";
import LoginModal from "./components/LoginModal";
import Page from "./pages/Page";
import NotFound from "./components/NotFound";

const App = () => {
  const { showModal } = useCtx();

  return (
    <BrowserRouter>
      <div className="h-screen">
        {showModal === "login" && <LoginModal />}
        {showModal === "signin" && <SignInModal />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pages" element={<Pages />} />
          <Route path="/create-page" element={<CreatePage />} />
          <Route path="/:id" element={<Page />} />
          <Route path="/:id/edit" element={<CreatePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
