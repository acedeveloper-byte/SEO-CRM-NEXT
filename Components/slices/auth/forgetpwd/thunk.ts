import { userForgetPasswordSuccess, userForgetPasswordError } from "./reducer"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";

import {
    postFakeForgetPwd,
    postJwtForgetPwd,
} from "../../../helpers/fakebackend_helper";
import axios from "axios";

const fireBaseBackend = getFirebaseBackend();

export const userForgetPassword = (user: any, history: any , router : any , token : string) => async (dispatch: any) => {
    try {
        let response;
        
            const  options = {
                url :`http://192.168.1.18:5000/auth/v1/reset-password/${token}`,
                method :"PUT",
                data : {password :user.password }
            }   

  

            axios.request(options).then(function (response :any) {
                 if(response.baseResponse.status === "SUCCESS") {
                    dispatch(userForgetPasswordSuccess("Password has been changed successfully"));
                    router.push("/auth/login")

                  }  
               }).catch(function (error) {
                 console.error(error);
               });

    } catch (forgetError) {
        dispatch(userForgetPasswordError(forgetError))
    }
}