import { useEffect, useContext, useState } from "react";
import { AccountContext } from "./Account";

const Status = () => {
    const [status, setStatus] = useState(false);

    const { getSession, logout } = useContext(AccountContext);

    useEffect(() => {
        getSession()
        .then(session => {
            console.log("Session: ", session);
            setStatus(true);
        })
        .catch(error => {
            console.error("Session error: ", error);
        })
    }, [getSession]);

    return (
        <>
            {status ? (<button onClick={logout}>Logout</button>) : "Please login"}
        </>
    )
};
export default Status;