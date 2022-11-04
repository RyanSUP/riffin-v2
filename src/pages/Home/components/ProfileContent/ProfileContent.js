// Components / hooks
import { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import { TablatureContext } from "containers/TablatureProvider/TablatureProvider";
import { TagContext } from "containers/TagProvider/TagProvider";
import LoadingPlaceholder from "containers/LoadingPlaceholder/LoadingPlaceholder";
import Card from "components/Card/Card";
import { Sd } from "@mui/icons-material";

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
          const searchTagsMap = {}
          let tablatureToDisplay = []
          for (let tag of tagsInSearchbar) {
            if (!searchTagsMap[tag]) {
              searchTagsMap[tag] = true
            }
          }        
          
          // Goal: Make sure this tablature's tags match all tags the searchbar
          usersTablature.forEach((tab) => {
            let tags = tab.tags
            let counter = 0;

            for (let tag of tags) {
              if (searchTagsMap[tag]) {
                counter++
              }
            }

            // counter matches number of tabs
            if(counter === tagsInSearchbar.length) {            
              tablatureToDisplay.push(tab)
            }
          })          
          setTablatureOnPage(tablatureToDisplay);
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

