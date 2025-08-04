import { Container, Typography, Box } from '@mui/material'

function Home() {
  return (
    <Container maxWidth='md'>
      <Box my={4}>
        <Typography variant='h3' component='h1' gutterBottom>
          Welcome to Bill Splitter
        </Typography>

        <Typography variant='body1'>
          Bill Splitter is a simple and efficient tool to help you divide expenses fairly among friends, family, or roommates. Whether you're sharing
          a meal, planning a group trip, or tracking household costs, Bill Splitter makes it easy to calculate who owes what, no more awkward math or
          confusion.
        </Typography>

        <Typography variant='body1'>
          Get started by adding your items, entering the participants, and letting the app do the rest. It's quick, accurate, and hassle-free.
        </Typography>
      </Box>
    </Container>
  )
}

export default Home
