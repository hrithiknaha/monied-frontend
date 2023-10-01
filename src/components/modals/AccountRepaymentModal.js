import { useState, useEffect } from "react";

function AccountRepaymentModal({ closeModal, accounts, accountId, axiosPrivateInstance, auth, trigger, setTrigger }) {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [repaymentFromAccount, setRepaymentFromAccount] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const axiosInstance = axiosPrivateInstance(auth.token);

        const payload = {
            name,
            amount: parseInt(amount),
            date,
            account_id: repaymentFromAccount,
            repayment_account_id: accountId,
        };

        axiosInstance.post(`/api/repayments/add`, payload).then(({ data }) => {
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
            <div className="bg-white shadow-md rounded w-80 p-6">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Repayment Name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">
                            Amount
                        </label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Repayment Amount"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
                            Account
                        </label>
                        <select
                            id="account"
                            name="account"
                            value={repaymentFromAccount}
                            onChange={(e) => setRepaymentFromAccount(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required>
                            <option value="">Select Account</option>
                            {accounts.map((account) => {
                                return (
                                    <option key={account._id} value={account._id}>
                                        {account.name}
                                    </option>
                                );
                            })}
                        </select>
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

export default AccountRepaymentModal;
