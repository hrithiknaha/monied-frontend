import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { axiosPrivateInstance } from "../configs/axios";
import { getUserAuth } from "../redux/features/auth/authSlice";
import AccountCard from "../components/AccountCard";
import CreditCard from "../components/CreditCard";

const HomePage = () => {
    const auth = useSelector(getUserAuth);

    const [isLoading, setIsLoading] = useState(false);
    const [bankAccounts, setBankAccounts] = useState([]);
    const [creditCards, setCreditCards] = useState([]);

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth.token);

        axiosInstance.get("/api/accounts").then(({ data }) => {
            setBankAccounts(data.data.filter((account) => account.type === "BANK"));
            setCreditCards(data.data.filter((account) => account.type === "CREDIT_CARD"));
            setIsLoading(false);
        });
    }, []);

    return (
        <div className="min-h-screen  bg-gray-100">
            <div className="mx-auto container px-4">
                <div className="py-8 flex flex-col gap-4">
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
        </div>
    );
};

export default HomePage;
