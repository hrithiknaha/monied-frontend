import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../redux/features/auth/authSlice";

import LoginForm from "../components/forms/LoginForm";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleLogin = (e) => {
        e.preventDefault();

        const payload = { username, password };
        dispatch(loginUser(payload)).then(() => {
            navigate("/");
        });
    };

    return <LoginForm handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} />;
};

export default Login;
