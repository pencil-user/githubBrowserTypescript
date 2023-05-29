import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useQueryParams } from '../../hooks/useQueryParams';
import { useFindUsersQuery } from '../../services/querySlice';

import CircularProgress from '@mui/material/CircularProgress';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from '@mui/system';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Pagination, useTheme } from '@mui/material';
import { Stack } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import { StrippedTableRow } from '../utilities/StrippedTable';
import { StrippedTableCell } from '../utilities/StrippedTable';
import { StrippedTable } from '../utilities/StrippedTable';
import { Button } from '@mui/material'

import BigLoaderOverlay from '../utilities/BigLoaderOverlay';
import BigLoader from '../utilities/BigLoader';

import { SearchAutocomplete } from '../SearchAutocomplete';

const PER_PAGE = 30

export function PageSearch() {
  const queryParams = useQueryParams()

  return (
    <Stack spacing={2}>

      <SearchAutocomplete
      />

      {queryParams?.q && <SearchResults />}
    </Stack>
  )
}

function SearchResults() {

  const queryParams = useQueryParams()

  const history = useHistory()

  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down("md"));
  const downSM = useMediaQuery(theme.breakpoints.down("sm"));

  function pageHandler(e: React.ChangeEvent<unknown>, page: number) {
    history.push(`/search?q=${queryParams.q}&page=${page}`)
  }

  const user = queryParams.q
  const page = +queryParams.page

  const { data, isLoading, isError, isFetching, error } = useFindUsersQuery({ user, page })

  if (isLoading)
    return <BigLoader />

  if (isError || !data)
    return <>There was an error</>

  const totalPages = Math.ceil(data.total_count / PER_PAGE) < 34 ? Math.ceil(data.total_count / PER_PAGE) : 34

  const pagination = totalPages > 1 ?
    <Pagination
      count={totalPages}
      shape="rounded"
      page={page}
      onChange={pageHandler}
    />
    :
    <></>

  if (data.items.length < 1)
    return (<>There are no results</>)

  return (

    <Stack spacing={2}>
      {pagination}
      <BigLoaderOverlay isLoading={isFetching}>
        <TableContainer component={Paper} square={downMD} >
          <StrippedTable aria-label="table employees" >
            <TableHead>
              <TableRow>
                <StrippedTableCell >id</StrippedTableCell>
                <StrippedTableCell >login</StrippedTableCell>
                {!downSM && <StrippedTableCell  >score</StrippedTableCell>}
                <StrippedTableCell sx={{ width: { xs: 60, md: 160 } }} >view</StrippedTableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {data.items.map((item) =>
                <StrippedTableRow key={item.id} >
                  <StrippedTableCell component="th" scope="row">
                    {item.id}
                  </StrippedTableCell >
                  <StrippedTableCell component="th" scope="row" >
                    {item.login}
                  </StrippedTableCell >
                  {!downSM && <StrippedTableCell component="th" scope="row" >
                    {item.score}
                  </StrippedTableCell >}
                  <StrippedTableCell component="th" scope="row" >
                    <Button color="primary"
                      variant="contained"
                      sx={{ py: 0.5, px: 2, mx: 0, my: 0 }}
                      onClick={() => history.push(`/user/${item.login}`)}>
                      {downMD ? 'View' : 'View User'}
                    </Button>
                  </StrippedTableCell >
                </StrippedTableRow>
              )}
            </TableBody>
          </StrippedTable>
        </TableContainer>
      </BigLoaderOverlay>
      {pagination}
    </Stack>
  )
}
