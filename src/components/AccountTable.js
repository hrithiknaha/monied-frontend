import React from "react";

const AccountTable = ({ account }) => {
    return (
        <table className="shadow-md rounded-lg overflow-hidden">
            <thead className="bg-green-500">
                <tr>
                    <th
                        scope="col"
                        className="px-2 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Account Name
                    </th>
                    <th
                        scope="col"
                        className="px-2 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Account Type
                    </th>
                    <th
                        scope="col"
                        className="px-2 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Account Entity Name
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="text-left text-sm px-2 py-4 whitespace-normal">{account.account_name}</td>
                    <td className="text-left text-sm px-2 py-4 whitespace-normal">{account.account_type}</td>
                    <td className="text-left text-sm px-2 py-4 whitespace-normal">{account.account_entity_name}</td>
                </tr>
            </tbody>
        </table>
    );
};

export default AccountTable;
