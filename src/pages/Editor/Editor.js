import { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import * as tablatureServices from "../../services/tablatureServices";
import * as userUtils from "../../utils/userUtils";
import { CircularProgress } from "@mui/material";
import BarController from './components/BarController';

const Editor = () => {
  const [isSaved, setIsSaved] = useState(null); // Is the document already in the database?
  // TODO Rename: isWaitingForResponse
  const [isLoading, setIsLoading] = useState(false); // is the document currently waiting for a response?
  
  const [tablatureDocument, setTablatureDocument] = useState({
    isPublic: false,
    name: "A tasy lick",
    bars: [],
    tags: [],
    isBassTab: false,
  });
   const { user } = useContext(UserContext);
  const { id } = useParams();
  let navigate = useNavigate();
  
  const deleteTablatureFromDatabase = () => {
    const idToken = userUtils.getIdTokenFromUser(user);
    tablatureServices.delete(tablatureDocument._id, idToken).then((res) => {
      console.log(res);
    });
    // TODO Navigate to trending
  };

  const handleSave = () => {
    const updateExistingTablature = (idToken) => {
      setIsLoading(true);
      tablatureServices.update(tablatureDocument, idToken).then((res) => {
        console.log(res);
        setIsLoading(false);
        setTablatureDocument({ ...tablatureDocument });
      });
    }
  
    const saveNewTablature = (idToken) => {
      setIsLoading(true);
      const { _id, ...tablaturePayload } = tablatureDocument;
      tablatureServices
        .create(tablaturePayload, idToken)
        .then((tablatureFromResponse) => {
          setIsLoading(false);
          navigate(`/edit/${tablatureFromResponse._id}`);
        });
    }

    const idToken = userUtils.getIdTokenFromUser(user);
    if (tablatureDocument._id) {
      updateExistingTablature(idToken);
    } else {
      saveNewTablature(idToken);
    }
  };

  const deleteBarFromTablature = (barIndex) => {
    // TODO Find a way for this be done through BarController?
    const newBars = [];
    tablatureDocument.bars.forEach((bar, i) => {
      if (barIndex !== i) {
        newBars.push({ ...bar });
      }
    });

    tablatureDocument.bars = newBars;
    setTablatureDocument({ ...tablatureDocument });
  };

  const addBarToTablature = () => {
    // TODO Find a way for this be done through BarController?
    const mapOfLastColumnIndexes = {
      40: true,
      81: true,
      122: true,
      163: true,
      204: true,
      245: true,
    };

    const initTextAreaWithValue = (character) => {
      let charactersInString = [];
      for (let i = 0; i < 245; i++) {
        if (i in mapOfLastColumnIndexes) {
          charactersInString.push("\n");
        } else {
          charactersInString.push(character);
        }
      }
      return charactersInString.join("");
    };

    const previousBars = [];
    tablatureDocument.bars.forEach((bar) => {
      previousBars.push({ ...bar });
    });

    const newBar = {
      label: `Bar ${tablatureDocument.bars.length + 1}`,
      inputs: initTextAreaWithValue(" "),
      dashes: initTextAreaWithValue("-"),
    };

    tablatureDocument.bars = [...previousBars, newBar];
    setTablatureDocument({ ...tablatureDocument });
  };

  const handleIsBassCheckbox = (event) => {
    const udpatedTablature = {
      ...tablatureDocument,
      isBassTab: !tablatureDocument.isBassTab,
    };
    setTablatureDocument(udpatedTablature);
  };

  const handleIsPublicCheckbox = (event) => {
    const udpatedTablature = {
      ...tablatureDocument,
      isPublic: !tablatureDocument.isPublic,
    };
    setTablatureDocument(udpatedTablature);
  };

  // Check if the document is new
  useEffect(() => {
    tablatureDocument["_id"] ? setIsSaved(true) : setIsSaved(false);
  }, [tablatureDocument]);

  useEffect(() => {
    if (id) {
      tablatureServices.getTablatureById(id).then((res) => {
        if (res["error"]) {
          // TODO Navigate back to where the user came from
          navigate(`/trending`);
        }
        setTablatureDocument(res.tablature);
      });
    }
  }, [id]);

  const handleNameInput = (event) => {
    const udpatedTablature = {
      ...tablatureDocument,
      name: event.target.value,
    };
    setTablatureDocument(udpatedTablature);
  };

  const updateTablatureDocument = () => {
    setTablatureDocument({ ...tablatureDocument });
  }
  
  useEffect(() => {
    if (user) {
      let username = user.username;
      setTablatureDocument((prev) => {
        return { ...prev, owner: username };
      });
    }
  }, [user]);

  return (
    <>
      {isLoading ? ( <CircularProgress /> ) : (
        <>
          <input
            type="text"
            name="name"
            value={tablatureDocument.name}
            onChange={handleNameInput}
            placeholder="A tasty lick"
          />
          <label htmlFor="isBassTab">Bass tab?</label>
          <input
            type="checkbox"
            name="isBassTab"
            value={tablatureDocument.isBassTab}
            onChange={handleIsBassCheckbox}
          />
          <label htmlFor="isPublic">public?</label>
          <input
            type="checkbox"
            name="isPublic"
            value={tablatureDocument.isPublic}
            onChange={handleIsPublicCheckbox}
          />
          <button onClick={addBarToTablature}>Add bar</button>

          <BarController 
            bars={tablatureDocument.bars} 
            updateTablatureDocument={updateTablatureDocument}
            deleteBarFromTablature={deleteBarFromTablature}
          />

          <button onClick={handleSave}>Save Tablature</button>
          {isSaved && (
            <button onClick={deleteTablatureFromDatabase}>
              Delete tablature
            </button>
          )}
        </>
      )}
    </>
  );
}
 
export default Editor;