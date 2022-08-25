// Components / hooks
import { useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from "containers/CognitoContextProvider/CognitoContextProvider";

// MUI
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CollectionsIcon from '@mui/icons-material/Collections';

function LinkArea() {
  // latest, trending, collection
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  console.log(user)

  const navToLatest = () => navigate('/trending')
  const navToTrending = () => navigate('/trending')
  const navToCollection = () => {
    user ? navigate(`/profile/${user?.username}`) : navigate('/login')
  }
  const navLinks = [
    {
      "label": "Latest",
      "onClick": navToLatest,
      "icon": (<AddCircleIcon />)
    },
    {
      "label": "Trending",
      "onClick": navToTrending,
      "icon": (<TrendingUpIcon />)
    },
    {
      "label": "Collection",
      "onClick": navToCollection,
      "icon": (<CollectionsIcon />)
    }
  ]

  return (
    <Stack direction="column">
      {/* change latest button */}                         
      {navLinks.map((link)=> {
        return(
          <Button 
            endIcon={ link.icon }
            onClick={ link.onClick }            
          >
            { link.label }
          </Button>       

        )
      })      
      }
    </Stack>
  )
}

export default LinkArea