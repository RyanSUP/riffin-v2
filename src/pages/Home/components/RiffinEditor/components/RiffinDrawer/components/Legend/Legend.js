// Utilities
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
// MUI
import { ListItemButton } from '@mui/material';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

/**
 * This object is used to build the legend List.
 */
const legend = [
  {
    subheader: 'Special inputs',
    items: [
      {
        label: "duplicate chord",
        value: "]"
      },
      {
        label: "delete chord",
        value: "["
      },
    ]
  },
  {
    subheader: 'Notation',
    items: [
      {
        label: "vibrato",
        value: "~"
      },
      {
        label: "slide",
        value: "/"
      },
      {
        label: "bend",
        value: "^"
      },
      {
        label: "mute",
        value: "x"
      },
      {
        label: "pull off",
        value: "p"
      },
      {
        label: "hammer on",
        value: "h"
      },
      {
        label: "staff line",
        value: "|"
      },
    ]
  },
];

const listStyles = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.default',
  position: 'relative',
  '& ul': { padding: 0 },
};

const subHeaderStyles = {
  bgcolor: 'background.default', 
  color: 'primary.main'
};

const listItemValueStyles = {
  fontSize: '18px', 
  color: 'tabInput.main'
};

const listItemLabelStyles = {
  textAlign: 'right',
  fontSize: '14px'
};

/**
 * * The legend displays inputs and tablature notation to the user in the form of buttons. The buttons will eventually have functionality to edit the selected block when clicked. The SimpleBar package is used to scroll through the legend once a set size is decided on. Currently the legend's full height is displayed.
 * @returns 
 */
export default function Legend() {
  return (
    <SimpleBar>
      <List
        sx={listStyles}
        subheader={<li />}
      >
        {legend.map((section) => (
          <li key={`section-${section.subheader}`}>
            <ul>
              <ListSubheader sx={subHeaderStyles}>{`${section.subheader}`}</ListSubheader>
              {section.items.map((item, i) => (
                <ListItemButton key={`item-${section.subheader}-${item.value}`}>
                  <ListItemText sx={listItemValueStyles} primary={`${item.value}`} />
                  <div style={listItemLabelStyles}>
                    <ListItemText primary={`${item.label}`} />
                  </div>
                </ListItemButton>
              ))}
            </ul>
          </li>
        ))}
      </List>
    </SimpleBar>
  );
}