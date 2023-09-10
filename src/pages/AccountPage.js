import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { axiosPrivateInstance } from "../configs/axios";
import { getUserAuth } from "../redux/features/auth/authSlice";
import ExpenseTable from "../components/ExpenseTable";
import IncomeTable from "../components/IncomeTable";

const AccountPage = () => {
    const { accountId } = useParams();

    const auth = useSelector(getUserAuth);

    const [isLoading, setIsLoading] = useState(true);
    const [account, setAccount] = useState({});

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth.token);

        axiosInstance.get(`/api/accounts/${accountId}`).then(({ data }) => {
            setAccount(data.data);
            setIsLoading(false);
        });
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="py-4 mx-auto container px-4">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <div className="flex flex-col">
                            <p className="text-xs text-gray-500">{account.type}</p>
                            <div className="flex items-center justify-between gap-2 w-full">
                                <h3 className="text-2xl font-semibold">{account.name}</h3>
                                <p className="text-xs text-white bg-purple-500 px-1 py-2 rounded-lg">
                                    {account.entity_name}
                                </p>
                            </div>
                            <p className="pt-4 text-4xl">₹{account.balance}</p>
                        </div>

                        <div className="mt-8">
                            <h2 className="text-xl bg-green-200 font-semibold">Expenses</h2>
                            <ExpenseTable expenses={account.expenses} />
                        </div>
                        <div className="mt-8">
                            <h2 className="text-xl bg-green-200 font-semibold">Incomes</h2>
                            <IncomeTable incomes={account.incomes} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountPage;
