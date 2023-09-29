import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getUserAuth } from "../redux/features/auth/authSlice";
import { axiosPrivateInstance } from "../configs/axios";

import ExpenseTable from "../components/ExpenseTable";

const ExpensesPage = () => {
    const auth = useSelector(getUserAuth);

    const [isLoading, setIsLoading] = useState(true);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth.token);

        axiosInstance.get("/api/expenses").then(({ data }) => {
            setExpenses(data.data);
            setIsLoading(false);
        });
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="py-4 mx-auto container px-4">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="mt-6">
                        <h2 className="text-gray-600 text-xl font-semibold text-center">All Expenses</h2>
                        <ExpenseTable expenses={expenses} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExpensesPage;
