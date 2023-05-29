import { useParams, useHistory } from 'react-router-dom';
import { useGetUserQuery } from '../services/querySlice';
import { useGetUserReposQuery } from '../services/querySlice';
import { useGetUserGistsQuery } from '../services/querySlice';
import BigLoader from './utilities/BigLoader';
import { useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Pagination, TableCell, useMediaQuery, useTheme } from '@mui/material';
import { Stack } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { StrippedTableRow } from './utilities/StrippedTable';
import { StrippedTableCell } from './utilities/StrippedTable';

import BigLoaderOverlay from './utilities/BigLoaderOverlay';

import { SearchAutocomplete } from './SearchAutocomplete';
import { StrippedTable } from './utilities/StrippedTable';


const PER_PAGE = 30

const tableRowSX = { '&:last-child td, &:last-child th': { border: 0 } }

export function User({ user, isOwn = false }: { user: string, isOwn?: boolean }) {

  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down("md"));
  const themeMode = useMediaQuery(theme.palette.mode);

  const [tabPage, setTabPage] = useState("repos");

  const handleTabChange = (event: React.ChangeEvent<unknown>, newValue: string) => {
    setTabPage(newValue);
  };

  const { isLoading, isError, data } = useGetUserQuery(user)

  if (isLoading)
    return <Stack spacing={2}><BigLoader /></Stack>

  if (isError || !data)
    return <>There was an error</>

  return (
    <Stack spacing={2}>
      <Stack direction={downMD ? "column" : "row"} justifyContent="space-between" alignItems={'center'}>
        <h2>{data.login}</h2>
        <SearchAutocomplete />
      </Stack>

      <Stack spacing={4} direction={downMD ? "column" : "row"} alignItems={'center'}>
        <img
          src={data.avatar_url}
          alt="user"
          style={{
            maxWidth: 450,
            maxHeight: 450,

            objectFit: 'contain',
            //height: 'auto',
            borderColor: themeMode ? 'white' : 'black',
            borderStyle: 'solid',
            borderWidth: '3px',
            boxShadow: '0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)'
          }}
        />
        <TableContainer component={Paper} elevation={0}>
          <Table /*sx={{ width: '100%' }}*/ aria-label="simple table">
            <TableBody>
              <TableRow sx={tableRowSX}>
                <TableCell align="left">Type</TableCell><TableCell align="right"><b>{data.type}</b></TableCell>
              </TableRow>
              <TableRow sx={tableRowSX}>
                <TableCell align="left">Username</TableCell><TableCell align="right"><b>{data.login}</b></TableCell>
              </TableRow>
              <TableRow sx={tableRowSX}>
                <TableCell align="left">Real Name</TableCell><TableCell align="right"><b>{data.name}</b></TableCell>
              </TableRow>
              <TableRow sx={tableRowSX}>
                <TableCell align="left">Public Repos</TableCell><TableCell align="right"><b>{data.public_repos}</b></TableCell>
              </TableRow>
              <TableRow sx={tableRowSX}>
                <TableCell align="left">Public Gists</TableCell><TableCell align="right"><b>{data.public_gists}</b></TableCell>
              </TableRow>
              <TableRow sx={tableRowSX}>
                <TableCell align="left">Followers</TableCell><TableCell align="right"><b>{data.followers}</b></TableCell>
              </TableRow>
              <TableRow sx={tableRowSX}>
                <TableCell align="left">Following</TableCell><TableCell align="right"><b>{data.following}</b></TableCell>
              </TableRow>
              {isOwn && <>
                <TableRow sx={tableRowSX}>
                  <TableCell align="left">Total Private Repos</TableCell><TableCell align="right"><b>{data.total_private_repos}</b></TableCell>
                </TableRow>
                <TableRow sx={tableRowSX}>
                  <TableCell align="left">Private Gists</TableCell><TableCell align="right"><b>{data.private_gists}</b></TableCell>
                </TableRow>
              </>
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      {data.bio && <Paper elevation={1} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        {data.bio}
      </Paper>}
      <Tabs
        value={tabPage}
        onChange={handleTabChange}
      >
        <Tab label={`Public Repos (${data.public_repos})`} value="repos" />
        <Tab label={`Public Gists (${data.public_gists})`} value="gists" />

      </Tabs>


      {tabPage === "repos" && data.public_repos > 0 && <UserRepos user={data.login} count={data.public_repos} />}
      {tabPage === "gists" && data.public_gists > 0 && <UserGists user={data.login} count={data.public_gists} />}

    </Stack>
  )
}

function UserRepos({ user, count }: { user: string, count: number }) {

  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down("md"));
  const downSM = useMediaQuery(theme.breakpoints.down("sm"));

  const [page, setPage] = useState(1)

  const { data, isLoading, isError, isFetching } =
    useGetUserReposQuery({ user: user, page: page })

  if (isLoading)
    return <Stack spacing={2}><BigLoader /></Stack>

  if (isError || !data)
    return <>There was an error</>

  function pageHandler(e: React.ChangeEvent<unknown>, page: number) {
    setPage(page)
  }

  const totalPages = Math.ceil(count / PER_PAGE) < 34 ? Math.ceil(count / PER_PAGE) : 34
  const pagination = totalPages > 1 ?
    <Pagination
      count={totalPages}
      shape="rounded"
      page={page}
      onChange={pageHandler}
    />
    :
    <></>

  return (
    <Stack spacing={1} alignItems={'stretch'} alignSelf={'stretch'}>
      {pagination}
      <BigLoaderOverlay isLoading={isFetching}>
        <TableContainer component={Paper} square={downMD}>
          <StrippedTable size="small" aria-label="table employees" >
            <TableHead>
              <TableRow>
                <StrippedTableCell  >id</StrippedTableCell>
                <StrippedTableCell  >Full Name</StrippedTableCell>
                <StrippedTableCell  >Forks</StrippedTableCell>
                {!downMD &&
                  <>
                    <StrippedTableCell  >Watchers Count</StrippedTableCell>
                    <StrippedTableCell >Public</StrippedTableCell>
                  </>
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) =>
                <StrippedTableRow key={item.id}>
                  <StrippedTableCell >
                    {item.id}
                  </StrippedTableCell >
                  <StrippedTableCell >
                    {item.full_name}
                  </StrippedTableCell >
                  <StrippedTableCell >
                    {item.forks}
                  </StrippedTableCell >
                  {!downMD &&
                    <>
                      <StrippedTableCell >
                        {item.watchers_count}
                      </StrippedTableCell >
                      <StrippedTableCell >
                        {item.private ? 'Private' : 'Public'}
                      </StrippedTableCell >
                    </>
                  }
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

function UserGists({ user, count }: { user: string, count: number }) {

  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down("md"));
  const downSM = useMediaQuery(theme.breakpoints.down("sm"));

  const [page, setPage] = useState(1)

  const { data, isLoading, isError, isFetching } =
    useGetUserGistsQuery({ user: user, page: page })

  if (isLoading)
    return <Stack spacing={2}><BigLoader /></Stack>

  if (isError || !data)
    return <>There was an error</>

  function pageHandler(e: React.ChangeEvent<unknown>, page: number) {
    setPage(page)
  }

  const totalPages = Math.ceil(count / PER_PAGE) < 34 ? Math.ceil(count / PER_PAGE) : 34
  const pagination = totalPages > 1 ?
    <Pagination
      count={totalPages}
      shape="rounded"
      page={page}
      onChange={pageHandler}

    />
    :
    <></>

  return (
    <Stack spacing={1}>
      {pagination}
      <BigLoaderOverlay isLoading={isFetching}>
        <TableContainer component={Paper} square={downMD}>
          <StrippedTable size="small" aria-label="table employees">
            <TableHead>
              <TableRow>
                <StrippedTableCell  >id</StrippedTableCell>
                <StrippedTableCell  >description</StrippedTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) =>
                <StrippedTableRow key={item.id}>
                  <StrippedTableCell>
                    {item.id}
                  </StrippedTableCell >
                  <StrippedTableCell>
                    {item.description}
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
