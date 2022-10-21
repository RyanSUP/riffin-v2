// Components / hooks
import Ad from 'components/Ad/Ad';
// MUI
import { Box } from '@mui/material'
import NavStack from './components/NavStack/NavStack';

function Sidebar() {
  return (
  <>
    <NavStack />
    <Box sx={{mt: 3}}>
      <Ad />
    </Box>
  </>
  )
}

export default Sidebar