import { useParams,  } from 'react-router-dom';

import { User } from '../User';

export function PageUser() {
    const user = useParams<{user?:string}>()?.user

    if(!user)
      return <div>no user specified</div>

    return <User user={user} />
}