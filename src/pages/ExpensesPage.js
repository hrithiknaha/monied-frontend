import { useState, useEffect } from "react";
import moment from "moment";
import { useSelector } from "react-redux";

import { getUserAuth } from "../redux/features/auth/authSlice";
import { axiosPrivateInstance } from "../configs/axios";

import ExpenseTable from "../components/ExpenseTable";
import LoadingSpinner from "../components/LoadingSpinner";

const ExpensesPage = () => {
    const auth = useSelector(getUserAuth);

    const [isLoading, setIsLoading] = useState(true);
    const [expenses, setExpenses] = useState([]);

    const [filteredExpenses, setFilteredExpenses] = useState([]);

    const [expenseYears, setExpenseYears] = useState([]);
    const [expenseMonths, setExpenseMonths] = useState([]);
    const [selectedExpenseYear, setSelectedExpenseYear] = useState(moment(Date.now()).utc().year());
    const [selectedExpenseMonth, setSelectedExpenseMonth] = useState(moment(Date.now()).utc().format("MMMM"));

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth.token);

        axiosInstance.get("/api/expenses").then(({ data }) => {
            setExpenses(data.data);
            setIsLoading(false);

            const expenseYears = data.data.map((expense) => {
                return moment(expense.transaction_date).utc().year();
            });

            const expenseMonths = data.data.map((expense) => {
                return {
                    monthName: moment(expense.transaction_date).utc().format("MMMM"),
                    monthNumber: moment(expense.transaction_date).utc().month(),
                };
            });

            setExpenseYears([...new Set(expenseYears.reverse())]);

            expenseMonths.sort((a, b) => a.monthNumber - b.monthNumber);
            const sortedMonthNames = expenseMonths.map((month) => month.monthName);
            setExpenseMonths([...new Set(sortedMonthNames)]);
        });
    }, []);

    useEffect(() => {
        const filterExpense = () => {
            if (selectedExpenseMonth === "all" && selectedExpenseYear === "all") {
                setFilteredExpenses(expenses);
            } else {
                const filteredData = expenses.filter((item) => {
                    const itemDate = moment(item.transaction_date);
                    const itemMonth = itemDate.format("MMMM");
                    const itemYear = itemDate.year();

                    return (
                        (selectedExpenseMonth === "all" || itemMonth === selectedExpenseMonth) &&
                        (selectedExpenseYear === "all" || itemYear === parseInt(selectedExpenseYear))
                    );
                });

                setFilteredExpenses(filteredData);
            }
        };

        filterExpense();
    }, [expenses, selectedExpenseMonth, selectedExpenseYear]);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="py-4 mx-auto container px-4">
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="mt-6">
                        <h2 className="text-gray-600 text-xl font-semibold text-center">All Expenses</h2>
                        <div className="flex gap-4 justify-center mt-8">
                            <div className="flex gap-2 items-center mb-4">
                                <label htmlFor="expenseYears" className="block text-gray-700 font-bold">
                                    Year
                                </label>
                                <select
                                    id="expenseYears"
                                    name="expenseYears"
                                    value={selectedExpenseYear}
                                    onChange={(e) => setSelectedExpenseYear(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required>
                                    <option value="all">All</option>
                                    {expenseYears.map((year) => {
                                        return (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="flex gap-2 items-center mb-4">
                                <label htmlFor="expenseMonths" className="block text-gray-700 font-bold">
                                    Month
                                </label>
                                <select
                                    id="expenseMonths"
                                    name="expenseMonths"
                                    value={selectedExpenseMonth}
                                    onChange={(e) => setSelectedExpenseMonth(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required>
                                    <option value="all">All</option>
                                    {expenseMonths.map((month) => {
                                        return (
                                            <option key={month} value={month}>
                                                {month}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <ExpenseTable expenses={filteredExpenses} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExpensesPage;
