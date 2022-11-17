// Components / hooks
import { useEffect, useContext, useState, useMemo } from "react";
import { TagContext } from "containers/TagProvider/TagProvider";
import Card from "components/Card/Card";
import NoTablatureMessage from "./components/NoTablatureMessage";
import NoMatchesMessage from "./components/NoMatchesMessage";
import DemoTab from "utils/DemoTab.json"
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import { useNavigate } from "react-router-dom";

const ProfileContent = () => {
  const { tagsInSearchbar } = useContext(TagContext);
  const demoTablature = useMemo(()=> [DemoTab], []);
  const [tablatureOnPage, setTablatureOnPage] = useState(demoTablature);
  const { user } = useContext(UserContext)

  const navigate = useNavigate()
  useEffect(() => {
    if(user) navigate(`/profile/${user.username}`)
  }, [user, navigate])

  useEffect(() => {
    if(tagsInSearchbar) {
      if(tagsInSearchbar.length === 0) {
        setTablatureOnPage(demoTablature);
      } else {
        // Get all tablature objects whose tags or name match all tags in the searchbar.
        const tablatureWithMatchingTags = demoTablature.filter((tablature) => {
          return tagsInSearchbar.every((tag) => tablature.tags.map((tag) => tag.toLowerCase()).includes(tag.toLowerCase()) || tablature.name.toLowerCase() === tag.toLowerCase());
        });
        setTablatureOnPage(tablatureWithMatchingTags);
      }
    }
  }, [tagsInSearchbar, demoTablature]);

  return (
    <>
      {user ? <></> : 
      <>
        {tablatureOnPage?.map((tab, index) => (
          <Card tabData={tab} key={index} />
        ))}
        {demoTablature.length === 0 &&
          <NoTablatureMessage />
        }
        {(demoTablature.length !== 0 && tablatureOnPage.length === 0 && tagsInSearchbar.length > 0) &&
          <NoMatchesMessage />
        }
      </>
      }
    </>
  );
};

export default ProfileContent;
