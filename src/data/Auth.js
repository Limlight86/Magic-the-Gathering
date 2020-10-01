import { Auth } from "aws-amplify"

Auth.configure({
  region: process.env.REACT_APP_REGION,
  userPoolId: process.env.REACT_APP_USER_POOL,
  userPoolWebClientId: process.env.REACT_APP_USER_POOL_CLIENT,
})

export default Auth