import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

import { axiosPrivateInstance } from "../configs/axios";
import { getUserAuth } from "../redux/features/auth/authSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import AddCategoryModal from "../components/modals/AddCategoryModal";

const CategoriesPage = () => {
    const [categories, setCategories] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const [addCategoryModal, setAddCategoryModal] = useState(false);
    const [apiTrigger, setApiTrigger] = useState(false);

    const auth = useSelector(getUserAuth);

    useEffect(() => {
        setIsLoading(true);
        const axiosInstance = axiosPrivateInstance(auth.token);

        axiosInstance.get(`/api/categories`).then(({ data }) => {
            setCategories(data.data);
            setIsLoading(false);
        });
    }, [apiTrigger]);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="py-4 mx-auto container px-4">
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="container mx-auto py-4 lg:py-12">
                        <button
                            onClick={() => setAddCategoryModal(true)}
                            className="text-white bg-green-500 px-4 py-2 rounded-lg">
                            Add Category
                        </button>

                        {addCategoryModal && (
                            <AddCategoryModal
                                closeModal={setAddCategoryModal}
                                axiosPrivateInstance={axiosPrivateInstance}
                                auth={auth}
                                trigger={apiTrigger}
                                setTrigger={setApiTrigger}
                            />
                        )}
                        <div className="pt-4 flex flex-wrap gap-2 justify-between">
                            {categories.map((category) => {
                                return (
                                    <Link
                                        to={`/categories/${category._id}`}
                                        key={category._id}
                                        className="w-full bg-white shadow-md rounded-lg p-4 flex flex-col justify-between items-center">
                                        <p className="font-semibold mb-2">{category.name}</p>
                                        <p className="text-xs font-semibold mb-2">
                                            {category.month}, {category.year}
                                        </p>
                                        <div className="flex gap-1 justify-center items-center mb-2">
                                            <p className="text-xs text-gray-600">
                                                {moment(category.start_date).utc().format("LL")}
                                            </p>
                                            <p className="text-xs text-gray-600">-</p>
                                            <p className="text-xs text-gray-600">
                                                {moment(category.end_date).utc().format("LL")}
                                            </p>
                                        </div>
                                        <div className="flex gap-1 justify-center items-center mb-2">
                                            <div className="text-sm bg-green-500 px-2 rounded-full text-white">
                                                {category.categories.filter((category) => category.amount > 0).length}
                                            </div>
                                            <div className="text-sm bg-red-500 px-2 rounded-full text-white">
                                                {category.categories.filter((category) => category.amount < 0).length}
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoriesPage;
