import { useState, useEffect } from "react";
import moment from "moment";

function AddCategoryModal({ closeModal, axiosPrivateInstance, auth, trigger, setTrigger }) {
    const [categoryName, setCategoryName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [categories, setCategories] = useState([]);

    const addCategory = () => {
        setCategories((prevState) => {
            return [
                ...prevState,
                {
                    title: "",
                    amount: 0,
                    amountUsed: 0,
                    expenses: [],
                },
            ];
        });
    };

    const handleTitleChange = (e) => {
        e.preventDefault();

        const index = e.target.id;
        setCategories((prevState) => {
            const newArr = prevState.slice();
            newArr[index].title = e.target.value;

            return newArr;
        });
    };

    const handleAmountChange = (e) => {
        e.preventDefault();

        const index = e.target.id;
        setCategories((prevState) => {
            const newArr = prevState.slice();
            newArr[index].amount = parseInt(e.target.value);

            return newArr;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const axiosInstance = axiosPrivateInstance(auth.token);

        const payload = {
            name: categoryName,
            start_date: startDate,
            end_date: endDate,
            month: moment(startDate).format("MMMM").toUpperCase(),
            year: moment(startDate).format("YYYY"),
            categories,
        };

        console.log(payload);

        axiosInstance.post(`/api/categories/add`, payload).then(({ data }) => {
            closeModal(false);
            setTrigger(!trigger);
        });
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-md">
            <div className="bg-white shadow-md rounded w-80 p-6 overflow-y-auto max-h-96">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="categoryName"
                            name="categoryName"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Category Name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
                            Start Date
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
                            End Date
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        {categories.map((item, i) => {
                            return (
                                <div key={i} className="mb-4 flex gap-4">
                                    <div className="mb-4">
                                        <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            id={i}
                                            value={item.title}
                                            onChange={handleTitleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
                                            Amount
                                        </label>
                                        <input
                                            type="number"
                                            id={i}
                                            value={item.amount}
                                            onChange={handleAmountChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            required
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
                            onClick={addCategory}>
                            Add
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline">
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={() => closeModal(false)}
                            className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddCategoryModal;
