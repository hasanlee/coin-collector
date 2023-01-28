import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import CustomAlert from "./components/Alert/CustomAlert";
import SignIn from "./pages/auth/LoginPage/SignIn";
import SignUp from "./pages/auth/RegistrationPage/SignUp";
import ListPage from "./pages/home/ListPage/ListPage";
import MainPage from "./pages/home/MainPage/MainPage";
import AdminPage from "./pages/admin/AdminPage/AdminPage";
import Dashboard from "./pages/admin/Dashboard/Dashboard";
import CoinList from "./pages/admin/Coins/CoinList";
import CoinEdit from "./pages/admin/Coins/CoinEdit";
import CoinAdd from "./pages/admin/Coins/CoinAdd";

function App() {
  const { darkMode } = useSelector((state) => state.toggle);
  const htmlEl = document.querySelector("html");
  useEffect(() => {
    switch (darkMode) {
      case true:
        htmlEl.classList.add("dark");
        break;
      default:
        htmlEl.classList.remove("dark");
        break;
    }
  }, [darkMode]);
  return (
    <div>
      <CustomAlert />
      <Routes>
        <Route path='/login' exact element={<SignIn />} />
        <Route path='/register' exact element={<SignUp />} />
        <Route path='/' exact element={<MainPage />} />
        <Route path='/coins' exact element={<ListPage />} />
        <Route path='/coins/:slug' exact element={<ListPage />} />
        <Route exact path='/admin' element={<AdminPage />}>
          <Route exact path='/admin/dashboard' element={<Dashboard />} />
          <Route exact path='/admin/coins' element={<CoinList />} />
          <Route exact path='/admin/coins/edit/:id' element={<CoinEdit />} />
          <Route exact path='/admin/coins/add' element={<CoinAdd />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
