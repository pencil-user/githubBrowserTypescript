import { useAppSelector } from "./reduxHooks";
import { Sticky } from "../services/stickySlice";
import { updateSticky } from "../services/stickySlice";
import { useDispatch } from "react-redux";

export function useSticky(key: keyof Sticky) {
  const value = useAppSelector((state) => state.sticky[key])
  const dispatch = useDispatch()
  const setValue = (myValue: any, comment: string = '') => dispatch(updateSticky({ key, value: myValue, comment }))

  return [value, setValue] as const;
}
