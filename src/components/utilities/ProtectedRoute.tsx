import { useAppSelector } from '../../hooks/reduxHooks';
import { useHistory } from 'react-router-dom';
import { ReactNode } from 'react';

export function ProtectedRoute({ children }: { children: JSX.Element }) {

  const storedUser = useAppSelector(state => state.auth)
  const history = useHistory()

  if (!storedUser.username) {
    history.replace('/login')
    return <>please login</>
  }

  return children
}