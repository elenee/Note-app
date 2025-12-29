import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import { CookiesProvider } from "react-cookie";
import Notes from "./pages/Notes/Notes";
import AuthContainer from "./components/AuthContainer/AuthContainer";

const App = () => {
  return (
    <CookiesProvider>
      <Routes>
        <Route path="/" Component={AuthContainer}>
          <Route path="/" Component={SignIn} />
          <Route path="/sign-up" Component={SignUp} />
        </Route>

        <Route path="/notes" Component={Notes} />
      </Routes>
    </CookiesProvider>
  );
};

export default App;
