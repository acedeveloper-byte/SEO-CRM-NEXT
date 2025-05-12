import { BaseURL } from 'Components/helpers/url_helper';
import { userForgetPasswordSuccess, userForgetPasswordError } from "./reducer"

import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import axios from "axios";
import Swal from 'sweetalert2';


export const userForgetPassword = (user: any, router: any, token: string, user_id: string) => async (dispatch: any) => {
    try {
        let response;

        const options = {
            url: `${BaseURL}/auth/v1/reset-password/${token}/${user_id}`,
            method: "POST",
            data: { password: user.password }
        }



        axios.request(options).then(function (response: any) {
            if (response.baseResponse.status === "OK") {
                dispatch(userForgetPasswordSuccess("Password has been changed successfully"));
                Swal.fire({
                    title: 'Success!',
                    text: 'Your password has been changed successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result: any) => {
                    if (result.isConfirmed) {
                        router.push("/auth/login"); // redirect to login on OK
                    }
                });

            }
        }).catch(function (error) {
            console.error(error);
        });

    } catch (forgetError) {
        dispatch(userForgetPasswordError(forgetError))
    }
}