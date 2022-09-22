import { render, screen } from "@testing-library/react";
import TooltipIconButton from "./TooltipIconButton";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

test("Renders tooltipIconButton", async () => {
  render(
    <TooltipIconButton
      title="test"
      icon={<OpenInFullIcon />}
      onClick={() => null}
    />
  );
  expect(screen.getByTestId("OpenInFullIcon")).toBeInTheDocument();
  expect(screen.getByLabelText("test")).toBeInTheDocument();
});
