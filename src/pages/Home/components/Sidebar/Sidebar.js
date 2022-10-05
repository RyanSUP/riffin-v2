// Components / hooks
import CollectionButton from './components/CollectionButton/CollectionButton';
import CreateBassTabButton from './components/CreateBassTabButton/CreateBassTabButton';
import CreateGuitarTabButton from './components/CreateGuitarTabButton/CreateGuitarTabButton'
import Ad from 'components/Ad/Ad';
// MUI
import { Container, Divider, Stack, Box } from '@mui/material'

function Sidebar() {
  return (
    <Container data-testid="Sidebar">
      <Box sx={{maxWidth: "175px"}}>
        <Stack direction="column">
          <CollectionButton />
          <CreateGuitarTabButton />
          <CreateBassTabButton />
        </Stack>
        <Divider variant="middle" sx={{m: 2}}/>
      </Box>
      <Ad />
    </Container>
  )
}

export default Sidebar