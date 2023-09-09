import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Home } from "react-feather";

import { getUserAuth, logoutUser } from "../redux/features/auth/authSlice";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(getUserAuth);

    const handleLogout = () => {
        dispatch(logoutUser()).then(() => {
            navigate("/login");
        });
    };

    return (
        <nav className="bg-green-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-lg font-semibold flex gap-2">
                    <Home />
                    Monied
                </Link>

                {user.username ? (
                    <div className="flex justify-between items-center w-48">
                        <Link to={`/profile/${user.username}`} className="text-white text-lg hover:underline">
                            {user.username}
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="bg-green-500 text-white hover:bg-green-600 font-semibold py-2 px-4 rounded outline">
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link
                        to={"login"}
                        className="bg-green-500 text-white hover:bg-green-600 font-semibold py-2 px-4 rounded outline">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Header;
