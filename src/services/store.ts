import { configureStore } from '@reduxjs/toolkit';
import { querySlice } from './querySlice';
import { authSlice } from './authSlice';
import { stickySlice } from './stickySlice';

const persistMiddleware = (storeAPI: any) => (next: any) => (action: any) => {
    console.log('dispatching', action)
    if (action?.type === 'auth/logIn') {
        localStorage.setItem('user', JSON.stringify(action.payload))
    }

    if (action?.type === 'auth/logOut') {
        localStorage.removeItem('user');
    }

    let result = next(action)
    return result
}

export const store = configureStore({
    preloadedState: {
        auth: authSlice.getInitialState()
    },
    reducer: {
        [querySlice.reducerPath]: querySlice.reducer,
        'auth': authSlice.reducer,
        'sticky': stickySlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(querySlice.middleware, persistMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch