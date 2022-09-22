import { BrowserRouter } from "react-router-dom";
import Editor from "./Editor";
import renderer from "react-test-renderer";

test("rendersa new tab correctly", () => {
  const tags = [];
  const component = (
    <BrowserRouter>
      <Editor tags={tags} />
    </BrowserRouter>
  );
  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
});
