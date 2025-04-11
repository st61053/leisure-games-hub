import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ICategory, IGame, IGameState, IPlace } from './types'
import { getPlaces } from './api/getPlaces'
import { getCategories } from './api/getCategories'
import { getFilteredGames } from './api/getFilteredGames'

const initialState: IGameState = {
    games: [],
    places: [],
    categories: [],
    loading: false,
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        activeCategory: (state, action: PayloadAction<string>) => {
            const category = state.categories.find((category) => category.id === action.payload);
            if (category) {
                category.attributes.active = !category.attributes.active;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // GET PLACES
            .addCase(getPlaces.fulfilled, (state, action: PayloadAction<IPlace[]>) => {
                state.places = action.payload;
            })
            // GET CATEGORIES
            .addCase(getCategories.fulfilled, (state, action: PayloadAction<ICategory[]>) => {
                state.categories = action.payload.map((category) => ({
                    ...category,
                    attributes: {
                        ...category.attributes,
                        active: false,
                    },
                }));
            })
            // GET FILTERED GAMES
            .addCase(getFilteredGames.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFilteredGames.fulfilled, (state, action: PayloadAction<IGame[]>) => {
                state.games = action.payload;
                state.loading = false;
            })
            .addCase(getFilteredGames.rejected, (state) => {
                state.loading = false;
            })
    },
})

export const { activeCategory } = gameSlice.actions;

export default gameSlice.reducer