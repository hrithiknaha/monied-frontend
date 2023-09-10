import moment from "moment";

const RepaymentTable = ({ repayments }) => {
    return (
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            class="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th
                            scope="col"
                            class="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                        </th>
                        <th
                            scope="col"
                            class="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    {repayments
                        .sort((a, b) => (a.transaction_date > b.transaction_date ? -1 : 1))
                        .map((repayment) => {
                            return (
                                <tr key={repayment._id}>
                                    <td class="px-2 py-4 whitespace-nowrap">{repayment.name}</td>
                                    <td class="px-2 py-4 whitespace-nowrap">₹{repayment.amount}</td>
                                    <td class="px-2 py-4 whitespace-nowrap">
                                        {moment(repayment.transaction_date).format("DD-MM-YYYY")}
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};

export default RepaymentTable;
