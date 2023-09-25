import moment from "moment";

const ExpenseTable = ({ expenses }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th
                            scope="col"
                            className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                        </th>
                        <th
                            scope="col"
                            className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                        </th>
                        <th
                            scope="col"
                            className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {expenses
                        .sort((a, b) => (a.transaction_date > b.transaction_date ? -1 : 1))
                        .map((expense) => {
                            return (
                                <tr key={expense._id}>
                                    <td className="px-2 py-4 whitespace-nowrap">{expense.name}</td>
                                    <td className="px-2 py-4 whitespace-nowrap">₹{expense.amount}</td>
                                    <td className="px-2 py-4 whitespace-nowrap">{expense.category}</td>
                                    <td className="px-2 py-4 whitespace-nowrap">
                                        {moment(expense.transaction_date).format("DD-MM-YYYY")}
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};

export default ExpenseTable;
