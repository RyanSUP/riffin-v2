// Components / hooks
import TagSuggestions from './components/TagSuggestions/TagSuggestions'
import CollectionButton from './components/CollectionButton/CollectionButton';
<<<<<<< HEAD
import CreateBassTabButton from './components/CreateButtons/CreateBassTabButton/CreateBassTabButton';
import CreateGuitarTabButton from './components/CreateButtons/CreateGuitarTabButton/CreateGuitarTabButton';
=======
import CreateBassTabButton from './components/CreateBassTabButton/CreateBassTabButton';
import CreateGuitarTabButton from './components/CreateGuitarTabButton/CreateGuitarTabButton';
>>>>>>> main

// MUI
import { Container, Divider, Stack } from '@mui/material'

function Sidebar(props) {
  return (
    <Container data-testid="Sidebar">
      <Stack direction="column" sx={{my: 2}}>
        <CreateBassTabButton />
        <CreateGuitarTabButton />
        <CollectionButton />
      </Stack>
      <Divider variant="middle" sx={{m: 2}}/>
      <TagSuggestions 
        addTag={props.addTag}
      />
    </Container>
  )
}

export default Sidebar