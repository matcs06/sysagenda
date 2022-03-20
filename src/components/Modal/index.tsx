import React from 'react';
import styles from "./Modal.module.scss"

export default function Modal({viewModal, modalTitle, children}){

  return (
     <div className={styles.modalContainer}>
        <div className={styles.modal}>
           <div className={styles.headerAndCloseContainer}>
              <h1 className={styles.title}>{modalTitle}</h1>
              <div className={styles.close} onClick={()=>{viewModal(false)}}>
                 <h1>X</h1>
              </div>
           </div>
           
            <div className={styles.inputContnainer}>
                  {children}
            </div>
        </div>
     </div>
  );
}
