import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CollectionsIcon from '@mui/icons-material/Collections';

function LinkArea() {
  return (
    <Stack spacing={2} direction="column">
      <Button startIcon={<AddCircleIcon />}>New</Button>        
      <Button startIcon={<TrendingUpIcon />}>Trending</Button>              
      <Button startIcon={<CollectionsIcon />}>Trending</Button>                    
    </Stack>
  )
}

export default LinkArea