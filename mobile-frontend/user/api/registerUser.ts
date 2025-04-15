import { createAsyncThunk } from "@reduxjs/toolkit";
import { IRegistrationData } from "../types";
import { SERVER_URL, buildRequest } from "../../app/config";

export interface ILoginResponse {
    token: string;
    userId: string;
}

export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (registrationData: IRegistrationData, { rejectWithValue }) => {

        try {
            const response = await fetch(`${SERVER_URL}/auth/register`, buildRequest("POST", registrationData));

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || "Login failed");
            }

            await response.json();

        } catch (error: any) {
            return rejectWithValue(error.message || "Network error");
        }
    }
);
