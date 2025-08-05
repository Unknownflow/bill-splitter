import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { useState, type ChangeEvent } from 'react'
import PersonCard from '../components/PersonCard'

function Expenses() {
  const [numPeople, setNumPeople] = useState<number>(1)
  const [error, setError] = useState<boolean>(false)
  const [helperText, setHelperText] = useState<string>('')
  const [people, setPeople] = useState<number[]>([])

  const handleSubmit = () => {
    if (!numPeople || isNaN(numPeople) || numPeople <= 0) {
      setError(true)
      setHelperText('Please enter a valid number greater or equals to 1.')
    } else {
      setError(false)
      setHelperText('')
      setPeople(Array.from({ length: numPeople }, (_, i) => i))
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    setNumPeople(value)

    if (value > 0) {
      setError(false)
      setHelperText('')
    }
  }

  return (
    <Container maxWidth='md'>
      <Box my={2}>
        <Typography variant='h3' component='h1' gutterBottom>
          Split expenses
        </Typography>

        <Box display='flex' alignItems='center' justifyContent='center' gap={4}>
          <TextField
            required
            label='Number of People'
            type='number'
            value={numPeople}
            onChange={handleChange}
            error={error}
            helperText={helperText}
            margin='dense'
            size='medium'
            slotProps={{
              input: {
                inputProps: {
                  min: 1
                }
              }
            }}
          />
          <Button variant='contained' color='primary' size='medium' onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>

      {people.map((id) => (
        <PersonCard key={id} />
      ))}
    </Container>
  )
}

export default Expenses
