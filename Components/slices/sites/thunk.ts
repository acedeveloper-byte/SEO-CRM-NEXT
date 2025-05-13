import axios from "axios";
import { BaseURL, CREATE_BLOG_DATA, CREATE_SITES, GET_BLOG_DATA, GET_SITES_DATA } from "Components/helpers/url_helper";
import { setsuccesssitesdata } from "./reducer";
import Swal from "sweetalert2"
export const SubmitSites = (values: any) => async (dispatch: any) => {


    const form = new FormData();
    form.append("site_name", values.site_name);
    form.append("site_tfn", values.site_tfn);
    form.append("site_status", values.status);
    form.append("file", values.site_logo);

    const options = {
        method: 'POST',
        url: `${BaseURL}${CREATE_SITES}`,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: form
    };

    axios.request(options).then(function (response: any) {
        if (response.baseResponse.status==="OK") {

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




export const GetAllSites = () => async (dispatch: any) => {

    const options = {
        method: 'GET',
        url: `${BaseURL}${GET_SITES_DATA}`,

    };

    axios.request(options).then(function (response  : any) {
        console.log(response);
        dispatch(setsuccesssitesdata(response.response))
    }).catch(function (error) {
        console.error(error);
    });
};
