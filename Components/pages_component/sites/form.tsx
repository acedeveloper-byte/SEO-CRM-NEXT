import React, { useEffect } from "react";
import { Button, Col, Form, Row, Card } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { SubmitSites } from "Components/slices/sites/thunk";
import { GetAllUser } from "Components/slices/user/thunk";
// import { SubmitSite } from "Components/slices/site/thunk"; // adjust if using Redux

const form = () => {
    const dispatch: any = useDispatch();
    const { inSideUserdata } = useSelector((state: any) => ({
        inSideUserdata: state.inUser.inSideUserdata,
    }));
    const formik = useFormik({
        initialValues: {
            site_name: "",
            site_tfn: "",
            site_logo: "",
            status: true, // toggle switch for active/inactive
        },
        validationSchema: Yup.object({
            site_name: Yup.string().required("Site name is required."),
            site_tfn: Yup.string().required("Site TFN is required."),
            site_logo: Yup.mixed().required("Please upload a site logo."),
            status: Yup.boolean(),
        }),
        onSubmit: (values) => {
            console.log("Submitting site form:", values);
            dispatch(SubmitSites(values)); // connect to Redux or API here
            formik.resetForm();
            
        },
    });

    useEffect(() => {
        dispatch(GetAllUser())
    }, [])



    return (
        <div className="container-fluid">
            <Col xl={12}>
                <Card className="p-3">
                    <Form onSubmit={formik.handleSubmit} noValidate>
                        <Row className="g-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label htmlFor="site_name">Site Name</Form.Label>
                                    <Form.Control
                                        name="site_name"
                                        id="site_name"
                                        placeholder="Enter Site Name"
                                        type="text"
                                        value={formik.values.site_name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={formik.touched.site_name && !!formik.errors.site_name}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.site_name}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label htmlFor="site_tfn">Site TFN</Form.Label>
                                    <Form.Control
                                        name="site_tfn"
                                        id="site_tfn"
                                        placeholder="Enter Site TFN"
                                        type="text"
                                        value={formik.values.site_tfn}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={formik.touched.site_tfn && !!formik.errors.site_tfn}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.site_tfn}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                          

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label htmlFor="site_logo">Site Logo</Form.Label>
                                    <Form.Control
                                        type="file"
                                        id="site_logo"
                                        name="site_logo"
                                        accept="image/*"
                                        onChange={(e: any) =>
                                            formik.setFieldValue("site_logo", e.currentTarget.files?.[0])
                                        }
                                        onBlur={formik.handleBlur}
                                        isInvalid={formik.touched.site_logo && !!formik.errors.site_logo}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.site_logo}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="mb-1">Site Status</Form.Label>
                                    <div className="">
                                        <Form.Check
                                            type="switch"
                                            id="status"
                                            name="status"
                                            label={formik.values.status ? "Active" : "Inactive"}
                                            checked={formik.values.status}
                                            onChange={(e) => formik.setFieldValue("status", e.target.checked)}
                                        />
                                    </div>
                                </Form.Group>
                            </Col>

                            <Col md={6} className="mt-3">
                                <Button variant="primary" type="submit" className="w-100">
                                    Save Site
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Col>
        </div>
    );
};

export default form;
