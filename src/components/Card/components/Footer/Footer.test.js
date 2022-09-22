import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

// Write this test once tags are implemented
test("footer renders tags", () => {
  const testTags = ["testTag - A", "testTag - B"];
  render(<Footer tags={testTags} />);
  expect(screen.getByText("testTag - A")).toBeInTheDocument();
  expect(screen.getByText("testTag - B")).toBeInTheDocument();
});

test("card renders preferredUsername", () => {
  render(<Footer tags={[]} preferredUsername={"JarJar_Binks"} />);
  expect(screen.getByText("by JarJar_Binks")).toBeInTheDocument();
});

test.todo("clicking preferredUsername routes to profile content");
