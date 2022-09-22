// Components
import TooltipIconButton from "components/TooltipIconButton/TooltipIconButton";

// MUI
import ShareIcon from "@mui/icons-material/Share";

const ShareIconButton = () => {
  return <TooltipIconButton icon={<ShareIcon />} title={"Share"} />;
};

export default ShareIconButton;
