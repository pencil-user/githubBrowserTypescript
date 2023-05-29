import { createSlice } from '@reduxjs/toolkit';

export interface Sticky {
  search: string
}

let initialState: Sticky = {
  search: ''
}

export const stickySlice = createSlice({
  name: 'sticky',
  initialState: initialState,
  reducers: {
    updateSticky(state, action: { payload: { key: keyof Sticky, value: any, comment?: string } }) {
      state[action.payload.key] = action.payload.value
    },
  }
})

export const { updateSticky } = stickySlice.actions;