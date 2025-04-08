import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILoginData } from "../types";
import { SERVER_URL, buildRequest } from "../../app/config";

export interface ILoginResponse {
    token: string;
    userId: string;
}

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (loginData: ILoginData, { rejectWithValue }) => {

        try {
            const response = await fetch(`${SERVER_URL}/auth/login`, buildRequest("POST", loginData));

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || "Login failed");
            }

            const result = await response.json();
            return result.data[0].attributes as ILoginResponse;

        } catch (error: any) {
            return rejectWithValue(error.message || "Network error");
        }
    }
);
