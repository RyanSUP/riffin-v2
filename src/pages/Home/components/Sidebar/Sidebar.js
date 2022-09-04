// Components / hooks
import TagSuggestions from './components/TagSuggestions/TagSuggestions'
import LatestButton from './components/LatestButton/LatestButton';
import CollectionButton from './components/CollectionButton/CollectionButton';
import TrendingButton from './components/TrendingButton/TrendingButton';

// MUI
import { Container, Divider, Stack } from '@mui/material'

function Sidebar(props) {
  return (
    <Container data-testid="Sidebar">
      <Stack direction="column" sx={{my: 2}}>
        <TrendingButton />
        <LatestButton />
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