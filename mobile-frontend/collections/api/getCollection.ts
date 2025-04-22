import { createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_URL, buildRequest } from "../../app/config";
import { RootState } from "@/app/store";

export const getCollection = createAsyncThunk(
    "collection/getCollection",
    async (id: string, { getState, rejectWithValue }) => {

        const { user: { jwt } } = getState() as RootState;
        const url = `${SERVER_URL}/collections/${id}`;

        try {
            const response = await fetch(url, buildRequest("GET", undefined, jwt));

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
