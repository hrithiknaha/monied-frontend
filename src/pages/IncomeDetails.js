import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

import { axiosPrivateInstance } from "../configs/axios";
import { getUserAuth } from "../redux/features/auth/authSlice";

import { formatIndianCurrency } from "../configs/helpers";

import LoadingSpinner from "../components/LoadingSpinner";

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
                    <LoadingSpinner />
                ) : (
                    <div className="container mx-auto py-4 lg:py-12">
                        <div className="bg-white shadow-md rounded-lg p-4">
                            <h2 className="text-2xl font-semibold">{income.name}</h2>
                            <p className="text-gray-500 mb-2">Amount: ₹{formatIndianCurrency(income.amount)}</p>
                            <p className="text-gray-500 mb-2">
                                Transaction Date: {moment(income.transaction_date).format("LL")}
                            </p>

                            <div className="mt-4">
                                <h3 className="text-xl font-semibold">Account Details</h3>
                                <table className="w-full border-collapse border border-gray-300">
                                    <tbody>
                                        <tr>
                                            <td className="p-2 font-semibold border border-gray-300">Account Name:</td>
                                            <td className="p-2 text-gray-500 border border-gray-300">
                                                <Link
                                                    to={`/accounts/${income.account._id}`}
                                                    className="underline hover:text-green-500">
                                                    {income.account.account_name}
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 font-semibold border border-gray-300">Account Type:</td>
                                            <td className="p-2 text-gray-500 border border-gray-300">
                                                {income.account.account_type}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 font-semibold border border-gray-300">
                                                Account Entity Name:
                                            </td>
                                            <td className="p-2 text-gray-500 border border-gray-300">
                                                {income.account.account_entity_name}
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

export default IncomeDetails;
