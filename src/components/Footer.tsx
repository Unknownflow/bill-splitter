import { Box, Link, Typography } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'

function Footer() {
  return (
    <Box
      component='footer'
      sx={{
        py: 2,
        px: 4,
        mt: 'auto',
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        textAlign: 'center'
      }}
    >
      <Typography variant='body2' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        © {new Date().getFullYear()} Bill Splitter. All rights reserved.
        <Link
          href='https://github.com/Unknownflow'
          target='_blank'
          rel='noopener'
          sx={{
            ml: 1,
            display: 'inline-flex',
            alignItems: 'center',
            color: 'inherit'
          }}
        >
          <GitHubIcon fontSize='small' />
        </Link>
      </Typography>
    </Box>
  )
}

export default Footer
