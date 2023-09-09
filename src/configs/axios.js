import axios from "axios";

const isDevelopment = process.env.NODE_ENV === "development";

const baseURL = isDevelopment ? "http://localhost:5001" : "";

const axiosPublicInstance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

const axiosPrivateInstance = (auth) =>
    axios.create({
        baseURL,
        timeout: 10000,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
        },
    });

export { axiosPublicInstance, axiosPrivateInstance };
