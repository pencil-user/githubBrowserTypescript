import { createSlice } from '@reduxjs/toolkit';

export interface userState {
  username: string | null,
  token: string | null
}

let initialState: userState = {
  username: null,
  token: null
}

let storedUser = localStorage.getItem('user')

if (storedUser) {
  initialState = JSON.parse(storedUser)
} else {
  initialState = { username: null, token: null }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    logIn(state, action) {
      state.username = action.payload.username
      state.token = action.payload.token
    },
    logOut: (state) => {
      state.username = null
      state.token = null
    }

  }
})

console.log('REDUCER', authSlice.reducer)

export const { logIn, logOut } = authSlice.actions;