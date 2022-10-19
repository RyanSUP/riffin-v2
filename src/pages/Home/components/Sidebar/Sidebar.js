// Components / hooks
import CollectionButton from './components/CollectionButton/CollectionButton';
import CreateBassTabButton from './components/CreateBassTabButton/CreateBassTabButton';
import CreateGuitarTabButton from './components/CreateGuitarTabButton/CreateGuitarTabButton'
import Ad from 'components/Ad/Ad';
// MUI
import { Stack, Box } from '@mui/material'

function Sidebar() {
  return (
  <>
    <Stack direction="column">
      <CollectionButton />
      <CreateGuitarTabButton />
      <CreateBassTabButton />
    </Stack>
    <Box sx={{mt: 3}}>
      <Ad />
    </Box>
  </>
  )
}

export default Sidebar