import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { GamesSortBy, ICategory, IGame, IGameState, IPlace } from './types'
import { getPlaces } from './api/getPlaces'
import { getCategories } from './api/getCategories'
import { getFilteredGames } from './api/getFilteredGames'
import { RootState } from '@/app/store'
import { getGame } from './api/getGame'
import { SortOrder } from '@/app/config'

const initialState: IGameState = {
    games: [],
    places: [],
    categories: [],
    loading: false,
    filters: {
        categories: [],
        sort: {
            by: GamesSortBy.CREATED_AT,
            order: SortOrder.ASC,
        }
    }
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        activeCategory: (state, action: PayloadAction<ICategory>) => {

            const category = state.filters.categories.find((category) => category.id === action.payload.id);

            state.filters.categories =
                category
                    ? state.filters.categories.filter((category) => category.id !== action.payload.id)
                    : [...state.filters.categories, action.payload];
        },
        setSort: (state, action: PayloadAction<GamesSortBy>) => {

            const sort = state.filters.sort.by !== action.payload ? SortOrder.ASC : state.filters.sort.order === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;

            state.filters.sort = {
                by: action.payload,
                order: sort,
            }
        },
        clearFilters: (state) => {
            state.filters.categories = [];
            state.filters.sort = {
                by: GamesSortBy.CREATED_AT,
                order: SortOrder.ASC,
            }
        }
    },
    selectors: {
        getGamesById: (state) => (id: string) => {
            return state.games.find((game) => game.id === id);
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
            // GET GAME
            .addCase(getGame.fulfilled, (state, action: PayloadAction<IGame>) => {
                const updatedGame = action.payload;
                const index = state.games.findIndex(game => game.id === updatedGame.id);

                if (index !== -1) {
                    state.games[index] = updatedGame;
                } else {
                    state.games.push(updatedGame);
                }

                state.loading = false;
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

export const getGameById = (id: string) => (state: RootState) =>
    state.game.games.find((game) => game.id === id);

export const { activeCategory, setSort, clearFilters } = gameSlice.actions;
export const { getGamesById } = gameSlice.selectors;

export default gameSlice.reducer