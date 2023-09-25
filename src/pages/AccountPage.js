import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { axiosPrivateInstance } from "../configs/axios";
import { getUserAuth } from "../redux/features/auth/authSlice";

import ExpenseTable from "../components/ExpenseTable";
import IncomeTable from "../components/IncomeTable";
import RepaymentTable from "../components/RepaymentTable";
import AccountExpenseModal from "../components/AccountExpenseModal";
import AccountIncomeModal from "../components/AccountIncomeModal";
import AccountRepaymentModal from "../components/AccountRepaymentModal";

const AccountPage = () => {
    const { accountId } = useParams();

    const auth = useSelector(getUserAuth);

    const [isLoading, setIsLoading] = useState(true);
    const [account, setAccount] = useState({});
    const [categoriesMonth, setCategoriesMonth] = useState([]);
    const [allAccounts, setAllAccounts] = useState([]);

    const [openAccountExpenseModal, setopenAccountExpenseModal] = useState(false);
    const [openAccountIncomeModal, setopenAccountIncomeModal] = useState(false);
    const [openAccountRepaymentModal, setopenAccountRepaymentModal] = useState(false);

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth.token);

        axiosInstance.get(`/api/accounts/${accountId}`).then(({ data }) => {
            setAccount(data.data);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth.token);

        axiosInstance.get(`/api/categories`).then(({ data }) => {
            setCategoriesMonth(data.data);
        });

        axiosInstance.get(`/api/accounts?type=BANK`).then(({ data }) => {
            setAllAccounts(data.data);
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
                                <p className="text-xs text-white bg-purple-500 px-2 py-2 rounded-lg">
                                    {account.entity_name}
                                </p>
                            </div>

                            {account.type === "BANK" ? (
                                <div>
                                    <p className="pt-4 text-4xl">₹{account.balance}</p>
                                    <div className="flex justify-center items-center my-4">
                                        <button
                                            onClick={() => setopenAccountIncomeModal(true)}
                                            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg mr-4">
                                            Add Income
                                        </button>
                                        <button
                                            onClick={() => setopenAccountExpenseModal(true)}
                                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg">
                                            Add Expense
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <p className="pt-4 text-4xl">₹{account.amount_due}</p>
                                    <div className="flex justify-center items-center my-4">
                                        <button
                                            onClick={() => setopenAccountRepaymentModal(true)}
                                            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg mr-4">
                                            Add Repayment
                                        </button>
                                        <button
                                            onClick={() => setopenAccountExpenseModal(true)}
                                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg">
                                            Add Expense
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {openAccountIncomeModal && (
                            <AccountIncomeModal
                                closeModal={setopenAccountIncomeModal}
                                accountId={accountId}
                                axiosPrivateInstance={axiosPrivateInstance}
                                auth={auth}
                            />
                        )}
                        {openAccountExpenseModal && (
                            <AccountExpenseModal
                                closeModal={setopenAccountExpenseModal}
                                categoriesMonth={categoriesMonth}
                                accountId={accountId}
                                axiosPrivateInstance={axiosPrivateInstance}
                                auth={auth}
                            />
                        )}
                        {openAccountRepaymentModal && (
                            <AccountRepaymentModal
                                closeModal={setopenAccountRepaymentModal}
                                accounts={allAccounts}
                                accountId={accountId}
                                axiosPrivateInstance={axiosPrivateInstance}
                                auth={auth}
                            />
                        )}

                        <div className="mt-2">
                            <h2 className="text-2xl font-semibold bg-green-500 text-white py-2 pl-4">All Expenses</h2>
                            <ExpenseTable expenses={account.expenses} />
                        </div>
                        {account.type === "BANK" ? (
                            <div className="mt-8">
                                <h2 className="text-2xl font-semibold bg-green-500 text-white py-2 pl-4">
                                    All Incomes
                                </h2>
                                <IncomeTable incomes={account.incomes} />
                            </div>
                        ) : (
                            <div className="mt-8">
                                <h2 className="text-2xl font-semibold bg-green-500 text-white py-2 pl-4">
                                    All Repayments
                                </h2>
                                <RepaymentTable repayments={account.repayments} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountPage;
