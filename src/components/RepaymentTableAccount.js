import moment from "moment";
import { Link } from "react-router-dom";
import { formatIndianCurrency } from "../configs/helpers";

const RepaymentTable = ({ repayments, account }) => {
    return (
        <div className="bg-white shadow-md rounded-lg my-6 overflow-x-auto">
            <table className="min-w-max divide-y divide-gray-200 w-full">
                <thead className="bg-green-500">
                    <tr>
                        <th
                            scope="col"
                            className="px-2 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                            Name
                        </th>
                        <th
                            scope="col"
                            className="px-2 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                            Amount
                        </th>
                        <th
                            scope="col"
                            className="px-2 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                            Date
                        </th>
                        <th
                            scope="col"
                            className="px-2 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
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
                                    <td className="text-sm px-2 py-4 whitespace-normal">
                                        <Link
                                            to={`/repayments/${repayment._id}`}
                                            className="text-sm text-gray-900 hover:underline hover:text-blue-400">
                                            {repayment.name}
                                        </Link>
                                    </td>
                                    <td className="text-sm px-2 py-4 whitespace-normal">
                                        ₹{formatIndianCurrency(repayment.amount)}
                                    </td>
                                    <td className="text-sm px-2 py-4 whitespace-normal">
                                        {moment(repayment.transaction_date).format("DD-MM-YYYY")}
                                    </td>
                                    <td className="text-sm px-2 py-4 whitespace-normal">{account.name}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};

export default RepaymentTable;
