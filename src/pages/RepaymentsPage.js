import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getUserAuth } from "../redux/features/auth/authSlice";
import { axiosPrivateInstance } from "../configs/axios";

import RepaymentTable from "../components/RepaymentTable";
import LoadingSpinner from "../components/LoadingSpinner";

const RepaymentsPage = () => {
    const auth = useSelector(getUserAuth);

    const [isLoading, setIsLoading] = useState(true);
    const [repayments, setRepayments] = useState([]);

    useEffect(() => {
        const axiosInstance = axiosPrivateInstance(auth.token);

        axiosInstance.get("/api/repayments").then(({ data }) => {
            setRepayments(data.data);
            setIsLoading(false);
        });
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="py-4 mx-auto container px-4">
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="mt-6">
                        <h2 className="text-gray-600 text-xl font-semibold text-center">All Repayments</h2>
                        <RepaymentTable repayments={repayments} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default RepaymentsPage;
