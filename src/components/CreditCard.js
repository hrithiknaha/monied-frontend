import React from "react";
import { BsFillCreditCard2BackFill } from "react-icons/bs";

const CreditCard = ({ creditcard }) => {
    return (
        <div className="flex-grow w-40 bg-white shadow-md rounded-lg p-2">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
                <BsFillCreditCard2BackFill />
                {creditcard.name}
            </h3>
            <p className="text-xs text-gray-600">{creditcard.entity_name}</p>
            <p className="pt-2 text-lg">₹{creditcard.amount_due}</p>
        </div>
    );
};

export default CreditCard;