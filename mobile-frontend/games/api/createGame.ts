import { createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_URL, buildRequest } from "../../app/config";
import { RootState } from "@/app/store";
import { IGame } from "../types";

export const createGame = createAsyncThunk(
    "game/createGame",
    async (game: IGame, { getState, rejectWithValue }) => {

        const { user: { jwt } } = getState() as RootState;

        const url = `${SERVER_URL}/games${game.id ? `/${game.id}` : ""}`;

        try {
            const response = await fetch(url, buildRequest(game.id ? "PUT" : "POST", game, jwt));

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
