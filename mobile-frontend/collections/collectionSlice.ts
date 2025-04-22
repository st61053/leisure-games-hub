import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ICollection, ICollectionState } from './types';
import { getCollections } from './api/getCollections';
import { getCollection } from './api/getCollection';

const initialState: ICollectionState = {
    collections: [],
    loading: false,
}

export const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // GET COLLECTIONS
            .addCase(getCollections.fulfilled, (state, action: PayloadAction<ICollection[]>) => {
                state.collections = action.payload;
            })
            // GET COLLECTION
            .addCase(getCollection.fulfilled, (state, action: PayloadAction<ICollection>) => {
                const updatedGame = action.payload;
                const index = state.collections.findIndex(collection => collection.id === updatedGame.id);

                if (index !== -1) {
                    state.collections[index] = updatedGame;
                } else {
                    state.collections.push(updatedGame);
                }

                state.loading = false;
            })

    },
})

export default collectionSlice.reducer