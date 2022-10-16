Focus:
- [ ] Write tests for Riffin Editor
- [x] Write documentation for Riffin Editor
- [ ] Create constraints for the editor
  - [x] Max blocks
  - [ ] max note size
- [x] Add padding to Save / Delete buttons
- [x] Clear tags when leaving the editor
- [x] Add guitar tags to the tagbar when entering the editor
- [x] When editing a tab, the tagbar doesn't switch from 'search'. It should say 'add tag'
- [x] Filter users tablature based on tags
- [x] Show loading bar in ProfileContent while the users tablature are loading.
- [x] Create loadState for TablatureProvider
- [x] Always show edit buttons
- [x] style the tagbar
  - [x] Make the x button fill the available width
  - [x] style the x button
  - [x] chips need margin
  - [x] chip color and text color (when typing) need to match
- [x] Refactor searchbar using https://mui.com/material-ui/react-autocomplete/
- [x] Make the card divider look like -- TabName ------------- Button Button --
- [x] Fix ProfileContent loading bug
- [ ] Add support for searching by title
- [x] genreate a list of the users unique tags to display in the tagsuggestion area
- [x] look into autocomplete on the tagbar based on tags the user has previously used
- [x] order users tablature by creation date
- [ ] Load current tablature's tags when mounting the RiffinEditor component

Extra:
- [ ] write a better algorithm for getting matching tags
- [ ] Make footer animation like the waves in this template- https://bootstrapmade.com/demo/Selecao/
- [ ] Hide donate button on smaller screen sizes
- [ ] stop the lottie from playing while it's hidden.
- [x] Update readonly tablature blocks to be the same size as the editor blocks
- [x] Fix alignment of the tablature title / save / delete components
- [x] Remove favoriteTablature stuff from TablatureProvider
- [ ] Implement "repeat" functionality in RiffinEditor
- [x] Replace the "expand" icon on cards
- [ ] Delete confirmation when deleting tablature
- [ ] display an alert when saving tablature
- [ ] display an alert when deleting a tablature
- [ ] Provide undo option in the alert after deleting a tablature
- [ ] Create new mobile design mockup


Research:
- [ ] Mockup fetch requests for testing
- [ ] Mockup context for testing
- [ ] Mockup reducer for testing
- [ ] Testing with MUIs TextAreaAutoSize


Abandoned:
- [ ] Show block options when the block is focused, not just on hover
- [ ] Limit the number of tags a tablature can have
- [ ] limit the number of tags the tagbar can have
- [ ] display a message when a user tries to add too many tags to the tagbar