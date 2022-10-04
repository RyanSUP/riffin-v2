// Components / Hooks
import { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TablatureContext } from "containers/TablatureProvider/TablatureProvider";

const ProtectedEditRoute = (props) => {
  const { tabId } = useParams();
  const { getTabFromUser } = useContext(TablatureContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ProcRoute useEffect triggered");
    if (tabId && getTabFromUser) {
      // if there is a tabId
      if (getTabFromUser(tabId) === undefined) {
        // use the tabId to look for a tab.
        navigate("/new");
      } 
    }
  }, [tabId, getTabFromUser, navigate]);

  return <>{props.children}</>; 
};

export default ProtectedEditRoute;
