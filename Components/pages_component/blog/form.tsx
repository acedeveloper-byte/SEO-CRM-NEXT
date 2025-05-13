import React, { useState, useCallback, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
// import { PostCategory } from "Components/slices/category/thunk";
import { Card, Col, Row } from "react-bootstrap";
import { SubmitBlog } from "Components/slices/blog/thunk";
import { GetAllSites } from "Components/slices/sites/thunk";

const ReactForm = () => {
    const dispatch: any = useDispatch();
    const [active, setActive] = useState<boolean>(false);
    const [user, setuser] = useState<any>({})
     const editorRef = useRef<any>();
  const [editor, setEditor] = useState(false);
  const { CKEditor, ClassicEditor }: any = editorRef.current || {};
    const { sitesdata } = useSelector((state: any) => ({
        sitesdata: state.Sites.sitesdata,
    }));
    const formik: any = useFormik({
        enableReinitialize: true,

        initialValues: {
            meta_title: "",
            focus_keywords: "",
            meta_description: "",
            category: "",
            blog_url: "",
            blog_image_tag: "",
            title_tag_h1: "",
            blog_description: "",
            blog_images: "",
            user_id: user.id,
            siteId: ""
        },

        validationSchema: Yup.object({
            meta_title: Yup.string().required("Meta title is required."),
            focus_keywords: Yup.string().required("Focus keywords are required."),
            meta_description: Yup.string().required("Meta description is required."),
            category: Yup.string().required("Category is required."),
            blog_url: Yup.string().required("Blog URL is required."),
            blog_image_tag: Yup.string().required("Blog image tag is required."),
            title_tag_h1: Yup.string().required("Title tag (H1) is required."),
            blog_description: Yup.string().required("Blog description is required."),
            blog_images: Yup.mixed().required("Please upload a blog image."),
            siteId: Yup.mixed().required("Please select Site you wish to add this content."),

        }),

        onSubmit: (values) => {
            dispatch(SubmitBlog(values)); // Replace with actual thunk or API call
            formik.resetForm();

        },
    });
    const handleSetImage = (inputdata: any) => {
        formik.setFieldValue("images", inputdata.target.files[0]);
    };

    useEffect(() => {
        dispatch(GetAllSites())
        let curr_user: any = null;

        if (localStorage.getItem("authUser")) {
            curr_user = JSON.parse(localStorage.getItem("authUser") || "{}");
            setuser(curr_user)
        }
          editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditor(true);
    }, [])

    return (
        <div className="container-fluid">
            <Col xl={12}>
                <Card>
                    <Form
                        id="contactlist-form"
                        autoComplete="off"
                        className="needs-formik p-2"
                        noValidate
                        onSubmit={(e) => {
                            e.preventDefault();
                            formik.handleSubmit();
                            return false;
                        }}
                    >
                        <div className="d-flex flex-column gap-2 m-3">
                            <Form.Group controlId="blog_images">
                                <Form.Label className="form-label">Select Blog Image</Form.Label>
                                <div className="d-flex align-items-center gap-2">
                                    <Button
                                        variant="light"
                                        className="border d-flex align-items-center gap-2"
                                        onClick={() => document.getElementById("hidden-blog-image")?.click()}
                                    >
                                        <i className="ri-image-fill"></i> Upload Image
                                    </Button>
                                    {formik.values.blog_images && typeof formik.values.blog_images === "object" && (
                                        <span className="text-muted">
                                            {formik.values.blog_images.name}
                                        </span>
                                    )}
                                </div>

                                <Form.Control
                                    type="file"
                                    id="hidden-blog-image"
                                    name="blog_images"
                                    className="d-none"
                                    accept="image/png, image/jpeg, image/gif"
                                    onChange={(e: any) => {
                                        formik.setFieldValue("blog_images", e.currentTarget.files?.[0]);
                                    }}
                                    isInvalid={formik.touched.blog_images && !!formik.errors.blog_images}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.blog_images}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <div className="d-flex flex-column gap-3">

                            <Row className="g-3">
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label htmlFor="siteId">Site</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="siteId"
                                            id="siteId"
                                            value={formik.values.siteId}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid={formik.touched.siteId && !!formik.errors.siteId}
                                                   
                                        >
                                                   <option value={""}>{"---Select Site---"}</option>
                                            {sitesdata.map((item: any) => {

                                                return (
                                                    <option value={item._id}>{item.site_name}</option>

                                                )
                                            })}
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.siteId}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label htmlFor="meta_title">Meta Title</Form.Label>
                                        <Form.Control
                                            name="meta_title"
                                            id="meta_title"
                                            placeholder="Enter Meta Title"
                                            type="text"
                                            value={formik.values.meta_title}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid={formik.touched.meta_title && !!formik.errors.meta_title}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.meta_title}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label htmlFor="focus_keywords">Focus Keywords</Form.Label>
                                        <Form.Control
                                            name="focus_keywords"
                                            id="focus_keywords"
                                            placeholder="Enter Focus Keywords"
                                            type="text"
                                            value={formik.values.focus_keywords}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid={formik.touched.focus_keywords && !!formik.errors.focus_keywords}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.focus_keywords}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label htmlFor="meta_description">Meta Description</Form.Label>
                                        <Form.Control
                                            name="meta_description"
                                            id="meta_description"
                                            placeholder="Enter Meta Description"
                                            type="text"
                                            value={formik.values.meta_description}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid={formik.touched.meta_description && !!formik.errors.meta_description}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.meta_description}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label htmlFor="category">Category</Form.Label>
                                        <Form.Control
                                            name="category"
                                            id="category"
                                            placeholder="Enter Category"
                                            type="text"
                                            value={formik.values.category}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid={formik.touched.category && !!formik.errors.category}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.category}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label htmlFor="blog_url">Blog URL</Form.Label>
                                        <Form.Control
                                            name="blog_url"
                                            id="blog_url"
                                            placeholder="Enter Blog URL"
                                            type="url"
                                            value={formik.values.blog_url}
                                            onChange={(e: any) => {
                                                const replacetext = e.target.value.replaceAll(" ", "-")
                                                formik.setFieldValue("blog_url", replacetext)
                                            }}
                                            onBlur={formik.handleBlur}
                                            isInvalid={formik.touched.blog_url && !!formik.errors.blog_url}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.blog_url}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label htmlFor="blog_image_tag">Blog Image Tag</Form.Label>
                                        <Form.Control
                                            name="blog_image_tag"
                                            id="blog_image_tag"
                                            placeholder="Enter Blog Image Tag"
                                            type="text"
                                            value={formik.values.blog_image_tag}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid={formik.touched.blog_image_tag && !!formik.errors.blog_image_tag}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.blog_image_tag}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label htmlFor="title_tag_h1">Title Tag (H1)</Form.Label>
                                        <Form.Control
                                            name="title_tag_h1"
                                            id="title_tag_h1"
                                            placeholder="Enter Title Tag (H1)"
                                            type="text"
                                            value={formik.values.title_tag_h1}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid={formik.touched.title_tag_h1 && !!formik.errors.title_tag_h1}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.title_tag_h1}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>


                            </Row>
                               <Col>
                <div>
                  <Form.Label htmlFor="name" className="form-label">
                    BLog Description
                  </Form.Label>
                  {editor ? (
                    <CKEditor
                      editor={ClassicEditor}
                      data={formik.values.blog_description}
                      onReady={(editor: any) => {
                        // You can store the "editor" and use when it is needed.
                      }}
                      onChange={(event: any, editor: any) => {
                        const data = editor.getData();

                        formik.setFieldValue("blog_description", data);
                      }}
                    />
                  ) : (
                    <p>ckeditor5</p>
                  )}
                  {formik.touched.blog_description &&
                  formik.errors.blog_description ? (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.blog_description}
                    </Form.Control.Feedback>
                  ) : null}
                </div>
              </Col>

                                <Col  className="mt-3" style={{ justifyContent: "center", alignItems: "center", display: "flex", paddingTop: 20 }}>
                                    <Button
                                        variant="secondary"
                                        type="submit"
                                        id="addNewContact"
                                        className="w-100"
                                    >
                                        Save
                                    </Button>
                                </Col>
                        </div>
                    </Form>
                </Card>
            </Col>
        </div>
    );
};

export default ReactForm;