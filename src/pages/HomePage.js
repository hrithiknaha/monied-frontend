import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { axiosPrivateInstance } from "../configs/axios";
import { getUserAuth } from "../redux/features/auth/authSlice";
import AccountCard from "../components/AccountCard";
import CreditCard from "../components/CreditCard";
import LoadingSpinner from "../components/LoadingSpinner";

import AddAccountModal from "../components/AddAccountModal";

const HomePage = () => {
    const auth = useSelector(getUserAuth);

    const [isLoading, setIsLoading] = useState(true);
    const [bankAccounts, setBankAccounts] = useState([]);
    const [creditCards, setCreditCards] = useState([]);

    const [addAccountModel, setAddAccountModel] = useState(false);

    const [addAccountTrigger, setAddAccountTrigger] = useState();

    useEffect(() => {
        setIsLoading(true);
        const axiosInstance = axiosPrivateInstance(auth.token);

        axiosInstance.get("/api/accounts").then(({ data }) => {
            setBankAccounts(data.data.filter((account) => account.type === "BANK"));
            setCreditCards(data.data.filter((account) => account.type === "CREDIT_CARD"));
            setIsLoading(false);
        });
    }, [addAccountTrigger]);

    return (
        <div className="min-h-screen  bg-gray-100">
            <div className="py-4 mx-auto container px-4">
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <div>
                        <button
                            onClick={() => setAddAccountModel(true)}
                            className="text-white bg-green-500 px-4 py-2 rounded-lg">
                            Add Account
                        </button>

                        {addAccountModel && (
                            <AddAccountModal
                                closeModal={setAddAccountModel}
                                axiosPrivateInstance={axiosPrivateInstance}
                                auth={auth}
                                setAddAccountTrigger={setAddAccountTrigger}
                            />
                        )}
                        <div className="pt-4 flex flex-col gap-4">
                            <div className="flex flex-wrap gap-2 justify-between">
                                {bankAccounts.map((account) => (
                                    <AccountCard key={account._id} account={account} />
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-2 justify-between">
                                {creditCards.map((creditcard) => (
                                    <CreditCard key={creditcard._id} creditcard={creditcard} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
