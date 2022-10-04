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
    if (tabId && getTabFromUser && getTabFromUser(tabId) === undefined) {
      navigate("/new");
    }
  }, [tabId, getTabFromUser, navigate]);

  return (<>{props.children}</>); 
};

export default ProtectedEditRoute;
