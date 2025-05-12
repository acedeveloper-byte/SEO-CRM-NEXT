import axios from "axios";
import { BaseURL, CREATE_BLOG_DATA, GET_BLOG_DATA } from "Components/helpers/url_helper";
import { setApiError, setApiSuccess, setsuccessblogdata } from "./reducer";
import Swal from "sweetalert2";

export const SubmitBlog = (formData: any) => async (dispatch: any) => {
    console.log(formData.blog_images)
    const form = new FormData();
    form.append("meta_title", formData.meta_title);
    form.append("focus_keywords", formData.focus_keywords);
    form.append("meta_description", formData.meta_description);
    form.append("category", formData.category);
    form.append("blog_url", formData.blog_url);
    form.append("blog_image_tag", formData.image_tag);
    form.append("title_tag_h1", formData.title_tag_h1);
    form.append("blog_description", formData.blog_description);
    form.append("file", formData.blog_images);
    form.append("site_id", formData.siteId);
    form.append("user_id", formData.user_id);
        
    const options = {
        method: 'POST',
        url: `${BaseURL}${CREATE_BLOG_DATA}`,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: form
    };

    axios.request(options).then(function (response : any) {
      if (response.baseResponse.status==="OK") {
            dispatch(GetAllBlogs());
        
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




export const GetAllBlogs = () => async (dispatch: any) => {

    const options = {
        method: 'GET',
        url: `${BaseURL}${GET_BLOG_DATA}`,

    };

    axios.request(options).then(function (response  : any) {
        console.log(response);
        dispatch(setsuccessblogdata(response.response))
    }).catch(function (error) {
        console.error(error);
    });
};
