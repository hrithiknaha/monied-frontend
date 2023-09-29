import { BsFillCreditCard2BackFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { formatIndianCurrency } from "../configs/helpers";

const CreditCard = ({ creditcard }) => {
    return (
        <Link to={`/accounts/${creditcard._id}`} className="flex-grow w-40 bg-white shadow-md rounded-lg p-2">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
                <BsFillCreditCard2BackFill />
                {creditcard.name}
            </h3>
            <p className="text-xs text-gray-600">{creditcard.entity_name}</p>
            <p className="pt-2 text-lg">₹{formatIndianCurrency(creditcard.amount_due)}</p>
        </Link>
    );
};

export default CreditCard;
