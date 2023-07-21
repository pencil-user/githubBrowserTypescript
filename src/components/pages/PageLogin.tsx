
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useQueryParams } from '../../hooks/useQueryParams';
import { useFindUsersQuery } from '../../services/querySlice';

import CircularProgress from '@mui/material/CircularProgress';
import Autocomplete from '@mui/material/Autocomplete';
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

import { useAppDispatch } from '../../hooks/reduxHooks';
import { useAppSelector } from '../../hooks/reduxHooks';

import { logIn, logOut } from '../../services/authSlice';

import { Base64 } from 'js-base64';
import { util } from '../../services/querySlice';

export function PageLogin() {

  const dispatch = useAppDispatch()
  const storedUser = useAppSelector(state => state.auth)
  const history = useHistory()

  const [username, setUsername] = useState('')
  const [token, setToken] = useState('')
  const [pageError, setPageError] = useState<string | null>(null)
  const [isChecking, setIsChecking] = useState(false)

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (username.length > 0 && token.length === 40) {
      setIsChecking(true)

      try {
        const response = await fetch(`https://api.github.com/users/${username}`, {
          method: 'get',
          headers: {
            'authorization':
              'Basic ' + Base64.encode(username + ":" + token)
          }
        })
        dispatch(util.resetApiState());
        dispatch(logIn({ username, token }))
        setIsChecking(false)
        history.push('/')

      }
      catch (error) {
        setPageError('Invalid Token or Username')
        setIsChecking(false)
      }

    } else {
      setPageError('Bad input')
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <Stack spacing={2} alignItems="center">
        <h2>Enter GitHub Credentials</h2>
        {storedUser.username && <div>Current User <b>{storedUser.username}</b></div>}
        {pageError &&
          <div style={{ color: 'red' }}>
            {pageError}
          </div>}
        <TextField
          sx={{ width: { xs: '90%', md: 500 } }}
          id="Username"
          name="Username"
          label="GitHub Username"
          value={username}
          onChange={(e) => { setUsername(e.target.value.trim()); setPageError(null) }}

        />
        <TextField
          sx={{ width: { xs: '90%', md: 500 } }}
          id="Token"
          name="Token"
          label="Classic GitHub Token"
          onChange={(e) => { setToken(e.target.value.trim()); setPageError(null) }}

        />
        {!isChecking ?
          <Button
            color="primary"
            variant="contained"
            disabled={!(username.length > 0 && token.length === 40)}
            type="submit"

          >Store Credentials</Button>
          :
          <Button
            color="primary"
            variant="contained"
            disabled={true}
          >checking...</Button>

        }

        <Button
          color="error"
          variant="contained"
          disabled={!storedUser.username}
          onClick={(e) => {
            dispatch(logOut());
            dispatch(util.resetApiState())
          }}
        >Delete Credentials</Button>
      </Stack>
    </form>
  )

}