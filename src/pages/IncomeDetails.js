import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

import { axiosPrivateInstance } from "../configs/axios";
import { getUserAuth } from "../redux/features/auth/authSlice";

import AccountTable from "../components/AccountTable";

const IncomeDetails = () => {
    const { incomeId } = useParams();

    const [income, setIncome] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const auth = useSelector(getUserAuth);

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth.token);

        axiosInstance.get(`/api/incomes/${incomeId}`).then(({ data }) => {
            setIncome(data.data[0]);
            setIsLoading(false);
        });
    }, [incomeId]);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="py-4 mx-auto container px-4">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="container mx-auto py-4 lg:py-12">
                        <div className="bg-white shadow-md rounded-lg p-4">
                            <div className="flex flex-col gap-4 items-center justify-between text-center">
                                <div className="text-4xl">{income.name}</div>
                                <div className="bg-green-500 px-4 py-1 rounded-lg shadow-md text-white flex gap-4 items-center justify-between">
                                    <div className="text-lg font-semibold">{income.amount}</div>
                                    <div className="text-sm opacity-80">
                                        {moment(income.transaction_date).format("DD-MM-YY")}
                                    </div>
                                </div>

                                <AccountTable account={income.account} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IncomeDetails;
