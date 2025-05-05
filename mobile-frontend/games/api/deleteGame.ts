import { createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_URL, buildRequest } from "../../app/config";
import { RootState } from "@/app/store";

export const deleteGame = createAsyncThunk(
    "game/deleteGame",
    async (id: string, { getState, rejectWithValue }) => {

        const { user: { jwt } } = getState() as RootState;

        try {
            const response = await fetch(`${SERVER_URL}/games/${id}`, buildRequest("DELETE", undefined, jwt));

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || "Login failed");
            }

            const json = await response.json();

        } catch (error: any) {
            return rejectWithValue(error.message || "Network error");
        }
    }
);
