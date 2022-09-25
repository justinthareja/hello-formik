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

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const days = [...Array(31).keys()].map((i) => i + 1);

const firstYear = 1922;
const lastYear = 2032;
let years = [];

for (let i = lastYear; i >= firstYear; i--) {
  years.push(i);
}

const AccordionContext = React.createContext();
const useAccordion = function () {
  return React.useContext(AccordionContext);
};

const Accordion = ({ children }) => {
  const [items, setItems] = React.useState([]);

  const toggleOpen = React.useCallback(
    // how can you do this without passing an explicit key prop?
    (key) => {
      const newItems = [];
      const keyedItemIndex = items.findIndex((item) => item.id === key);
      if (keyedItemIndex < 0) {
        console.error(`Cannot find <AccordionItem> with id=${key}`);
      }

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (i === keyedItemIndex) {
          newItems.push({ ...item, isOpen: !item.isOpen });
        } else {
          newItems.push(items[i]);
        }
      }

      setItems(newItems);
    },
    [items]
  );

  React.useEffect(() => {
    const newItems = [];
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const hasDuplicateKeys = newItems.find(
        (newItem) => newItem.id === child.props.id
      );

      if (hasDuplicateKeys) {
        console.error(
          "<Accordion> cannot have children with duplicate props.id"
        );
      }

      newItems.push({ id: child.props.id, isOpen: true });
    }

    setItems(newItems);
  }, [children]);

  return (
    <AccordionContext.Provider value={{ toggleOpen, items }}>
      {children}
    </AccordionContext.Provider>
  );
};

const AccordionItem = ({ children, ...props }) => {
  const { id } = props;
  const { items } = useAccordion();
  const thisItem = items.find((item) => item.id === id) || {};

  let childrenToBeRendered = [...children].map((child) => ({
    ...child,
    props: { ...props, ...child.props },
  }));
  if (thisItem.isOpen === false) {
    childrenToBeRendered = childrenToBeRendered.filter((childToBeRendered) => {
      return childToBeRendered.type.name === "AccordionItemHeader";
    });
  }

  return (
    <div className="accordion-item">
      <div className="container">{childrenToBeRendered}</div>{" "}
    </div>
  );
};

const AccordionItemHeader = ({ children, id }) => {
  const { toggleOpen } = useAccordion();

  return (
    <div className="accordion-item-header" onClick={(e) => toggleOpen(id)}>
      {children}
    </div>
  );
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
            <Accordion>
              <AccordionItem id="someUniqueKey">
                <AccordionItemHeader>
                  <h4>1. Welcome</h4>
                </AccordionItemHeader>
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
              </AccordionItem>
              <AccordionItem id="someUniqueKey2">
                <AccordionItemHeader>
                  <h4>2. Participant Information</h4>
                </AccordionItemHeader>
                <p>
                  All the information entered here will be kept private. Please
                  fill out as much as you can. Required fields have a red *
                </p>

                <label htmlFor="spiritualName">
                  Spiritual Name
                  <Field type="text" name="spiritualName" />
                </label>

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

                <label>
                  Birthdate<span className="required">*</span>
                  <Field as="select" name="birthMonth">
                    {months.map((month) => (
                      <option value={month.toLowerCase()}>{month}</option>
                    ))}
                  </Field>
                  <Field as="select" name="birthDay">
                    {days.map((day) => (
                      <option value={day}>{day}</option>
                    ))}
                  </Field>
                  <Field as="select" name="birthYear">
                    {years.map((year) => (
                      <option value={year}>{year}</option>
                    ))}
                  </Field>
                </label>

                <label>
                  Birth Time
                  <Field type="text" name="birthTime"></Field>
                </label>

                <label>
                  Birth Location
                  <Field type="text" name="birthLocation"></Field>
                </label>

                <label>
                  Marital Status
                  <Field type="text" name="maritalStatus"></Field>
                </label>

                <label>
                  Languages Spoken
                  <Field type="text" name="languagesSpoken"></Field>
                </label>
                <button type="button">Continue</button>
              </AccordionItem>
              <AccordionItem id="someUniqueKey3">
                <AccordionItemHeader>
                  <h4>3. Arrival / Room Info</h4>
                </AccordionItemHeader>

                <label>
                  Start Date<span className="required">*</span>
                  <Field as="select" name="startMonth">
                    {months.map((month) => (
                      <option value={month.toLowerCase()}>{month}</option>
                    ))}
                  </Field>
                  <Field as="select" name="startDay">
                    {days.map((day) => (
                      <option value={day}>{day}</option>
                    ))}
                  </Field>
                  <Field as="select" name="startYear">
                    {years.map((year) => (
                      <option value={year}>{year}</option>
                    ))}
                  </Field>
                </label>

                <label>
                  End Date<span className="required">*</span>
                  <Field as="select" name="endMonth">
                    {months.map((month) => (
                      <option value={month.toLowerCase()}>{month}</option>
                    ))}
                  </Field>
                  <Field as="select" name="endDay">
                    {days.map((day) => (
                      <option value={day}>{day}</option>
                    ))}
                  </Field>
                  <Field as="select" name="endYear">
                    {years.map((year) => (
                      <option value={year}>{year}</option>
                    ))}
                  </Field>
                </label>

                <label>
                  Room Option<span className="required">*</span>
                  <Field as="select" name="roomType">
                    <option value="tent">Tent</option>
                    <option value="dorm">Dormatory</option>
                  </Field>
                </label>
                <button type="button">Continue</button>
              </AccordionItem>
            </Accordion>

            <button type="submit">Submit</button>
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
