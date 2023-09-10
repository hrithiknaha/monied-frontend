import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

import { axiosPublicInstance } from "../../../configs/axios";
import { retrieveAccessToken } from "../../../configs/helpers";

const initialState = {
    loading: false,
    user: {
        isLoggedIn: Boolean(retrieveAccessToken()?.token),
        username: retrieveAccessToken()?.username,
        token: retrieveAccessToken()?.token,
        exp: retrieveAccessToken()?.exp,
    },
    error: null,
};

export const registerUser = createAsyncThunk("auth/register", async (payload) => {
    const response = await axiosPublicInstance.post("/api/auth/register", payload);
    return response.data;
});

export const loginUser = createAsyncThunk("auth/login", async (payload) => {
    const response = await axiosPublicInstance.post("/api/auth/login", payload);
    return response.data;
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
    await axiosPublicInstance.get("/api/auth/logout");
    localStorage.removeItem("token");
    return;
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            const token = action.payload.accessToken;
            const { username, exp } = jwtDecode(token);

            localStorage.setItem("token", token);

            state.loading = false;
            state.user.isLoggedIn = true;
            state.user.username = username;
            state.user.token = token;
            state.user.exp = exp;
        });
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            const token = action.payload.accessToken;
            const { username, exp } = jwtDecode(token);

            localStorage.setItem("token", token);

            state.loading = false;
            state.user.isLoggedIn = true;
            state.user.username = username;
            state.user.token = token;
            state.user.exp = exp;
        });
        builder.addCase(logoutUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.loading = false;
            state.user.isLoggedIn = false;
            state.user.username = null;
            state.user.token = null;
            state.user.exp = null;
        });
    },
});

export const getUserAuth = (state) => state.auth.user;
export const getAuthLoading = (state) => state.auth.loading;
export const getAuthError = (state) => state.auth.error;

export default authSlice.reducer;
