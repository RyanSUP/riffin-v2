import { CognitoUserPool } from "amazon-cognito-identity-js";
// UserPoolId comes from the general tab in Cognito
// ClientID comes from the App Client Settings in Cognito
const poolData = {
  UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
};

export default new CognitoUserPool(poolData);
