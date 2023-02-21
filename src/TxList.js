import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { useRef } from "react";
export default function TxList({ txs }) {
  const toastId = useRef(null);
  if (!txs) return null;

  const notify = () => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.success(txs, {
        toastId: "succ",
        theme: "colored",
        position: toast.POSITION.TOP_CENTER
      });
    }
  };
  return (
    <>
      {notify()}
      <ToastContainer limit={1} />
    </>
  );
}
