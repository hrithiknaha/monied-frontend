import { useState, useEffect } from "react";

function AddAccountModal({ closeModal, axiosPrivateInstance, auth, setAddAccountTrigger }) {
    const [accountName, setAccountName] = useState("");
    const [openingBalance, setOpeningBalance] = useState(0);
    const [accountType, setAccountType] = useState("");
    const [entityName, setEntityName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const axiosInstance = axiosPrivateInstance(auth.token);

        const payload = {
            account_name: accountName,
            account_type: accountType,
            entity_name: entityName,
            opening_balance: openingBalance,
        };

        axiosInstance.post(`/api/accounts/add`, payload).then(({ data }) => {
            closeModal(false);
            setAddAccountTrigger(true);
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
            <div className="bg-white shadow-md rounded w-80 p-6">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="accountName"
                            name="accountName"
                            value={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Account Name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">
                            Opening Balance
                        </label>
                        <input
                            type="number"
                            id="openingBalance"
                            name="openingBalance"
                            value={openingBalance}
                            onChange={(e) => setOpeningBalance(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Opening Balance"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
                            Account Type
                        </label>
                        <select
                            id="accountType"
                            name="accountType"
                            value={accountType}
                            onChange={(e) => setAccountType(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required>
                            <option value="">Select a Account Type</option>
                            <option value="BANK">Bank</option>
                            <option value="CREDIT_CARD">Credit Card</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                            Entity Name
                        </label>
                        <input
                            type="text"
                            id="entityName"
                            name="entityName"
                            value={entityName}
                            onChange={(e) => setEntityName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Entity Name"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
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

export default AddAccountModal;
