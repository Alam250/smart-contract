import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { useRef } from "react";
export default function ErrorMessage({ message }) {
  const toastId = useRef(null);
  if (!message) return null;

  const notify = () => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error(
        message,
        {
          toastId: "err",
          theme: "colored",
          position: toast.POSITION.TOP_CENTER
        },
        {}
      );
    }
  };
  return (
    <>
      {notify()} <ToastContainer limit={1} />
    </>
  );
}
