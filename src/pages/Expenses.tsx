import { Box, Button, Container, Modal, TextField, Typography } from '@mui/material'
import { useCallback, useState, type ChangeEvent } from 'react'
import PersonCard from '../components/PersonCard'
import type { Person, Transfer } from '../types/Person'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}
const maxPeople = 25

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
    if (!numPeople || isNaN(numPeople) || numPeople <= 0 || numPeople > maxPeople) {
      setError(true)
      setHelperText(`Please enter a valid number greater or equals to 1 and less than or equals to ${maxPeople}.`)
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
    const transfersTable = Array.from({ length: people.length }, () => Array(people.length).fill(0))

    // Step 1: Go through all bills
    people.forEach((person) => {
      person.bills.forEach((bill) => {
        const { amount, payers } = bill

        if (!payers || payers.length === 0) return // Skip

        const share = amount / payers.length

        // Subtract share from each payer (they owe)
        payers.forEach((payerId) => {
          if (payerId === person.id) return // Skip if the payer is the one who paid the bill

          if (payerId < person.id) {
            transfersTable[payerId][person.id] += share
          } else {
            transfersTable[person.id][payerId] -= share
          }
        })
      })
    })

    const transfers: Transfer[] = []

    // Round balances and add to transfers
    for (let i = 0; i < transfersTable.length; i++) {
      for (let j = 0; j < transfersTable[i].length; j++) {
        transfersTable[i][j] = Math.round(transfersTable[i][j] * 100) / 100
        if (transfersTable[i][j] > 0) {
          transfers.push({ fromId: i, from: people[i].name, toId: j, to: people[j].name, amount: transfersTable[i][j] })
        } else if (transfersTable[i][j] < 0) {
          transfers.push({ fromId: j, from: people[j].name, toId: i, to: people[i].name, amount: -transfersTable[i][j] })
        }
      }
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
                  min: 1,
                  max: maxPeople
                }
              }
            }}
            sx={{ width: 150 }}
          />
          <Button variant='contained' color='primary' size='medium' onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant='contained' color='primary' size='medium' onClick={handleModalOpen}>
            View transfer
          </Button>

          <Modal open={modalOpen} onClose={handleModalClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
            <Box sx={style}>
              <Box display='flex' flexDirection='row' justifyContent='space-between'>
                <Typography id='modal-modal-title' variant='h6' component='h2'>
                  Transfer Summary
                </Typography>
                <Button variant='outlined' color='secondary' size='small' onClick={handleModalClose} style={{ marginBottom: '16px' }}>
                  X
                </Button>
              </Box>

              {transferDetails.length === 0 ? (
                <Typography>No transfers needed. Everyone paid equally.</Typography>
              ) : (
                transferDetails.map((transfer, index) => (
                  <Typography key={index}>
                    Person {transfer.fromId + 1} {transfer.from && `(${transfer.from})`} → Person {transfer.toId + 1}{' '}
                    {transfer.to && `(${transfer.to})`}: ${transfer.amount.toFixed(2)}
                  </Typography>
                ))
              )}
            </Box>
          </Modal>
        </Box>
      </Box>

      {people.map((person) => (
        <PersonCard key={person.id} person={person} onChange={handlePersonChange} people={people} />
      ))}
    </Container>
  )
}

export default Expenses
