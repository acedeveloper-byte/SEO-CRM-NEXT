import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Card, Col, Row, Form } from "react-bootstrap";
import { SubmitBlog } from "Components/slices/blog/thunk";
import { SubmitUser } from "Components/slices/user/thunk";
import { GetAllSites } from "Components/slices/sites/thunk";
const ROLES = [
  "ADMIN",
  "SEO_EXECUTIVE"
]



const form = () => {
  const dispatch: any = useDispatch();
  const [users, setuser]: any = useState({})

  const { sitesdata } = useSelector((state: any) => ({
    sitesdata: state.Sites.sitesdata,
  }));
  const formik = useFormik({
    initialValues: {
      user_name: "",
      email: "",
      number: "",
      password: "",
      site: "",
      firstName: "",
      lastName: "",
      role: ""
    },
    validationSchema: Yup.object({
      user_name: Yup.string().required("User name is required."),
      email: Yup.string().email("Invalid email").required("Email is required."),
      number: Yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .required("Phone number is required."),
      password: Yup.string().min(6, "Minimum 6 characters").required("Password is required."),
      site: Yup.string().required("Site is required."),
      firstName: Yup.string().required("First name is required."),
      lastName: Yup.string().required("Last name is required."),
    }),
    onSubmit: (values) => {
      dispatch(SubmitUser(values)); // You can change this to your actual submit function
      formik.resetForm();
    },
  });

  useEffect(() => {
    let curr_user: any = null;

    if (localStorage.getItem("authUser")) {
      curr_user = JSON.parse(localStorage.getItem("authUser") || "{}");
      setuser(curr_user)
    }
    dispatch(GetAllSites())
  }, [])

  console.log(formik.values)
  return (
    <div className="container-fluid">
      <Col xl={12}>
        <Card>
          <Form className="p-4" onSubmit={formik.handleSubmit}>
            <Row className="g-3">

              <Col md={6}>
                <Form.Group>
                  <Form.Label htmlFor="firstName">First Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.firstName && !!formik.errors.firstName}
                    placeholder="Enter First Name"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label htmlFor="lastName">Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.lastName && !!formik.errors.lastName}
                    placeholder="Enter Last Name"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label htmlFor="user_name">User Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="user_name"
                    name="user_name"
                    value={formik.values.user_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.user_name && !!formik.errors.user_name}
                    placeholder="Enter Username"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.user_name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label htmlFor="email">Email</Form.Label>
                  <Form.Control
                    type="email"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.email && !!formik.errors.email}
                    placeholder="Enter Email"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label htmlFor="number">Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    id="number"
                    name="number"
                    value={formik.values.number}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.number && !!formik.errors.number}
                    placeholder="Enter Phone Number"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.number}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <Form.Control
                    type="password"
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.password && !!formik.errors.password}
                    placeholder="Enter Password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label htmlFor="site">Site</Form.Label>
                  <Form.Control
                    as="select"
                    id="site"
                    name="site"
                    value={formik.values.site}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.site && !!formik.errors.site}
                  >
                    <option value="">-- Select Site --</option>

                    {sitesdata.map((item: any) => {

                      return (
                        <option value={item._id}>{item.site_name}</option>

                      )
                    })}

                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.site}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              {users.role === "SUPER_ADMIN" &&
                <Col md={6}>
                  <Form.Group>
                    <Form.Label htmlFor="role">ROLE</Form.Label>
                    <Form.Control
                      as="select"
                      id="role"
                      name="role"
                      value={formik.values.role}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.role && !!formik.errors.role}
                    >
                      <option value="">-- Select Role --</option>

                      {ROLES.map((item: any) => {

                        return (
                          <option value={item}>{item}</option>

                        )
                      })}

                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.site}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              }
              {users.role === "ADMIN" &&
                <Col md={6}>
                  <Form.Group>
                    <Form.Label htmlFor="role">ROLE</Form.Label>
                    <Form.Control
                      as="select"
                      id="role"
                      name="role"
                      value={formik.values.role}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.role && !!formik.errors.role}
                    >
                      <option value="">-- Select Role --</option>


                      <option value={"SEO_EXECUTIVE"}>{"SEO_EXECUTIVE"}</option>


                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.site}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              }

              <Col md={12} className="mt-3 text-end">
                <Button type="submit" variant="primary" className="w-100">
                  Save
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
