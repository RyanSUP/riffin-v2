// Components
import ToolTipIconButton from "components/TooltipIconButton/ToolTipIconButton";

// MUI
import ShareIcon from "@mui/icons-material/Share";

const ShareIconButton = () => {
  return (
    <ToolTipIconButton 
      icon={<ShareIcon />}
      title={"Share"}
    />
  );
}

export default ShareIconButton;