// Components / hooks
import { Route, Routes, Navigate } from "react-router-dom";
import ProfileContent from "../ProfileContent/ProfileContent";
import LoginSignupForm from "../LoginSignupForm/LoginSignupForm";
import Editor from "../Editor/Editor";
import { RiffinEditor } from "../RiffinEditor/RiffinEditor";

const ContentRoutes = (props) => {
  return (
    <Routes>
      <Route path="/login" element={<LoginSignupForm />} />           
      <Route path="/new" element=
        {<Editor tags={props.tags} />}
      />
      <Route
        path="/profile/:cognitoUsername"
        element={<ProfileContent />}
      />
      {/* <Route path="/new/guitar" element={
        <Editor key={"guitar"} numberOfStrings={6} tags={props.tags} />
      }/> */}
      <Route path="/new/guitar" element={
        <RiffinEditor key={"newGuitar"} numberOfStrings={6} tags={props.tags}/>
      }/>
      <Route path="/new/bass" element={
        <RiffinEditor key={"bass"} numberOfStrings={4} tags={props.tags} />
      }/>
      <Route path="/edit/:tabId" element={
        <RiffinEditor key={"editor"} tags={props.tags}/>
      }/>
      <Route path="*" element={<Navigate to="/new" replace />} />
    </Routes>
  );
}
 
export default ContentRoutes;