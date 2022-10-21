// MUI
import { Box, Container, Divider, Tooltip } from "@mui/material";
import HelpIcon from '@mui/icons-material/Help';

const wrapperStyle = { 
  display: 'flex', 
  alignItems: 'center'
};

const tooltipStyle = {
  m: 1
};

/**
 * Providers a header and tooltip for the staff menu.
 * @returns 
 */
const StaffMenuHeader = () => {
  return (
    <Box>
      <Divider>
        <Box sx={wrapperStyle}>
          Staff Menu
          <Tooltip sx={tooltipStyle} title="This menu provides additional options for the selected staff. The currently selected staff is colorized while deslected staff appear grayed out.">
            <HelpIcon />
          </Tooltip>
        </Box>
      </Divider>
    </Box>
  );
}
 
export default StaffMenuHeader;