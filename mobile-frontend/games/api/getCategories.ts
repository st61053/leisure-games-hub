import { createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_URL, buildRequest } from "../../app/config";
import { RootState } from "@/app/store";

export const getCategories = createAsyncThunk(
    "game/getCategories",
    async (_: void, { getState, rejectWithValue }) => {

        const { user: { jwt } } = getState() as RootState;

        try {
            const response = await fetch(`${SERVER_URL}/categories`, buildRequest("GET", undefined, jwt));

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || "Login failed");
            }

            const result = await response.json();
            return result.data;

        } catch (error: any) {
            return rejectWithValue(error.message || "Network error");
        }
    }
);
