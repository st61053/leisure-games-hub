import { createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_URL, buildRequest } from "../../app/config";
import { RootState } from "@/app/store";

export const getGame = createAsyncThunk(
    "game/getGame",
    async (id: string, { getState, rejectWithValue }) => {

        const { user: { jwt } } = getState() as RootState;
        const url = `${SERVER_URL}/games/${id}`;

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
