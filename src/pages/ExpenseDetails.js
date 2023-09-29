import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

import { axiosPrivateInstance } from "../configs/axios";
import { getUserAuth } from "../redux/features/auth/authSlice";

import { formatIndianCurrency } from "../configs/helpers";

import AccountTable from "../components/AccountTable";

const ExpenseDetails = () => {
    const { expenseId } = useParams();

    const [expense, setExpense] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const auth = useSelector(getUserAuth);

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth.token);

        axiosInstance.get(`/api/expenses/${expenseId}`).then(({ data }) => {
            setExpense(data.data[0]);
            setIsLoading(false);
        });
    }, [expenseId]);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="py-4 mx-auto container px-4">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="container mx-auto py-4 lg:py-12">
                        <div className="bg-white shadow-md rounded-lg p-4">
                            <div className="flex flex-col gap-4 items-center justify-between text-center">
                                <div className="text-4xl">{expense.name}</div>
                                <div className="bg-green-500 px-4 py-1 rounded-lg shadow-md text-white flex gap-4 items-center justify-between">
                                    <div className="text-lg font-semibold">₹{formatIndianCurrency(expense.amount)}</div>
                                    <div className="text-sm opacity-80">
                                        {moment(expense.transaction_date).format("DD-MM-YY")}
                                    </div>
                                    <div className="text-lg font-semibold">
                                        <Link to={`/categories/${expense.category._id}`}>{expense.categoryTitle}</Link>
                                    </div>
                                </div>

                                <AccountTable account={expense.account} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExpenseDetails;
