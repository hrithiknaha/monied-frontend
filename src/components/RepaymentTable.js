import moment from "moment";

const RepaymentTable = ({ repayments }) => {
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
                            Date
                        </th>
                        <th
                            scope="col"
                            className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Account
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {repayments
                        .sort((a, b) => (a.transaction_date > b.transaction_date ? -1 : 1))
                        .map((repayment) => {
                            return (
                                <tr key={repayment._id}>
                                    <td className="px-2 py-4 whitespace-nowrap">{repayment.name}</td>
                                    <td className="px-2 py-4 whitespace-nowrap">₹{repayment.amount}</td>
                                    <td className="px-2 py-4 whitespace-nowrap">
                                        {moment(repayment.transaction_date).format("DD-MM-YYYY")}
                                    </td>
                                    <td className="px-2 py-4 whitespace-nowrap">{repayment.account.account_name}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};

export default RepaymentTable;
