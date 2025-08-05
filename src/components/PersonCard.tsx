import { Box, Button, Card, CardContent, IconButton, List, ListItem, ListItemText, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useEffect, useState, type ChangeEvent } from 'react'
import type { Bill, Person } from '../types/Person'

type Props = {
  person: Person
  onChange: (updatedPerson: Person) => void
}

function PersonCard({ person, onChange }: Props) {
  const [name, setName] = useState<string>(person.name || '')
  const [billAmt, setBillAmt] = useState<number>(1)
  const [billDesc, setBillDesc] = useState<string>('')
  const [bills, setBills] = useState<Bill[]>(person.bills || [])

  const [billDescHelperText, setBillDescHelperText] = useState<string>('')
  const [billAmtHelperText, setBillAmtHelperText] = useState<string>('')

  const [billDescError, setBillDescError] = useState<boolean>(false)
  const [billAmtError, setBillAmtError] = useState<boolean>(false)

  useEffect(() => {
    onChange({
      id: person.id,
      name,
      bills
    })
  }, [bills, name])

  const handleAddBill = () => {
    let valid = true

    if (billDesc.trim().length === 0) {
      setBillDescError(true)
      setBillDescHelperText('Please enter a bill description.')
      valid = false
    }

    if (isNaN(billAmt) || billAmt <= 0) {
      setBillAmtError(true)
      setBillAmtHelperText('Please enter a valid number greater or equals to 1.')
      valid = false
    }

    if (!valid) return

    setBills([...bills, { amount: billAmt, desc: billDesc.trim() }])
    setBillAmt(1)
    setBillDesc('')
    setBillAmtError(false)
    setBillAmtHelperText('')
    setBillDescError(false)
    setBillDescHelperText('')
  }

  const handleDeleteBill = (indexToDelete: number) => {
    setBills((prevBills) => prevBills.filter((_, index) => index !== indexToDelete))
  }

  const handleBillDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBillDesc(e.target.value)
    if (e.target.value.trim().length > 0) {
      setBillDescError(false)
      setBillDescHelperText('')
    }
  }

  const handleBillAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    setBillAmt(value)
    if (value > 0) {
      setBillAmtError(false)
      setBillAmtHelperText('')
    }
  }

  return (
    <Card sx={{ m: 2 }}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Person {person.id + 1}
        </Typography>
        <TextField fullWidth label='Name' value={name} onChange={(e) => setName(e.target.value)} margin='normal' />

        <Typography variant='subtitle1' mt={2}>
          Add Bill Paid
        </Typography>
        <Box display='flex' gap={2} mt={1} flexWrap='wrap'>
          <TextField
            required
            label='Description'
            value={billDesc}
            onChange={handleBillDescriptionChange}
            fullWidth
            sx={{ flex: 1 }}
            error={billDescError}
            helperText={billDescHelperText}
          />
          <TextField
            required
            label='Amount'
            type='number'
            value={billAmt}
            onChange={handleBillAmountChange}
            error={billAmtError}
            helperText={billAmtHelperText}
            slotProps={{
              input: {
                inputProps: {
                  min: 1
                }
              }
            }}
            sx={{ width: 150 }}
          />
          <Button variant='contained' onClick={handleAddBill}>
            Add
          </Button>
        </Box>

        {bills.length > 0 && (
          <List sx={{ mt: 2 }}>
            {bills.map((bill, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton edge='end' aria-label='delete' onClick={() => handleDeleteBill(index)}>
                    <DeleteIcon />
                  </IconButton>
                }
                disableGutters
              >
                <ListItemText primary={`${bill.desc}: $${bill.amount.toFixed(2)}`} />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  )
}

export default PersonCard
