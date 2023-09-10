import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/configs/Outlet";
import GuestHomePage from "./pages/GuestHomePage";
import AccountPage from "./pages/AccountPage";

import { getUserAuth } from "./redux/features/auth/authSlice";
import HomePage from "./pages/HomePage";

const App = () => {
    const auth = useSelector(getUserAuth);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={auth.isLoggedIn ? <HomePage /> : <GuestHomePage />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />

                    <Route path="/accounts/:accountId" element={<AccountPage />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
