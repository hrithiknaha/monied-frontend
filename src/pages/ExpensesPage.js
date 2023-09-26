import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getUserAuth } from "../redux/features/auth/authSlice";
import { axiosPrivateInstance } from "../configs/axios";

import ExpenseTable from "../components/ExpenseTable";

const Expenses = () => {
    const auth = useSelector(getUserAuth);

    const [isLoading, setIsLoading] = useState(true);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth.token);

        axiosInstance.get("/api/expenses").then(({ data }) => {
            setExpenses(data.data);
            setIsLoading(false);
            console.log(data);
        });
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="py-4 mx-auto container px-4">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold bg-green-500 text-white py-2 pl-4">All Expense</h2>
                        <ExpenseTable expenses={expenses} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Expenses;
