import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import "./styles.css";

const validationSchema = Yup.object({
  firstName: Yup.string()
    .max(15, "must be 15 characters or less")
    .required("required"),
  lastName: Yup.string()
    .max(20, "must be 20 chars or less")
    .required("required"),
  email: Yup.string().email("invalid email address").required("required"),
  yogiType: Yup.string()
    .oneOf(["karma", "bhakti", "jnana", "raja"], "invalid job type")
    .required("required"),
  hasAcceptedTerms: Yup.boolean()
    .oneOf([true], "you must accept the terms and conditions")
    .required("required"),
});

const handleSubmit = (values, formikBag) => {
  const { setSubmitting } = formikBag;
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
  }, 400);
};

const initialValues = {
  email: "",
  firstName: "",
  lastName: "",
  yogiType: "",
  hasAcceptedTerms: false,
};

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const Select = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const Checkbox = ({ children, ...props }) => {
  // React treats radios and checkbox inputs differently other input types, select, and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const SignupForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form>
          <TextInput label="First Name" name="firstName" type="text" />
          <TextInput label="Last Name" name="lastName" type="text" />
          <TextInput label="Email" name="email" type="email" />

          <Select label="Choose your path" name="yogiType">
            <option value="" disabled>
              Select...
            </option>
            <option value="karma">Karma</option>
            <option value="bhakti">Bhakti</option>
            <option value="jnana">Jnana</option>
            <option value="raja">Raja</option>
          </Select>

          <Checkbox name="hasAcceptedTerms">
            I accept the Terms and Conditions
          </Checkbox>
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </Form>
      )}
    </Formik>
  );
};

function App() {
  return <SignupForm />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
