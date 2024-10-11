import { baseApi } from '@/quries/BaseQuery'
import { configureStore } from '@reduxjs/toolkit'
import {CustomSonnerLoaderMiddleWare} from './listenerMiddleware'

export const store = configureStore({
  reducer: {
  [baseApi.reducerPath]: baseApi.reducer,


  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(baseApi.middleware,CustomSonnerLoaderMiddleWare),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch