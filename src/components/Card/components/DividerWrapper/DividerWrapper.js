import { Divider, Box } from "@mui/material";

const leftDividerStyle = {
  alignSelf: 'center',
  mr: 1, 
  width: '5%', 
};

const centerDividerStyle = {
  alignSelf: 'center',
  flexGrow: 1, 
  mx: 1, 
};

const rightDividerStyle = {
  alignSelf: 'center',
  mr: 1, 
  width: '9%', 
};

const flexBetweenContainer = {
  display: 'flex', 
  justifyContent: 'space-between'
};

const horizontalSpacer = {
  mx: 1,
};

/**
 * * Wraps children between MUI Dividers. The first child is left aligned, all remaining children are right aligned and wrapped in a spacer. A resizable Divider sits between the first 2 children.
 * @param {Object} props - The children to wrap between divs
 * @returns The computed layout component
 */

const DividerWrapper = (props) => {
  const [ firstChild, ...rest] = props.children;
  return (
    <Box sx={flexBetweenContainer}>
      <Divider sx={leftDividerStyle}/>
      {firstChild}
      <Divider sx={centerDividerStyle}/>      
      {rest.map(child => (
        <Box sx={horizontalSpacer}>
          {child}
        </Box>
      ))}
      <Divider sx={rightDividerStyle}/>
    </Box>
  );
}
 
export default DividerWrapper;