import { render, screen } from "@testing-library/react";
import ExpandableGridItemCard from "./ExpandableGridItemCard";
import { testTab } from "utils/TestUtils/TestTabObject";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

test("grid expands when expand button is clicked", async () => {
  const testUser = {
    username: "testUser",
  };
  const user = userEvent.setup();
  render(<ExpandableGridItemCard tabData={testTab} user={testUser} />, {
    wrapper: BrowserRouter,
  });
  await user.click(screen.getByLabelText("Expand"));
  expect(screen.getByText("test bar A")).toBeInTheDocument();
});
