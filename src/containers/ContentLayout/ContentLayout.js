import { Box, useTheme } from "@mui/material";

const page = {
  width: "100%",
  boxSizing: "border-box",
};

const feed = {
  padding: "5px 20px 30px",
  display: "grid",
  marginTop: "5px",
};

const ContentLayout = (props) => {
  const firstChild = props.children[0];
  const secondChild = props.children[1] || (<></>);
  const theme = useTheme();
  
  const right = {
    minWidth: "260px",
    maxWidth: "260px",
    justifyContent: "flex-end",
    [theme.breakpoints.down('md')]: {
      maxWidth: "100%",
    }
  };

  const rightSidebarStyle = {
    position: "sticky",
    top: '80px',
  };
  return (
    <>    
      <Box sx={page}>
        <Box sx={feed}>
          {firstChild}
        </Box>
      </Box>
      <Box sx={{...right, ...rightSidebarStyle}}>
        {secondChild}
      </Box>
    </>
  );
}
 
export default ContentLayout;