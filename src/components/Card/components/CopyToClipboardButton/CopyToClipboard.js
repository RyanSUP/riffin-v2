// MUI
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button, Tooltip } from '@mui/material';

/**
 * This button writes the tablature document to the clipboard as a string.
 * @param {Object} props - the tablature to copy
 * @returns 
 */

const CopyToClipboard = (props) => {

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
  }

  return (
    <Tooltip title="Copy to clipboard">
      <Button onClick={handleClick} startIcon={<ContentCopyIcon />} variant="outlined" size="small">
        Copy
      </Button>
    </Tooltip>
  );
}
 
export default CopyToClipboard;