import { createSlice } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import { useSelector, useDispatch } from 'react-redux';
import { Interface } from 'readline';
import { isBooleanObject } from 'util/types';

export interface Sticky {
  search: string
}

let initialState: Sticky = {
  search: ''
}
/*
function createSticky<T>(initial: T) {
  const stickySlice = createSlice({
    name: 'sticky',
    initialState: initial,
    reducers: {
      updateSticky(state, action: { payload: { key: keyof T, value: any, comment?: string } }) {
        state[action.payload.key as keyof (typeof state)] = action.payload.value
      },
    }
  })

  function useSticky(key: keyof T) {
    const value = useSelector((state) => (state as any).sticky[key])
    const dispatch = useDispatch()
    const setValue = (myValue: any, comment: string = '') => dispatch(stickySlice.actions.updateSticky({ key, value: myValue, comment }))

    return [value, setValue] as const;
  }

  return { stickySlice, useSticky }
}
*/


function createFoo<T extends object>(initial: T) {

 const stuff= Object.fromEntries( Object.keys(initial).map((myKey)=>['update'+myKey, 'foo'] ) )

  const stickyFoo = createSlice({
    name: 'sticky',
    initialState: initial,
    reducers: {
      updateSticky(state, action: { payload: { key: keyof T, value: any, comment?: string } }) {
        state[action.payload.key as keyof (typeof state)] = action.payload.value
      },
    }
  })

}


//export const { updateSticky } = stickySlice.actions; 