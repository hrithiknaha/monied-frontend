import { useParams } from "react-router-dom";

const RepaymentDetails = () => {
    const { repaymentId } = useParams();
    return <div>RepaymentDetails ${repaymentId}</div>;
};

export default RepaymentDetails;
