// MUI
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const presetTags = [
  "Tasters",
  "Basters",
  "Slick Licks",
  "Rock",
  "Zep",
  "Metal",
  "Slap Bass",
  "Country",
  "Blues",
  "Folk",
  "Pop",
  "Hip Hop",
  "R&B",
  "Metallica",
  "AC/DC",
];

function TagSuggestions(props) {
  return (
    <Stack direction="column">
      {presetTags.map((tag, i) => (
        <Button
          key={i}
          variant="text"
          onClick={() => props.addTag(tag)}
          sx={{ justifyContent: "start", pl: "16px" }}
        >
          {tag}
        </Button>
      ))}
    </Stack>
  );
}

export default TagSuggestions;
