import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Modal } from "react-bootstrap";

const AddDealer = ({ show, handleClose, handleAddDealer }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Dealer name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    limit: Yup.number()
      .typeError("Limit must be a number")
      .required("Limit is required"),
    // paymentType: Yup.string().required("Payment Dealer Type is required"),
  });

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>New Dealer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            limit: "",
            // paymentType: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleAddDealer}
        >
          {({ isSubmitting, resetForm }) => (
            <FormikForm>
              <div className="mb-3">
                <label>Dealer Name:</label>
                <Field
                  name="name"
                  type="text"
                  placeholder="Enter dealer name"
                  className="form-control"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label>Email:</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter dealer email"
                  className="form-control"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label>Password:</label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label>Limit:</label>
                <Field
                  name="limit"
                  type="text"
                  placeholder="Enter limit"
                  className="form-control"
                />
                <ErrorMessage
                  name="limit"
                  component="div"
                  className="text-danger"
                />
              </div>

              {/* <div className="mb-3">
              <label>Payment Dealer Type:</label>
              <Field
                as="select"
                name="paymentType"
                className="form-control"
              >
                <option value="">Select payment type</option>
                <option value="Bank Account">Bank Account</option>
                <option value="Neteller">Neteller</option>
                <option value="Etc">Etc</option>
              </Field>
              <ErrorMessage name="paymentType" component="div" className="text-danger" />
            </div> */}
              <label htmlFor="">Payment Dealer Type:</label>
              <p
                style={{
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "300",
                  marginBottom: "10px",
                }}
              >
                With Select (Bank Account - Netteller - Etc If a field is
                created in the database, we can add it there manually while
                setting up the system. ){" "}
              </p>
              <div className="d-flex justify-content-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    resetForm();
                    handleClose();
                  }}
                >
                  Discard
                </Button>
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  Send
                </Button>
              </div>
            </FormikForm>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddDealer;
