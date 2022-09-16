// Components / hooks
import { Route, Routes, Navigate } from "react-router-dom";
import ProfileContent from "../ProfileContent/ProfileContent";
import LoginSignupForm from "../LoginSignupForm/LoginSignupForm";
import Editor from "../Editor/Editor";

const ContentRoutes = (props) => {
  return (
    <Routes>
      <Route path="/login" element={<LoginSignupForm />} />      
      <Route
        path="/profile/:cognitoUsername"
        element={<ProfileContent />}
      />      
      <Route path="/new" element={
        <Editor tags={props.tags} />
      }/>
      <Route path="/edit/:tabId" element={
        <Editor tags={props.tags} />} 
      />
      {/* refactor path to Navigate to /"new" instead of trending */}
      <Route path="*" element={<Navigate to="/new" replace />} />
    </Routes>
  );
}
 
export default ContentRoutes;