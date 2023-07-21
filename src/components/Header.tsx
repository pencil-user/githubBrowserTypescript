import { useHistory, useLocation } from 'react-router-dom'

import AppBar from '@mui/material/AppBar';
import { Tabs, Tab, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import reactSmallLight from '../reactSmallLight.svg';
import { DarkModeButton } from './utilities/ThemeProviderContext';

export default function Header() {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down("md"));
  const downSM = useMediaQuery(theme.breakpoints.down("sm"));
  const themeType = useMediaQuery('(prefers-color-scheme: dark)');


  const history = useHistory()
  const location = useLocation()
  return (
    <AppBar
      position={downMD ? "sticky" : "static"}
      style={{
        backdropFilter: 'blur(10px)',
        backgroundColor: themeType ? 'rgba(40,40,200,0.8)' : 'rgba(40,40,40,0.6)'
      }}>
      <Tabs
        indicatorColor="secondary"
        textColor="inherit"

        value={
          location.pathname
        }
      >
        <img
          src={reactSmallLight}
          alt='' width='40px'
          height='40px'
          style={{
            'marginTop': '5px',
            'marginLeft': '5px',
            'marginRight': '5px',
          }}
        />
        <Tab
          value={'/'}
          label='Home'
          component={Link}

          to={'/'}
        />
        <Tab
          value={'/search'}
          label='Search Users'

          component={Link}
          to={'/search'}
        />
        <Tab
          value={'/login'}
          label='Credentials'

          component={Link}
          to={'/login'}
        />
        <DarkModeButton />

      </Tabs>
    </AppBar>

  )

}