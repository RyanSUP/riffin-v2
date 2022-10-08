import { ListItemButton } from '@mui/material';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
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
]

export default function Legend() {
  return (
    <SimpleBar>
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.default',
          position: 'relative',
          '& ul': { padding: 0 },
        }}
        subheader={<li />}
      >
        {legend.map((section) => (
          <li key={`section-${section}`}>
            <ul>
              <ListSubheader sx={{bgcolor: 'background.default', color: 'primary.main'}}>{`${section.subheader}`}</ListSubheader>
              {section.items.map((item) => (
                <ListItemButton key={`item-${section}-${item}`}>
                    <ListItemText sx={{fontSize: '18px', color: 'tabInput.main'}} primary={`${item.value}`} />
                    <div style={{textAlign: 'right', fontSize: '14px'}}>
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