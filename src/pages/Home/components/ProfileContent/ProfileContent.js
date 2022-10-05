// Components / hooks
import { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import { TablatureContext } from "containers/TablatureProvider/TablatureProvider";
import { TagContext } from "containers/TagProvider/TagProvider";
import CardGrid from "components/CardGrid/CardGrid";
import LoadingPlaceholder from "containers/LoadingPlaceholder/LoadingPlaceholder";

const ProfileContent = () => {
  const { cognitoUsername } = useParams();
  const { tagsInSearchbar } = useContext(TagContext);
  const { user } = useContext(UserContext);
  const { usersTablature, tablatureIsLoading } = useContext(TablatureContext);
  const [tablatureOnPage, setTablatureOnPage] = useState(null);
  const navigate = useNavigate();

  // TODO Handle nav for non users
  useEffect(() => {
    if(user && cognitoUsername && (user.username !== cognitoUsername)) {
      navigate(`/profile/${user.username}`);
    }
  }, [cognitoUsername, user, navigate]);

  useEffect(() => {
    if(tablatureIsLoading === false && tablatureOnPage === null) {
      setTablatureOnPage(usersTablature);
    }
  }, [tablatureOnPage, usersTablature, tablatureIsLoading]);

  useEffect(() => {
    if(tagsInSearchbar) {
      if(tagsInSearchbar.length === 0) {
        setTablatureOnPage(usersTablature);
      } else {
        const tablatureWithMatchingTags = usersTablature.filter((tablature) => {
          return tagsInSearchbar.every((tag) => tablature.tags.includes(tag));
        });
        setTablatureOnPage(tablatureWithMatchingTags);
      }
    }
  }, [tagsInSearchbar, usersTablature]);

  return (
    <LoadingPlaceholder isLoading={tablatureOnPage === null}>
      <CardGrid 
        tablature={tablatureOnPage}
      />
    </LoadingPlaceholder>
  );
};

export default ProfileContent;
