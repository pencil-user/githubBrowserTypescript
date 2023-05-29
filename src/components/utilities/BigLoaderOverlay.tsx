import React, { ReactNode } from "react";

import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

export default function BigLoaderOverlay({ children, isLoading = false }: { children: ReactNode, isLoading: boolean }) {

  if (isLoading)
    return <Box sx={{ position: 'relative' }}>
      <div style={{ opacity: 0.5 }}>
        {children}
      </div>
      <CircularProgress
        size={124}
        sx={{
          opacity: 0.5,
          color: 'green',
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginTop: '-50px',
          marginLeft: '-50px',
        }}
      />
    </Box>

  return <Box sx={{ position: 'relative' }}>{children}</Box>
}