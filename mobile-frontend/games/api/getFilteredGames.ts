import { createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_URL, buildRequest } from "../../app/config";
import { RootState } from "@/app/store";
import { GameQueryFilter } from "../types";
import { buildQueryParams } from "../functions/buildQueryParams";

export const getFilteredGames = createAsyncThunk(
    "game/getFilteredGames",
    async (filters: GameQueryFilter[], { getState, rejectWithValue }) => {

        const { user: { jwt } } = getState() as RootState;
        const query = buildQueryParams(filters);
        const url = `${SERVER_URL}/games/filter?${query}`;

        try {
            const response = await fetch(url, buildRequest("GET", undefined, jwt));

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
