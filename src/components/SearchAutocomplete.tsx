import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useQueryParams } from '../hooks/useQueryParams';
import { useFindUsersQuery } from '../services/querySlice';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

import CircularProgress from '@mui/material/CircularProgress';
import Autocomplete from '@mui/material/Autocomplete';
import useDebounce from '../hooks/useDebounce';
import Box from '@mui/material/Box';

export function SearchAutocomplete() {
  const queryParams = useQueryParams()

  const history = useHistory()

  const [searchInputError, setSearchInputError] = useState<string | null>(null)

  const [value, setValue] = useState(queryParams?.q ? queryParams.q : '')

  const debouncedValue = useDebounce(value, 350)

  const { data, isLoading, isError, isFetching } =
    useFindUsersQuery({ user: debouncedValue, page: 1 }, { skip: debouncedValue.length < 3 })

  function directHandler(value: string, reason: string | undefined) {
    history.push(`/user/${value}`)
  }

  function searchHandler(value: string) {
    console.log('SEARCH INPUT', value)

    if (value.length < 3)
      setSearchInputError('At least 3 characters')
    else {
      if (queryParams?.q === value && options[0] === value) {
        directHandler(value, 'any')
      } else {
        history.push(`/search?q=${value}&page=1`)
      }
    }
  }

  function changeHandler(value: string) {
    if (searchInputError) {
      setSearchInputError(null)
    }
    return value
  }

  const options = (!isLoading && !isError && data?.items)
    ? data.items.slice(0, 8).map((item) => item.login) : []

  return (
    <SearchBox
      label={'Search by username'}
      error={searchInputError}
      value={value}
      setValue={setValue}
      options={options}
      searchHandler={searchHandler}
      changeHandler={changeHandler}
      directHandler={directHandler}
      buttonDisabled={value.length < 3}
      isLoading={isFetching || isLoading}
    />
  )
}

function SearchBox(
  {
    label,
    error,
    value,
    setValue,
    options,
    getOptionLabel = undefined,
    searchHandler,
    changeHandler = undefined,
    directHandler,
    buttonDisabled = false,
    fieldDisabled = false,
    isLoading = false,
  }
    :
    {
      label: string,
      error?: string | null,
      value: string,
      setValue: (arg0: string) => void,
      options: any[],
      getOptionLabel?: (arg0: any) => string,
      searchHandler: (arg0: string) => void,
      changeHandler?: (arg0: string) => string,
      directHandler: (value: string, reason: string) => void
      buttonDisabled?: boolean,
      fieldDisabled?: boolean,
      isLoading?: boolean,
    }
) {
  const [reCreate, setReCreate] = useState<number>(() => Math.floor(Math.random() * 10000000))

  const searchButton =
    <IconButton color="primary" aria-label="add an alarm" disabled={buttonDisabled} onClick={(_) => searchHandler(value)}>
      <SearchIcon />
    </IconButton>

  return (
    <Autocomplete
      disablePortal
      freeSolo
      disableClearable
      blurOnSelect
      key={reCreate}

      id="combo-box-demo"
      options={options}
      isOptionEqualToValue={(option) => false}
      getOptionLabel={getOptionLabel || ((option) => option)}
      filterOptions={(x) => x}
      sx={{ width: 300 }}

      value={value}

      onInputChange={(event, newInputValue, reason) => {
        console.log('ONINPUTCHANGE', event, newInputValue, reason)
        if (changeHandler) {
          setValue(changeHandler(newInputValue))
        }
        else {
          setValue(newInputValue)
        }
      }}

      onKeyUp={(event) => {
        console.log('KEYUP MAIN', event.key)
      }}

      onChange={(event, newInputValue, reason, details) => {
        console.log('ONCHANGE', event, reason, details)
        if (reason === 'selectOption' && newInputValue.length >= 3) {
          directHandler(newInputValue, reason)
        }
        setValue(newInputValue);
      }
      }

      renderOption={(props, option, state) => {
        return <li
          {...props}
          onClick={() => directHandler(option, '')}
          onKeyDown={(event) => {
            console.log('KEYPRESS', event.key)
            if (event.key === 'Enter') {
              directHandler(option, '')
            }
          }}
        >
          {option}
        </li>
      }}

      renderInput={(params) => <TextField
        {...params}
        disabled={fieldDisabled}
        error={!!error}
        label={!!error ? error : label}
        onKeyDown={(event) => {
          console.log('KEYUP', event.key)
          if (event.key === 'Enter') {
            searchHandler(value)
            setReCreate(Math.floor(Math.random() * 10000000))
          }
        }}
        value={value}
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <>
              {isLoading ? <CircularProgress color="inherit" size={20} /> : searchButton}
              {params.InputProps.endAdornment}
            </>)
        }}

      />}
    />
  )
}


