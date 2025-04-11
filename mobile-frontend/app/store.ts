import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../user/userSlice'
import gameReducer from '../games/gameSlice'
// ...

export const store = configureStore({
    reducer: {
        user: userReducer,
        game: gameReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch