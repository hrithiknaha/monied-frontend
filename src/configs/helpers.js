import jwtDecode from "jwt-decode";

export const retrieveAccessToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return {};

    const { username, exp } = jwtDecode(token);
    return { token, username, exp };
};

export const formatIndianCurrency = (amount) => {
    const parts = amount.toFixed(2).toString().split(".");

    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return parts.join(".");
};
