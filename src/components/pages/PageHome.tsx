import { User } from '../User';
import { useAppSelector } from '../../hooks/reduxHooks';
import TextField from '@mui/material/TextField';

export function PageHome() {
    const storedUser = useAppSelector(state => state.auth)
    if (!storedUser.username)
        return <div>no user</div>
    return <User user={storedUser.username} isOwn={true} />
}