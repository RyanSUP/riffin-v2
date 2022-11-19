// Services
import { useSnackbar } from "notistack";
// MUI
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button, IconButton, Tooltip, useMediaQuery, useTheme } from '@mui/material';

/**
 * This button writes the tablature document to the clipboard as a string and displays a snackbar to indicate a succesful copy.
 * @param {Object} props - the tablature to copy
 * @returns 
 */

const CopyToClipboard = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const aboveMediumScreen = useMediaQuery(theme.breakpoints.up("md"));
  
  /**
   * This function grabs all relevant information from the tablature and converts it to a string.
   * @returns {String}
   */
  const stringifyTablature = () => {
    let tabAsString = "";
    tabAsString += "Title: " + props.tabData.name + "\n\n";
    tabAsString += "Tags: " + props.tabData.tags.join(", ") + "\n\n";
    props.tabData.blocks.forEach((block) => {
      if(block.label) {
        tabAsString += block.label + "\n\n";
      }
      tabAsString += [...block.inputs].map((char) => (char === " ") ? "-" : char).join("") + "\n\n";
    });
    return tabAsString;
  }

  /**
   * Click handler for writing to the clipboard.
   */
  const handleClick = () => {
    navigator.clipboard.writeText(stringifyTablature());
    enqueueSnackbar("Copied to clipboard!", { variant: "success" });
  }

  return (

        <>
        {aboveMediumScreen ?
          <Tooltip title="Copy to clipboard">
            <Button onClick={handleClick} startIcon={<ContentCopyIcon />} variant="outlined" size="small">
              Copy
            </Button>
          </Tooltip>
        :
          <IconButton
            disabled={props.disabled}
            onClick={props.onClick}
          >
            <ContentCopyIcon />
          </IconButton>
        }
      </>
  );
}
 
export default CopyToClipboard;