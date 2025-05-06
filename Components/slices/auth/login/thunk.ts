
import { BaseURL } from 'Components/helpers/url_helper';
import { loginSuccess, logoutUserSuccess, apiError, reset_login_flag } from './reducer';
import axios from "axios";



export const loginUser = (user: any, router : any) => async (dispatch: any) => {

   try {
    let response:any
    var options = {
      method: 'POST',
      url: `${BaseURL}auth/v1/login-user`,
      headers: {'Content-Type': 'application/json', },
      data: {email: user.email, password: user.password}
    };
    
    axios.request(options).then(function (response :any) {
     if(response.token && response.user) {
       localStorage.setItem("authUser", JSON.stringify(response.user));
       localStorage.setItem("token", JSON.stringify(response.token));
       router.push('/dashboard' , undefined,{ shallow:  true}   )
       dispatch(loginSuccess(response.user));
       console.log(response);
      } 
    }).catch(function (error) {
      console.error(error);
    });
   } catch (error) {
     dispatch(apiError(error));
   }
};

 export const logoutUser = () => async (dispatch: any) => {
   try {
     localStorage.removeItem("authUser");

    //  if (process.env.NEXT_PUBLIC_DEFAULTAUTH === "firebase") {
    //    dispatch(logoutUserSuccess(response));
    //  } else {
    //    dispatch(logoutUserSuccess(true));
    //  }

   } catch (error) {
     dispatch(apiError(error));
   }
 };

// export const socialLogin = (data: any, type: any) => async (dispatch: any) => {
//   try {
//     let response;

//     if (process.env.NEXT_PUBLIC_DEFAULTAUTH === "firebase") {
//       const fireBaseBackend = getFirebaseBackend();
//       response = fireBaseBackend.socialLoginUser(data, type);
//     } else {
//       response = postSocialLogin(data);
//     }

//     const socialdata = await response;

//     if (socialdata) {
//       localStorage.setItem("authUser", JSON.stringify(response));
//       dispatch(loginSuccess(response));
//       window.location.pathname = "/"
//     }

//   } catch (error) {
//     dispatch(apiError(error));
//   }
// };

 export const resetLoginFlag = () => async (dispatch: any) => {
   try {
     const response = dispatch(reset_login_flag());
     return response;
   } catch (error) {
     dispatch(apiError(error));
   }
 };