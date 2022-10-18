// Components / hooks
import { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import { TablatureContext } from "containers/TablatureProvider/TablatureProvider";
import { TagContext } from "containers/TagProvider/TagProvider";
import LoadingPlaceholder from "containers/LoadingPlaceholder/LoadingPlaceholder";
import Card from "components/Card/Card";

const ProfileContent = () => {
  const { cognitoUsername } = useParams();
  const { tagsInSearchbar } = useContext(TagContext);
  const { user, userIsLoading } = useContext(UserContext);
  const { usersTablature, tablatureIsLoading } = useContext(TablatureContext);
  const [tablatureOnPage, setTablatureOnPage] = useState(usersTablature);
  const navigate = useNavigate();

  // TODO Handle nav for non users
  useEffect(() => {
    if(user && cognitoUsername && (user.username !== cognitoUsername)) {
      navigate(`/profile/${user.username}`);
    }
  }, [cognitoUsername, user, navigate]);

  useEffect(() => {
    if(tagsInSearchbar) {
      if(tagsInSearchbar.length === 0) {
        setTablatureOnPage(usersTablature);
      } else {
        // Get all tablature objects whose tags or name match all tags in the searchbar.
        const tablatureWithMatchingTags = usersTablature.filter((tablature) => {
          return tagsInSearchbar.every((tag) => tablature.tags.map((tag) => tag.toLowerCase()).includes(tag.toLowerCase()) || tablature.name.toLowerCase() === tag.toLowerCase());
        });
        setTablatureOnPage(tablatureWithMatchingTags);
      }
    }
  }, [tagsInSearchbar, usersTablature]);

  return (
    <LoadingPlaceholder isLoading={userIsLoading && tablatureIsLoading}>
      {tablatureOnPage?.map((tab, index) => (
        <Card tabData={tab} key={index} />
      ))}
    </LoadingPlaceholder>
  );
};

export default ProfileContent;
