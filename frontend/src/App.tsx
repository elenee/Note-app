import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import { CookiesProvider } from "react-cookie";
import { Navigate } from "react-router-dom";
import AuthContainer from "./components/Auth/AuthContainer";
import MainLayout from "./components/Common/Layout/MainLayout";
import AllNotesPage from "./pages/Notes/AllNotesPage";
import ArchivedNotesPage from "./pages/Notes/ArchivedNotesPage";
import NotesByTagPage from "./pages/Notes/NotesByTagPage";
import SettingsPage from "./pages/Settings/SettingsPage";

const App = () => {
  return (
    <CookiesProvider>
      <Routes>
        <Route path="/auth" element={<AuthContainer />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route index element={<Navigate to="sign-in" />} />
        </Route>

        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/notes" />} />
          <Route path="notes" element={<AllNotesPage />} />
          <Route path="archived" element={<ArchivedNotesPage />} />
          <Route path="tags/:tagName" element={<NotesByTagPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="/" element={<Navigate to="/auth/sign-in" />} />
        <Route path="*" element={<Navigate to="/auth/sign-in" />} />
      </Routes>
    </CookiesProvider>
  );
};

export default App;
