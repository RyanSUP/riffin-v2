import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToggledIconButton from "./ToggledIconButton";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenRoundedIcon from "@mui/icons-material/CloseFullscreenRounded";

test("Renders with iconA when startOnA is true", () => {
  render(
    <ToggledIconButton
      iconA={<CloseFullscreenRoundedIcon />}
      iconB={<OpenInFullIcon />}
      startOnA={true}
    />
  );
  expect(screen.getByTestId("CloseFullscreenRoundedIcon")).toBeInTheDocument();
});

test("Renders with iconA when startOnA is undefined", () => {
  render(
    <ToggledIconButton
      iconA={<CloseFullscreenRoundedIcon />}
      iconB={<OpenInFullIcon />}
    />
  );
  expect(screen.getByTestId("CloseFullscreenRoundedIcon")).toBeInTheDocument();
});

test("Renders with iconB when startOnA is false", () => {
  render(
    <ToggledIconButton
      iconA={<CloseFullscreenRoundedIcon />}
      iconB={<OpenInFullIcon />}
      startOnA={false}
    />
  );
  expect(screen.getByTestId("OpenInFullIcon")).toBeInTheDocument();
});

test("switches from iconA to iconB when icon button is clicked", async () => {
  render(
    <ToggledIconButton
      iconA={<CloseFullscreenRoundedIcon />}
      iconB={<OpenInFullIcon />}
      handleClickA={() => null}
      handleClickB={() => null}
    />
  );
  const user = userEvent.setup();
  await user.click(screen.getByTestId("CloseFullscreenRoundedIcon"));
  expect(screen.getByTestId("OpenInFullIcon")).toBeInTheDocument();
});
