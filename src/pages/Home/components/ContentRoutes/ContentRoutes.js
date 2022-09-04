// Components / hooks
import { Route, Routes, Navigate } from "react-router-dom";
import TrendingContent from "../TrendingContent/TrendingContent";
import ProfileContent from "../ProfileContent/ProfileContent";
import LoginSignupForm from "../LoginSignupForm/LoginSignupForm";
import Editor from "../Editor/Editor";

const ContentRoutes = (props) => {
  return (
    <Routes>
      <Route path="/login" element={<LoginSignupForm />} />
      <Route path="/latest" element={<TrendingContent />} />
      <Route path="/trending" element={<TrendingContent />} />
      <Route
        path="/profile/:cognitoUsername"
        element={<ProfileContent />}
      />
      <Route path="/tablature/:tabId" element={<TrendingContent />} />
      <Route path="/new" element={
        <Editor tags={props.tags} setTagBarTitle={props.setTagBarTitle} />
      }/>
      <Route path="/edit/:tabId" element={
        <Editor tags={props.tags} setTagBarTitle={props.setTagBarTitle} />} 
      />
      <Route path="*" element={<Navigate to="/trending" replace />} />
    </Routes>
  );
}
 
export default ContentRoutes;