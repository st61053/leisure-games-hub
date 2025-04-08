import { createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_URL, buildRequest } from "../../app/config";
import { RootState } from "@/app/store";

export const getUser = createAsyncThunk(
    "user/getUser",
    async (id: string, { getState, rejectWithValue }) => {

        const { user: { jwt } } = getState() as RootState;

        try {
            const response = await fetch(`${SERVER_URL}/users/${id}`, buildRequest("GET", undefined, jwt));

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || "Login failed");
            }

            const result = await response.json();
            return result.data[0];

        } catch (error: any) {
            return rejectWithValue(error.message || "Network error");
        }
    }
);
