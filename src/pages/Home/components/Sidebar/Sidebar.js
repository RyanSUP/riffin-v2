// Components / hooks
import TagSuggestions from './components/TagSuggestions/TagSuggestions'
import CollectionButton from './components/CollectionButton/CollectionButton';
import CreateBassTabButton from './components/CreateBassTabButton/CreateBassTabButton';
import CreateGuitarTabButton from './components/CreateGuitarTabButton/CreateGuitarTabButton'
// MUI
import { Container, Divider, Stack, Box } from '@mui/material'

function Sidebar(props) {
  return (
    <Container data-testid="Sidebar">
      <Box sx={{maxWidth: "175px"}}>
        <Stack direction="column">
          <CollectionButton />
          <CreateGuitarTabButton />
          <CreateBassTabButton />
        </Stack>
        <Divider variant="middle" sx={{m: 2}}/>
        <TagSuggestions />
      </Box>
    </Container>
  )
}

export default Sidebar