import { Modal, ModalClose, ModalDialog, Typography, Button, Input, FormControl, FormLabel } from "@mui/joy";
import "animate.css";
import "react-phone-input-2/lib/style.css";
import { useEffect, useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AppContext } from "../context/AppContext";
import PhoneInput from "react-phone-input-2";

const BookAppointmentModal = () => {
  const { isModalOpen, closeModal } = useContext(AppContext);
  const [animationClass, setAnimationClass] = useState("");
  const {API} = useContext(AppContext)
  useEffect(() => {
    if (isModalOpen) {
      setAnimationClass("animate__animated animate__backInUp");
    } else if (animationClass) {
      setAnimationClass("animate__animated animate__backOutUp");
    }
  }, [isModalOpen]);

  const handleClose = () => {
    setAnimationClass("animate__animated animate__backOutUp");
    setTimeout(closeModal, 500);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      contact: "",
      date: "",
      subject: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      contact: Yup.string().required("Contact Number is required"),
      date: Yup.date().required("Date is required"),
      subject: Yup.string().required("Subject is required"),
      message: Yup.string().min(20, "Message must be at least 20 characters").required("Message is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch(`${API}/appointments/appointment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error('Failed to submit appointment');
        }

        const data = await response.json();
        console.log("Form submitted successfully:", data);
        alert('Appointment booked successfully');
        resetForm();
        handleClose();
      } catch (error) {
        console.error('Error:', error);
        alert('There was an error booking your appointment.');
      }
    },
  });

  return (
    <Modal open={isModalOpen} onClose={handleClose} className="d-flex justify-content-center align-content-center">
      <ModalDialog
        layout="center"
        size="lg"
        variant="outlined"
        className={animationClass}
        sx={{
          top: '20%',
          left: '25%',
          transform: 'translate(-50%, -25%)',
          width: '800px',
          height: 'auto',
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        <ModalClose onClick={handleClose} />
        <Typography variant="h5" component="h2" gutterBottom>
          Book Appointment
        </Typography>
        <Typography mb={2}>
          Please fill in your details to book an appointment.
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <div className="d-flex gap-2 mb-3 justify-content-between">
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{width: '23vw'}}
                placeholder="Enter your name"
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-danger">{formik.errors.name}</div>
              ) : null}
            </FormControl>

            <FormControl>
              <FormLabel>Contact Number</FormLabel>
              <PhoneInput
                country={'us'}
                value={formik.values.contact}
                onChange={(value) => formik.setFieldValue('contact', value)}
                inputClass="w-100"
                style={{width: '23vw'}}
                placeholder="Enter contact number"
              />
              {formik.touched.contact && formik.errors.contact ? (
                <div className="text-danger">{formik.errors.contact}</div>
              ) : null}
            </FormControl>
          </div>

          <div className="mb-3">
            <FormControl fullWidth>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                name="date"
                value={formik.values.date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.date && formik.errors.date ? (
                <div className="text-danger">{formik.errors.date}</div>
              ) : null}
            </FormControl>
          </div>

          <div className="mb-3">
            <FormControl fullWidth>
              <FormLabel>Subject</FormLabel>
              <Input
                name="subject"
                value={formik.values.subject}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter the subject"
              />
              {formik.touched.subject && formik.errors.subject ? (
                <div className="text-danger">{formik.errors.subject}</div>
              ) : null}
            </FormControl>
          </div>

          <div className="mb-3">
            <FormControl fullWidth>
              <FormLabel>Message</FormLabel>
              <Input
                name="message"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your message"
                multiline
                rows={4}
              />
              {formik.touched.message && formik.errors.message ? (
                <div className="text-danger">{formik.errors.message}</div>
              ) : null}
            </FormControl>
          </div>

          <Button type="submit" variant="solid" fullWidth>
            Submit
          </Button>
        </form>
      </ModalDialog>
    </Modal>
  );
};

export default BookAppointmentModal;
