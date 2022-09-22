import { render, screen } from "@testing-library/react";
import TablatureBlock from "./TablatureBlock";
import { sampleTablatureBlock } from "utils/TestUtils/TestUtils";

test('renders both "inputs" and "dashes" text areas', () => {
  render(<TablatureBlock blockData={sampleTablatureBlock} />);
  expect(screen.getByText(sampleTablatureBlock.inputs)).toBeInTheDocument();
  expect(screen.getByText(sampleTablatureBlock.dashes)).toBeInTheDocument();
});
