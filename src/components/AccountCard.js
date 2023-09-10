import { AiFillBank } from "react-icons/ai";
import { Link } from "react-router-dom";

const AccountCard = ({ account }) => {
    return (
        <Link to={`/accounts/${account._id}`} className="flex-grow w-40 bg-white shadow-md rounded-lg p-2">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
                <AiFillBank />
                {account.name}
            </h3>
            <p className="text-xs text-gray-600">{account.entity_name}</p>
            <p className="pt-2 text-lg">₹{account.balance}</p>
        </Link>
    );
};

export default AccountCard;
