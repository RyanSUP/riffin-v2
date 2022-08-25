// Components / hooks
import { Route, Routes, Navigate } from "react-router-dom";
import TrendingContent from "../TrendingContent/TrendingContent";
import ProfileContent from "../ProfileContent/ProfileContent";
import Landing from "../LoginSignupForm/LoginSignupForm";
import Editor from "../Editor/Editor";

const ContentRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Landing />} />
      <Route path="/trending" element={<TrendingContent />} />
      <Route
        path="/profile/:cognitoUsername"
        element={<ProfileContent />}
      />
      <Route path="/tablature/:tabId" element={<TrendingContent />} />
      <Route path="/new" element={<Editor />} />
      <Route path="/edit/:tabId" element={<Editor />} />
      <Route path="*" element={<Navigate to="/trending" replace />} />
    </Routes>
  );
}
 
export default ContentRoutes;