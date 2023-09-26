import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { getUserAuth } from "./redux/features/auth/authSlice";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/configs/Outlet";
import GuestHomePage from "./pages/GuestHomePage";
import AccountPage from "./pages/AccountPage";
import IncomesPage from "./pages/IncomesPage";
import ExpensesPage from "./pages/ExpensesPage";
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
                    <Route path="/incomes" element={<IncomesPage />} />
                    <Route path="/expenses" element={<ExpensesPage />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
