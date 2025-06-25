import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const contactFormSubmission = (userData) => {
  const {API} = useContext(AppContext);
  return axios.post(
    `${API}/query/submit`,
    userData,
    {
      headers: {
        "Content-Type": "application/json",
      },
}
);
};