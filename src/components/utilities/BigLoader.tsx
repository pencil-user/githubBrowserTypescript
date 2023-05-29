import { CircularProgress } from "@mui/material";

import { Box } from "@mui/system";

export default function BigLoader() {
  return (
    <Box sx={{ m: 1, position: 'relative' }}>
      <div style={{
        marginTop: '300px',
        marginBottom: '300px'

      }}>
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
  )
}