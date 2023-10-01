import { useState, useEffect } from "react";
import moment from "moment";
import { useSelector } from "react-redux";

import { getUserAuth } from "../redux/features/auth/authSlice";
import { axiosPrivateInstance } from "../configs/axios";

import RepaymentTable from "../components/RepaymentTable";
import LoadingSpinner from "../components/LoadingSpinner";

const RepaymentsPage = () => {
    const auth = useSelector(getUserAuth);

    const [isLoading, setIsLoading] = useState(true);
    const [repayments, setRepayments] = useState([]);

    const [filteredRepayments, setFilteredRepayments] = useState([]);

    const [repaymentYears, setRepaymentYears] = useState([]);
    const [repaymentMonths, setRepaymentMonths] = useState([]);
    const [selectedRepaymentYear, setSelectedRepaymentYear] = useState(moment(Date.now()).utc().year());
    const [selectedRepaymentMonth, setSelectedRepaymentMonth] = useState(moment(Date.now()).utc().format("MMMM"));

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth.token);

        axiosInstance.get("/api/repayments").then(({ data }) => {
            setRepayments(data.data);
            setIsLoading(false);

            const repaymentYears = data.data.map((repayment) => {
                return moment(repayment.transaction_date).utc().year();
            });

            const repaymentMonths = data.data.map((repayment) => {
                return {
                    monthName: moment(repayment.transaction_date).utc().format("MMMM"),
                    monthNumber: moment(repayment.transaction_date).utc().month(),
                };
            });

            setRepaymentYears([...new Set(repaymentYears.reverse())]);

            repaymentMonths.sort((a, b) => a.monthNumber - b.monthNumber);
            const sortedMonthNames = repaymentMonths.map((month) => month.monthName);
            setRepaymentMonths([...new Set(sortedMonthNames)]);
        });
    }, []);

    useEffect(() => {
        const filterRepayment = () => {
            if (selectedRepaymentMonth === "all" && selectedRepaymentYear === "all") {
                setFilteredRepayments(repayments);
            } else {
                const filteredData = repayments.filter((item) => {
                    const itemDate = moment(item.transaction_date);
                    const itemMonth = itemDate.format("MMMM");
                    const itemYear = itemDate.year();

                    return (
                        (selectedRepaymentMonth === "all" || itemMonth === selectedRepaymentMonth) &&
                        (selectedRepaymentYear === "all" || itemYear === parseInt(selectedRepaymentYear))
                    );
                });

                setFilteredRepayments(filteredData);
            }
        };

        filterRepayment();
    }, [repayments, selectedRepaymentMonth, selectedRepaymentYear]);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="py-4 mx-auto container px-4">
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="mt-6">
                        <h2 className="text-gray-600 text-xl font-semibold text-center">All Repayments</h2>
                        <div className="flex gap-4 justify-center mt-8">
                            <div className="flex gap-2 items-center mb-4">
                                <label htmlFor="repaymentYears" className="block text-gray-700 font-bold">
                                    Year
                                </label>
                                <select
                                    id="repaymentYears"
                                    name="repaymentYears"
                                    value={selectedRepaymentYear}
                                    onChange={(e) => setSelectedRepaymentYear(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required>
                                    <option value="all">All</option>
                                    {repaymentYears.map((year) => {
                                        return (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="flex gap-2 items-center mb-4">
                                <label htmlFor="repaymentMonths" className="block text-gray-700 font-bold">
                                    Month
                                </label>
                                <select
                                    id="repaymentMonths"
                                    name="repaymentMonths"
                                    value={selectedRepaymentMonth}
                                    onChange={(e) => setSelectedRepaymentMonth(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required>
                                    <option value="all">All</option>
                                    {repaymentMonths.map((month) => {
                                        return (
                                            <option key={month} value={month}>
                                                {month}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <RepaymentTable repayments={filteredRepayments} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default RepaymentsPage;
