// Components / hooks
import { Route, Routes, Navigate } from "react-router-dom";
import ProfileContent from "../ProfileContent/ProfileContent";
import LoginSignupForm from "../LoginSignupForm/LoginSignupForm";
import { RiffinEditor } from "../RiffinEditor/RiffinEditor";

const ContentRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginSignupForm />} />
      <Route
        path="/profile/:cognitoUsername"
        element={<ProfileContent />}
      />
      <Route path="/new/guitar" element={
        <RiffinEditor key={"newGuitar"} numberOfStrings={6} />
      }/>
      <Route path="/new/bass" element={
        <RiffinEditor key={"bass"} numberOfStrings={4}  />
      }/>
      <Route path="/edit/:tabId" element={
        <RiffinEditor key={"editor"} />
      }/>
      <Route path="*" element={<Navigate to="/new/guitar" replace />} />
    </Routes>
  );
}
 
export default ContentRoutes;