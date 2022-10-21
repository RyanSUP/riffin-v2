// Components / hooks
import CollectionButton from '../CollectionButton/CollectionButton';
import CreateBassTabButton from '../CreateBassTabButton/CreateBassTabButton';
import CreateGuitarTabButton from '../CreateGuitarTabButton/CreateGuitarTabButton'
import { useTheme } from '@mui/material/styles';
// MUI
import { Stack } from '@mui/material'

const NavStack = () => {

  return (
    <Stack direction="column" sx={{backgroundColor: "background.default"}}>
      <CollectionButton />
      <CreateGuitarTabButton />
      <CreateBassTabButton />
    </Stack>
  );
}
 
export default NavStack;