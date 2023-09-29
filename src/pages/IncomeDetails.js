import { useParams } from "react-router-dom";

const IncomeDetails = () => {
    const { incomeId } = useParams();
    return <div>IncomeDetails : {incomeId}</div>;
};

export default IncomeDetails;
