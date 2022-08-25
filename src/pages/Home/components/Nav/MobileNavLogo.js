// Components
import AdbIcon from "@mui/icons-material/Adb";
import Typography from "@mui/material/Typography";

const MobileNavLogo = () => {
  return (
    <>
      <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        component="a"
        href=""
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        RIFFIN
      </Typography>
    </>
  );
};

export default MobileNavLogo;
