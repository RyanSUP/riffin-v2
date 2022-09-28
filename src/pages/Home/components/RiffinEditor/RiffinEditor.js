import { createContext, useReducer } from "react";

const RiffinEditorDispatch = createContext(null);

function riffinReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

const RiffinEditor = () => {
    // Note: `dispatch` won't change between re-renders
    const [tablature, dispatch] = useReducer(riffinReducer, initialState);

    return (
      <RiffinEditorDispatch.Provider value={tablature}>

      </RiffinEditorDispatch.Provider>
    );
}
 
export default RiffinEditor;