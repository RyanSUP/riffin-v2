import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { RiffinEditorDispatch } from '../../RiffinProvider';
import { useState, useContext } from 'react';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    border: '1px solid #88C0D0',
    margin: 0,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#88C0D0',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 23 20"><path fill="${encodeURIComponent(
          '#88C0D0',
        )}" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#E479B3' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#0f1627' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 23 20"><path fill="${encodeURIComponent(
        '#88C0D0',
      )}" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#88C0D0' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export default function CustomizedSwitches() {
  const [previewMode, setPreviewMode] = useState(false);
  const { dispatch } = useContext(RiffinEditorDispatch);
  
  const handleChange = () => {
    const action = {
      type: 'setPreviewMode',
      mode: !previewMode // Negate the value because to represent the value after clicking the button.
    };
    dispatch(action);
    setPreviewMode((prev) => !prev);
  }

  return (
    <FormGroup>
      <FormControlLabel
        control={<MaterialUISwitch onChange={handleChange} sx={{ m: 1, mr: 0 }} />}
        label="Display mode"
      />
    </FormGroup>
  );
}