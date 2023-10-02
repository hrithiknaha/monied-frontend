import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

import { axiosPrivateInstance } from "../configs/axios";
import { getUserAuth } from "../redux/features/auth/authSlice";

import { formatIndianCurrency } from "../configs/helpers";

import AccountTable from "../components/AccountTable";
import LoadingSpinner from "../components/LoadingSpinner";

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
                    <LoadingSpinner />
                ) : (
                    <div className="container mx-auto py-4 lg:py-12">
                        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                            <h2 className="text-2xl font-semibold">{expense.name}</h2>
                            <p className="text-gray-500 mb-2">Amount: ₹{formatIndianCurrency(expense.amount)}</p>
                            <p className="text-gray-500 mb-2">
                                Transaction Date: {moment(expense.transaction_date).format("LL")}
                            </p>

                            <div className="mt-4">
                                <h3 className="text-xl font-semibold">Account Details</h3>
                                <table className="w-full border-collapse border border-gray-300">
                                    <tbody>
                                        <tr>
                                            <td className="p-2 font-semibold border border-gray-300">Account Name:</td>
                                            <td className="p-2 text-gray-500 border border-gray-300">
                                                <Link
                                                    to={`/accounts/${expense.account._id}`}
                                                    className="underline hover:text-green-500">
                                                    {expense.account.account_name}
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 font-semibold border border-gray-300">Account Type:</td>
                                            <td className="p-2 text-gray-500 border border-gray-300">
                                                {expense.account.account_type}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 font-semibold border border-gray-300">
                                                Account Entity Name:
                                            </td>
                                            <td className="p-2 text-gray-500 border border-gray-300">
                                                {expense.account.account_entity_name}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-4">
                                <h3 className="text-xl font-semibold">Category Details</h3>
                                <table className="w-full border-collapse border border-gray-300">
                                    <tbody>
                                        <tr>
                                            <td className="p-2 font-semibold border border-gray-300">Category Name:</td>
                                            <td className="p-2 text-gray-500 border border-gray-300">
                                                <Link
                                                    to={`/categories/${expense.category._id}`}
                                                    className="underline hover:text-green-500">
                                                    {expense.category.name}
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 font-semibold border border-gray-300">Category:</td>
                                            <td className="p-2 text-gray-500 border border-gray-300">
                                                {expense.categoryTitle}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExpenseDetails;
