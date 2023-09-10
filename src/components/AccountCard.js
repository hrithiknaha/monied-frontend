import React from "react";
import { AiFillBank } from "react-icons/ai";

const AccountCard = ({ account }) => {
    return (
        <div className="flex-grow w-40 bg-white shadow-md rounded-lg p-2">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
                <AiFillBank />
                {account.name}
            </h3>
            <p className="text-xs text-gray-600">{account.entity_name}</p>
            <p className="pt-2 text-lg">₹{account.balance}</p>
        </div>
    );
};

export default AccountCard;
