import axios from "axios";
import { BaseURL, CREATE_BLOG_DATA, CREATE_USER, GET_USER_DATA, MAILER_LINK, RESET_USER } from "Components/helpers/url_helper";
import { setsuccessinSideUserdata } from "./reducer";
import Swal from "sweetalert2";


export const SubmitUser = (values: any) => async (dispatch: any) => {
const options = {
        method: 'POST',
        url: `${BaseURL}${CREATE_USER}`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({
            user_name: values.user_name, 
            email: values.email, 
            number: values.number, 
            password: values.password,
            link: MAILER_LINK, 
            site: values.site, 
            role: values.role, 
            firstName: values.firstName, 
            lastName: values.lastName,
        })
    };

    axios.request(options).then(function (response: any) {
        if (response.baseResponse.status === "OK") {

            Swal.fire({
                title: "Good job!",
                text: response.baseResponse.message,
                icon: "success"
            });
        } else {
            Swal.fire({
                title: "Oops!",
                text: response.baseResponse.message,
                icon: "error"
            });

        }
    }).catch(function (error) {
        console.error(error);
    });
};



export const GetAllUser = () => async (dispatch: any) => {

    const options = {
        method: 'GET',
        url: `${BaseURL}${GET_USER_DATA}`,

    };

    axios.request(options).then(function (response: any) {
        console.log(response);
        dispatch(setsuccessinSideUserdata(response.response))
    }).catch(function (error) {
        console.error(error);
    });
};










export const ResetUserPassword = (values: any) => async (dispatch: any) => {
const options = {
        method: 'POST',
        url: `${BaseURL}${RESET_USER}`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({
password : values.password
        })
    };

    axios.request(options).then(function (response: any) {
        if (response.baseResponse.status === "OK") {

            Swal.fire({
                title: "Good job!",
                text: response.baseResponse.message,
                icon: "success"
            });
        } else {
            Swal.fire({
                title: "Oops!",
                text: response.baseResponse.message,
                icon: "error"
            });

        }
    }).catch(function (error) {
        console.error(error);
    });
};
