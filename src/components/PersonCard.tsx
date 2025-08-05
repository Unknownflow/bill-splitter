import { Card, CardContent, TextField, Typography, Button, Box, List, ListItem, ListItemText, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState, type ChangeEvent } from 'react'

function PersonCard() {
  const [name, setName] = useState<string>('')
  const [billAmt, setBillAmt] = useState<number>(1)
  const [billDesc, setBillDesc] = useState<string>('')
  const [bills, setBills] = useState<{ amount: number; desc: string }[]>([])

  const [billDescHelperText, setBillDescHelperText] = useState<string>('')
  const [billAmtHelperText, setBillAmtHelperText] = useState<string>('')

  const [billDescError, setBillDescError] = useState<boolean>(false)
  const [billAmtError, setBillAmtError] = useState<boolean>(false)

  const handleAddBill = () => {
    if (billDesc.length === 0) {
      setBillDescError(true)
      setBillDescHelperText('Please enter a bill description.')
    }

    if (isNaN(billAmt) || billAmt <= 0) {
      setBillAmtError(true)
      setBillAmtHelperText('Please enter a valid number greater or equals to 1.')
    }

    if (!isNaN(billAmt) && billAmt > 0 && billDesc.trim()) {
      setBills([...bills, { amount: billAmt, desc: billDesc.trim() }])
      setBillAmt(1)
      setBillDesc('')
      setBillAmtError(false)
      setBillAmtHelperText('')
    }
  }

  const handleDeleteBill = (indexToDelete: number) => {
    setBills((prevBills) => prevBills.filter((_, index) => index !== indexToDelete))
  }

  const handleBillDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBillDesc(e.target.value)

    if (billDesc.length > 0) {
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
          Person Info
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
