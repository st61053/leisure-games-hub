import { createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_URL, buildRequest } from "../../app/config";
import { RootState } from "@/app/store";
import { ICollection } from "../types";

export const createCollection = createAsyncThunk(
    "collection/createCollection",
    async (collection: ICollection, { getState, rejectWithValue }) => {

        const { user: { jwt } } = getState() as RootState;

        const url = `${SERVER_URL}/collections${collection.id ? `/${collection.id}` : ""}`;

        try {
            const response = await fetch(url, buildRequest(collection.id ? "PUT" : "POST", collection, jwt));

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
