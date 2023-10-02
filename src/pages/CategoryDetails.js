import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

import { axiosPrivateInstance } from "../configs/axios";
import { getUserAuth } from "../redux/features/auth/authSlice";

import { formatIndianCurrency } from "../configs/helpers";
import LoadingSpinner from "../components/LoadingSpinner";

const CategoryDetails = () => {
    const { categoryId } = useParams();
    const auth = useSelector(getUserAuth);

    const [category, setCategory] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const [expandedCategories, setExpandedCategories] = useState({});

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth.token);

        axiosInstance.get(`/api/categories/${categoryId}`).then(({ data }) => {
            setCategory(data.data[0]);
            setIsLoading(false);
        });
    }, [categoryId]);

    const toggleCategoryExpansion = (categoryId) => {
        setExpandedCategories((prevState) => ({
            ...prevState,
            [categoryId]: !prevState[categoryId],
        }));
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="py-4 mx-auto container px-4">
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
                        <h1 className="text-2xl font-semibold mb-4">{category.name}</h1>

                        <div className="mb-4">
                            <p className="text-gray-600">
                                <span className="font-semibold">Month:</span> {category.month}, {category.year}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">Start Date:</span>{" "}
                                {moment(category.start_date).utc().format("DD-MM-YYYY")}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">End Date:</span>{" "}
                                {moment(category.end_date).utc().format("DD-MM-YYYY")}
                            </p>
                        </div>

                        <div className="mb-4">
                            <h2 className="text-lg font-semibold mb-2">Categories:</h2>
                            <ul>
                                {category.categories.map((item, index) => {
                                    const percentageUsed = (item.amountUsed / item.amount) * 100;
                                    const colorClass =
                                        percentageUsed <= 50
                                            ? "text-green-500"
                                            : percentageUsed <= 80
                                            ? "text-yellow-500"
                                            : "text-red-500";

                                    return (
                                        <li key={index} className="flex flex-col">
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-col items-center">
                                                    <div className="flex items-center">
                                                        <div className="flex items-center gap-1">
                                                            <button onClick={() => toggleCategoryExpansion(item._id)}>
                                                                {expandedCategories[item._id] ? (
                                                                    <AiOutlineArrowUp />
                                                                ) : (
                                                                    <AiOutlineArrowDown />
                                                                )}
                                                            </button>
                                                            <span>{item.title}</span>
                                                        </div>
                                                        <span className="text-gray-600 text-xs ml-2">
                                                            (₹{item.amountUsed} / ₹{item.amount})
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <div
                                                        className={`w-16 h-2 rounded-full bg-${colorClass}`}
                                                        style={{ width: `${percentageUsed}%` }}></div>
                                                    <span className={`ml-2 ${colorClass}`}>
                                                        {percentageUsed.toFixed(1)}%
                                                    </span>
                                                </div>
                                            </div>
                                            {expandedCategories[item._id] && (
                                                <div className="mb-4">
                                                    <ul>
                                                        {item.expenses.map((expense) => (
                                                            <li
                                                                key={index}
                                                                className="flex justify-center items-center">
                                                                <div>
                                                                    <Link
                                                                        to={`/expenses/${expense._id}`}
                                                                        className="text-xs underline hover:text-green-500">
                                                                        {expense.name}
                                                                    </Link>
                                                                    <span className="text-gray-600 text-xs ml-2">
                                                                        (₹{expense.amount} on{" "}
                                                                        {moment(expense.transaction_date).format(
                                                                            "DD-MM-YYYY"
                                                                        )}
                                                                        )
                                                                    </span>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <div className="mb-4">
                            <p className="text-gray-600">
                                <span className="font-semibold">Total Amount in Categories:</span> ₹
                                {category.categories.reduce((total, item) => total + item.amount, 0)}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">Total Amount Used:</span> ₹
                                {category.categories.reduce((total, item) => total + item.amountUsed, 0)}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">Percentage Used:</span>{" "}
                                {(
                                    (category.categories.reduce(
                                        (total, item) => total + item.amountUsed / item.amount,
                                        0
                                    ) /
                                        category.categories.length) *
                                    100
                                ).toFixed(1)}
                                %
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryDetails;
