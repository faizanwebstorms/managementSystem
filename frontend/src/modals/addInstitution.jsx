import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Modal } from "react-bootstrap";

const AddInstitution = ({ show, handleClose, handleAddInstitution }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Dealer name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>New Institution</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            // paymentType: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleAddInstitution}
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

              <label htmlFor="">Active Payment Types:</label>
              <p
                style={{
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "300",
                  marginBottom: "10px",
                }}
              >
                payment types at dealers with active and pass (Bank- Neteller -
                Skrill - Crypt - etc)
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
                <Button type="submit" variant="primary">
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

export default AddInstitution;
