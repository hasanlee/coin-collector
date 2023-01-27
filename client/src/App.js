import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/auth/LoginPage/SignIn";
import SignUp from "./pages/auth/RegistrationPage/SignUp";
import ListPage from "./pages/home/ListPage/ListPage";
import MainPage from "./pages/home/MainPage/MainPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path='/login' exact element={<SignIn />} />
        <Route path='/register' exact element={<SignUp />} />
        <Route path='/' exact element={<MainPage />} />
        <Route path='/coins' exact element={<ListPage />} />
      </Routes>
    </div>
  );
}

export default App;
