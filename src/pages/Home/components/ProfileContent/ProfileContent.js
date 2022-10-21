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
          let tablatureToDisplay = new Set()

          for (let tag of tagsInSearchbar) {
            if (!searchTagsMap[tag]) {
              searchTagsMap[tag] = true
            }
          }        
          
          usersTablature.forEach((tab) => {
            let name = tab.name
            let tags = tab.tags
            
            for (let tag of tags) {
              if (searchTagsMap[tag]) {
                tablatureToDisplay.add(tag)
              }
            }
          })
          console.log(searchTagsMap, tablatureToDisplay)
      }        
      // Get all tablature objects whose tags or name match all tags in the searchbar.
      const tablatureWithMatchingTags = usersTablature.filter((tablature) => {
        return tagsInSearchbar.every((tag) => tablature.tags.map((tag) => tag.toLowerCase()).includes(tag.toLowerCase()) || tablature.name.toLowerCase() === tag.toLowerCase());
      });
      setTablatureOnPage(tablatureWithMatchingTags);
      
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

// useEffect(() => {
  //   if(user && cognitoUsername && (user.username !== cognitoUsername)) {
  //     navigate(`/profile/${user.username}`);
  //   }
  // }, [cognitoUsername, user, navigate]);

  // useEffect(() => {
  //   if(tagsInSearchbar) {
      
      
  //     if(tagsInSearchbar.length === 0) {        
  //       setTablatureOnPage(usersTablature);
      
  //     } else {
  //       const nameMap = {}
  //       const tagMap = {}
  //       const tablatureToDisplay = []
  //       usersTablature.forEach((tab) => {
  //       const name = tab.name
  //       const tags = tab.tags
  //       let meetsCriteria = true
  //       for (let tag of tags) {
  //         if (!tagMap[tag]) {
  //           tagMap[tag] = true
  //         }
  //       }
  //       for (let tag of tagsInSearchbar) {
  //         if (!tagMap[tag]) {
            
  //         }
  //       }

  //     })
  //     console.log(tagMap)
  //     }
  //   }
  // }, [tagsInSearchbar, usersTablature]);