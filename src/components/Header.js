import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { FaHouseChimney } from "react-icons/fa6";
import { AiFillBank } from "react-icons/ai";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { AiFillMoneyCollect } from "react-icons/ai";
import { AiFillProfile } from "react-icons/ai";
import { HiDownload } from "react-icons/hi";

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
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-white text-lg font-semibold flex items-center gap-2">
                        <FaHouseChimney />
                        Monied
                    </Link>

                    {user.username ? (
                        <div className="flex gap-4 items-center">
                            <Link to={`/profile/${user.username}`} className="text-white text-lg hover:underline">
                                {user.username}
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-green-500 text-white hover:bg-green-600 font-semibold py-1 px-2 rounded outline">
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
                <div className="pt-4 text-2xl text-white flex gap-1 justify-between items-center">
                    <div className="flex flex-col items-center">
                        <Link to="/">
                            <AiFillBank />
                        </Link>
                        <p className="text-xs">Accounts</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <Link to="/incomes">
                            <AiFillSafetyCertificate />
                        </Link>
                        <p className="text-xs">Incomes</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <Link to="/expenses">
                            <AiFillMoneyCollect />
                        </Link>
                        <p className="text-xs">Expenses</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <Link to="/repayments">
                            <HiDownload />
                        </Link>
                        <p className="text-xs">Repayments</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <Link to="/categories">
                            <AiFillProfile />
                        </Link>
                        <p className="text-xs">Categories</p>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
