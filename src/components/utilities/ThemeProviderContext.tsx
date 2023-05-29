import { ReactNode, useMemo, useState, createContext, useContext } from 'react';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles'
import ContrastIcon from '@mui/icons-material/Contrast';
import { IconButton } from '@mui/material';


export const DarkModeContext = createContext<undefined | { isDark: boolean, setIsDark: (arg0: boolean) => void }>(undefined);

export function ThemeProviderContext({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false)

  const theme = useMemo(() => createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light'
    },
  }), [isDark])

  return (
    <DarkModeContext.Provider value={{ isDark, setIsDark }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </DarkModeContext.Provider>

  )
}

export function DarkModeButton() {
  const context = useContext(DarkModeContext)

  function buttonHandler() {
    if (context) {
      context.setIsDark(!context.isDark)
    }
  }

  return (
    <IconButton color="inherit" aria-label="dark mode" onClick={buttonHandler}>
      <ContrastIcon />
    </IconButton>
  )
}