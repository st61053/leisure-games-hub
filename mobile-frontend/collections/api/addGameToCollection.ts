import { createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_URL, buildRequest } from "../../app/config";
import { RootState } from "@/app/store";

interface IAddGameToCollectionRequest {
    collectionId: string;
    gameId: string;
    method: "POST" | "DELETE";
}

export const addGameToCollection = createAsyncThunk(
    "collection/addGameToCollection",
    async (request: IAddGameToCollectionRequest, { getState, rejectWithValue }) => {

        const { user: { jwt } } = getState() as RootState;

        try {
            const response = await fetch(`${SERVER_URL}/collections/${request.collectionId}/games/${request.gameId}`, buildRequest(request.method, undefined, jwt));

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
