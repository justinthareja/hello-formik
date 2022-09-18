import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form, Field, useField } from "formik";
import * as Yup from "yup";
import "./styles.css";

const handleSubmit = (values, formikBag) => {
  const { setSubmitting } = formikBag;
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
  }, 400);
};

const SignupForm = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(formik) => (
          <Form>
            <div className="section">
              <h2>Welcome</h2>
              <p>Please fill out your detials and press Continue</p>
              <label htmlFor="firstName">
                First Name<span className="required">*</span>
              </label>
              <Field type="text" name="firstName" />

              <label htmlFor="lastName">
                Last Name<span className="required">*</span>
              </label>
              <Field type="text" name="lastName" />

              <label htmlFor="email">
                Email<span className="required">*</span>
              </label>
              <Field type="email" name="email" />

              <label htmlFor="phone">
                Phone (mobile)<span className="required">*</span>
              </label>
              <Field type="number" name="phone" />

              <label htmlFor="reminder">
                <Field type="checkbox" name="reminder"></Field>Send me a
                reminder if I don't register today
              </label>

              <button type="button">Continue</button>
            </div>

            <div className="section">
              <h2>Participant Information</h2>
              <p>
                All the information entered here will be kept private. Please
                fill out as much as you can. Required fields have a red *
              </p>

              <label htmlFor="spiritualName">Spiritual Name</label>
              <Field type="text" name="spiritualName" />

              <div role="group" aria-labelledby="checkbox-group">
                <label>
                  Gender<span className="required">*</span>
                </label>
                <label>
                  <Field type="radio" name="gender" value="male" />
                  Male
                </label>
                <label>
                  <Field type="radio" name="gender" value="female" />
                  Female
                </label>
                <label>
                  <Field type="radio" name="gender" value="other" />
                  Other
                </label>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

function App() {
  return <SignupForm />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
