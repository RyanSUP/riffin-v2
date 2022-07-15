import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
    console.log(props.user)
    return (

    <> 
        {props.user === null
            ?
                <Navigate to="/login" replace />    
            :
                props.children
        }
    </>

    )
}
 
export default ProtectedRoute;