import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import "./Form.css";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showData } from "../../redux/dataSlice";

export const SignUpForm = () => {
  const dispatch = useDispatch();
  const initialValues = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
  };

  // international letters regex
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required")
      .matches(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
        "Invalid First Name"
      ),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required")
      .matches(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
        "Invalid Last Name"
      ),
    userName: Yup.string()
      .max(15, "Username too long")
      .min(3, "Username too short")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  return (
    <div className="login-page">
      <div className="box">
        <h1 className="header">Sign Up</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            axios
              .post("https://jsonplaceholder.typicode.com/users", {
                userName: values.userName,
                email: values.email,
                name: `${values.firstName} ${values.lastName}`,
              })
              .then(() => {
                dispatch(showData());
              });
          }}
          validationSchema={validationSchema}
        >
          {({ errors, touched }) => (
            <Form className="form">
              <div className="form-container">
                <div>
                  <Field
                    className="row-name"
                    id="firstName"
                    name="firstName"
                    placeholder="First name"
                  />

                  <ErrorMessage name="firstName">
                    {(msg) => <div className="formik-error">{msg}</div>}
                  </ErrorMessage>
                </div>

                <div>
                  <Field
                    className="row-name"
                    id="lastName"
                    name="lastName"
                    placeholder="Last name"
                  />
                  <ErrorMessage name="lastName">
                    {(msg) => <div className="formik-error">{msg}</div>}
                  </ErrorMessage>
                </div>
              </div>

              <Field
                className="username"
                id="userName"
                name="userName"
                placeholder="Username"
              />
              <ErrorMessage name="userName">
                {(msg) => <div className="formik-error">{msg}</div>}
              </ErrorMessage>
              <Field
                className="email"
                id="email"
                name="email"
                placeholder="Email"
              />

              <ErrorMessage name="email">
                {(msg) => <div className="formik-error">{msg}</div>}
              </ErrorMessage>

              <button className="btn" type="submit">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
