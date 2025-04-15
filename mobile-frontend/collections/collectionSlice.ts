import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ICollection, ICollectionState } from './types';
import { getCollections } from './api/getCollections';

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

    },
})

export default collectionSlice.reducer