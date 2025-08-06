import { Box, Button, Container, Modal, TextField, Typography } from '@mui/material'
import { useCallback, useState, type ChangeEvent } from 'react'
import PersonCard from '../components/PersonCard'
import type { Person, Transfer } from '../types/Person'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

function Expenses() {
  const [numPeople, setNumPeople] = useState<number>(1)
  const [error, setError] = useState<boolean>(false)
  const [helperText, setHelperText] = useState<string>('')
  const [people, setPeople] = useState<Person[]>([])
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [transferDetails, setTransferDetails] = useState<Transfer[]>([])

  const handleModalOpen = () => {
    calculateTransfers()
    setModalOpen(true)
  }
  const handleModalClose = () => setModalOpen(false)

  const handleSubmit = () => {
    if (!numPeople || isNaN(numPeople) || numPeople <= 0) {
      setError(true)
      setHelperText('Please enter a valid number greater or equals to 1.')
    } else {
      setError(false)
      setHelperText('')

      // Only add people if needed
      if (people.length < numPeople) {
        const newPeople = [...people]
        const diff = numPeople - people.length
        for (let i = 0; i < diff; i++) {
          newPeople.push({ id: newPeople.length, name: '', bills: [], totalPaid: 0 })
        }
        setPeople(newPeople)
      } else {
        // If we have more people than needed, trim the array
        setPeople((prevPeople) => prevPeople.slice(0, numPeople))
      }
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

  const handlePersonChange = useCallback((updatedPerson: Person) => {
    setPeople((prevPeople) => prevPeople.map((p) => (p.id === updatedPerson.id ? updatedPerson : p)))
  }, [])

  const calculateTransfers = () => {
    const numPeople = people.length
    const totalSpent = people.reduce((sum, p) => sum + p.totalPaid, 0)
    const average = totalSpent / numPeople

    const balances = people.map((p) => ({
      name: p.name,
      id: p.id,
      balance: Math.round((p.totalPaid - average) * 100) / 100
    }))

    const creditors = balances.filter((b) => b.balance > 0).sort((a, b) => b.balance - a.balance)
    const debtors = balances.filter((b) => b.balance < 0).sort((a, b) => a.balance - b.balance)

    const transfers: Transfer[] = []

    let i = 0
    let j = 0

    while (i < debtors.length && j < creditors.length) {
      const debtor = debtors[i]
      const creditor = creditors[j]

      const amount = Math.min(-debtor.balance, creditor.balance)
      transfers.push({
        from: debtor.name,
        fromId: debtor.id,
        to: creditor.name,
        toId: creditor.id,
        amount: Math.round(amount * 100) / 100
      })

      debtor.balance += amount
      creditor.balance -= amount

      if (Math.abs(debtor.balance) < 0.01) i++
      if (Math.abs(creditor.balance) < 0.01) j++
    }

    setTransferDetails(transfers)
  }

  return (
    <Container maxWidth='md'>
      <Box my={2}>
        <Typography variant='h3' component='h1' gutterBottom>
          Split Expenses
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
          <Button variant='contained' color='primary' size='medium' onClick={handleModalOpen}>
            View transfer
          </Button>

          <Modal open={modalOpen} onClose={handleModalClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
            <Box sx={style}>
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                Amount to transfer
              </Typography>
              {transferDetails.length === 0 ? (
                <Typography>No transfers needed. Everyone paid equally.</Typography>
              ) : (
                transferDetails.map((transfer, index) => (
                  <Typography key={index}>
                    Person {transfer.fromId + 1} ({transfer.from}) → Person {transfer.toId + 1} ({transfer.to}): ${transfer.amount.toFixed(2)}
                  </Typography>
                ))
              )}
            </Box>
          </Modal>
        </Box>
      </Box>

      {people.map((person) => (
        <PersonCard key={person.id} person={person} onChange={handlePersonChange} />
      ))}
    </Container>
  )
}

export default Expenses
