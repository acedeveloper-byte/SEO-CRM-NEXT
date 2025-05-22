import axios from "axios";
import { BaseURL, CREATE_ARTICULOS_DATA, CREATE_BLOG_DATA, GET_ARTICULOS_DATA, GET_BLOG_DATA } from "Components/helpers/url_helper";
import { setApiError, setApiSuccess, setsuccessarticulosdata, } from "./reducer";
import Swal from "sweetalert2";

export const SubmitArticulos = (formData: any) => async (dispatch: any) => {
    console.log(formData.articulos_images)
    const form = new FormData();
    form.append("meta_title", formData.meta_title);
    form.append("focus_keywords", formData.focus_keywords);
    form.append("meta_description", formData.meta_description);
    form.append("category", formData.category);
    form.append("articulos_url", formData.articulos_url);
    form.append("articulos_image_tag", formData.articulos_image_tag);
    form.append("title_tag_h1", formData.title_tag_h1);
    form.append("articulos_description", formData.articulos_description);
    form.append("file", formData.articulos_images);
    form.append("site_id", formData.siteId);
    form.append("user_id", formData.user_id);
    console.log(formData)
    const options = {
        method: 'POST',
        url: `${BaseURL}${CREATE_ARTICULOS_DATA}`,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: form
    };

    axios.request(options).then(function (response : any) {
      if (response.baseResponse.status==="OK") {
            dispatch(GetAllArticulos());
        
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
    })
};




export const GetAllArticulos = () => async (dispatch: any) => {

    const options = {
        method: 'GET',
        url: `${BaseURL}${GET_ARTICULOS_DATA}`,

    };

    axios.request(options).then(function (response  : any) {
        console.log(response);
        dispatch(setsuccessarticulosdata(response.response))
    }).catch(function (error) {
        console.error(error);
    });
};
