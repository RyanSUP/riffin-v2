import { Divider, Box } from "@mui/material";

const leftDividerStyle = {
  alignSelf: 'center',
  width: '5%', 
};

const centerDividerStyle = {
  alignSelf: 'center',
  flexGrow: 1, 
};

const rightDividerStyle = {
  alignSelf: 'center',
  width: '5%', 
};

const flexBetweenContainer = {
  display: 'flex', 
  justifyContent: 'space-between'
};

const horizontalSpacer = {
  mx: 1,
  alignSelf: 'center',
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
      <Box sx={horizontalSpacer}>
        {firstChild}
      </Box>
      <Divider sx={centerDividerStyle}/>
      {rest.map((child,i) => (
        <Box sx={horizontalSpacer} key={i}>
          {child}
        </Box>
      ))}
      <Divider sx={rightDividerStyle}/>
    </Box>
  );
}
 
export default DividerWrapper;