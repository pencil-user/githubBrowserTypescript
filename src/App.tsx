import React, { useState } from 'react';
import { store } from './services/store';
import { Provider } from 'react-redux'
import { User } from './components/User';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import Header from './components/Header';
import { Footer } from './components/Footer';

import { PageSearch } from './components/pages/PageSearch';
import { PageUser } from './components/pages/PageUser';
import { PageLogin } from './components/pages/PageLogin';
import { PageHome } from './components/pages/PageHome';

import { ProtectedRoute } from './components/utilities/ProtectedRoute';

//MUI
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import useMediaQuery from '@mui/material/useMediaQuery';
import { PageExperimental } from './components/pages/PageExperimental';
import { ThemeProviderContext } from './components/utilities/ThemeProviderContext';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  return (
    <Provider store={store}>
      <ThemeProviderContext>
        <CssBaseline />
        <Router>
          <MainLayout />
        </Router>
      </ThemeProviderContext >
    </Provider>

  );
};

function MainLayout() {
  const downMD = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Header />
      <Container maxWidth='lg' sx={{ p: { xs: 0, md: 3 } }}>
        <Paper elevation={downMD ? 0 : 4} square={downMD}
          sx={{
            my: { xs: 0, md: 3 },
            mx: { xs: 0, md: 3 },
            px: { xs: 0, md: 4 },
            py: { xs: 1, md: 3 }
          }}

        >

          <MainSwitch />
        </Paper>
        <Footer />
      </Container>
    </>

  )
}

function MainSwitch() {
  return (
    <Switch>
      <Route path='/search'>
        <ProtectedRoute>
          <PageSearch />
        </ProtectedRoute>
      </Route>
      <Route path='/experimental'>
        <PageExperimental />
      </Route>
      <Route path='/user/:user'>
        <ProtectedRoute>
          <PageUser />
        </ProtectedRoute>
      </Route>
      <Route path='/login'>
        <PageLogin />
      </Route>
      <Route path='/'>
        <ProtectedRoute>
          <PageHome />
        </ProtectedRoute>
      </Route >
    </Switch >
  )
}



export default App;
