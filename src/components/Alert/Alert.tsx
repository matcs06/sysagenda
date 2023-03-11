import React, { useEffect, useState } from "react";
const Alert = ({ message = "mesagem de status", status, showAlert = true }) => {
   const [show, setShow] = useState(showAlert);

   const [mainMessage, description] = message.split("|")



   return (
      <>

         {
            show ? (
               <div
                  className={`alert alert-${status} ${showAlert ? "show" : "hide"}`}
                  style={{ right: 0 }}
               >
                  <p>{mainMessage}</p>

                  <p className="messageDescription">{description}</p>
               </div>
            ) : (
               <></>
            )}
      </>



   )




};

export default Alert;
