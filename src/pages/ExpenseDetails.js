import { useParams } from "react-router-dom";

const ExpenseDetails = () => {
    const { expenseId } = useParams();

    return <div>ExpenseDetails {expenseId}</div>;
};

export default ExpenseDetails;
