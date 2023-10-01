import { useState, useEffect } from "react";
import moment from "moment";
import { useSelector } from "react-redux";

import { getUserAuth } from "../redux/features/auth/authSlice";
import { axiosPrivateInstance } from "../configs/axios";

import IncomeTable from "../components/IncomeTable";
import LoadingSpinner from "../components/LoadingSpinner";

const IncomesPage = () => {
    const auth = useSelector(getUserAuth);

    const [isLoading, setIsLoading] = useState(true);
    const [incomes, setIncomes] = useState([]);

    const [filteredIncomes, setFilteredIncomes] = useState([]);

    const [incomeYears, setIncomeYears] = useState([]);
    const [incomeMonths, setIncomeMonths] = useState([]);
    const [selectedIncomeYear, setSelectedIncomeYear] = useState(moment(Date.now()).utc().year());
    const [selectedIncomeMonth, setSelectedIncomeMonth] = useState(moment(Date.now()).utc().format("MMMM"));

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth.token);

        axiosInstance.get("/api/incomes").then(({ data }) => {
            setIncomes(data.data);
            setIsLoading(false);

            const incomeYears = data.data.map((income) => {
                return moment(income.transaction_date).utc().year();
            });

            const incomeMonths = data.data.map((income) => {
                return {
                    monthName: moment(income.transaction_date).utc().format("MMMM"),
                    monthNumber: moment(income.transaction_date).utc().month(),
                };
            });

            setIncomeYears([...new Set(incomeYears.reverse())]);

            incomeMonths.sort((a, b) => a.monthNumber - b.monthNumber);
            const sortedMonthNames = incomeMonths.map((month) => month.monthName);
            setIncomeMonths([...new Set(sortedMonthNames)]);
        });
    }, []);

    useEffect(() => {
        const filterIncome = () => {
            if (selectedIncomeMonth === "all" && selectedIncomeYear === "all") {
                setFilteredIncomes(incomes);
            } else {
                const filteredData = incomes.filter((item) => {
                    const itemDate = moment(item.transaction_date);
                    const itemMonth = itemDate.format("MMMM");
                    const itemYear = itemDate.year();

                    return (
                        (selectedIncomeMonth === "all" || itemMonth === selectedIncomeMonth) &&
                        (selectedIncomeYear === "all" || itemYear === parseInt(selectedIncomeYear))
                    );
                });

                setFilteredIncomes(filteredData);
            }
        };

        filterIncome();
    }, [incomes, selectedIncomeMonth, selectedIncomeYear]);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="py-4 mx-auto container px-4">
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="mt-6">
                        <h2 className="text-gray-600 text-xl font-semibold text-center">All Incomes</h2>
                        <div className="flex gap-4 justify-center mt-8">
                            <div className="flex gap-2 items-center mb-4">
                                <label htmlFor="incomeYears" className="block text-gray-700 font-bold">
                                    Year
                                </label>
                                <select
                                    id="incomeYears"
                                    name="incomeYears"
                                    value={selectedIncomeYear}
                                    onChange={(e) => setSelectedIncomeYear(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required>
                                    <option value="all">All</option>
                                    {incomeYears.map((year) => {
                                        return (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="flex gap-2 items-center mb-4">
                                <label htmlFor="incomeMonths" className="block text-gray-700 font-bold">
                                    Month
                                </label>
                                <select
                                    id="incomeMonths"
                                    name="incomeMonths"
                                    value={selectedIncomeMonth}
                                    onChange={(e) => setSelectedIncomeMonth(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required>
                                    <option value="all">All</option>
                                    {incomeMonths.map((month) => {
                                        return (
                                            <option key={month} value={month}>
                                                {month}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <IncomeTable incomes={filteredIncomes} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default IncomesPage;
