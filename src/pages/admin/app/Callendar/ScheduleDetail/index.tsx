import React, { useEffect, useState } from 'react';
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import styles from "./scheduleDetail.module.scss"
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import api from "../../../../../api"
import PaidIcon from '@mui/icons-material/Paid';
const ScheduleDetail = ({ props }) => {

   const [updateOnDelete, setUpdateOnDelete] = useState(false)
   const [updateOnClick, setupdateOnClick] = useState(false)
   const [paid, setPaid] = useState(false)

   const setPaidSelected = (target: any) => {
      if (target.value == "NÃO") {
         setPaid(false)
      } else {
         setPaid(true)
      }
   }

   const onWhatsAppClick = (phone: string, serviceName: string, serviceDate: string, serviceTime: string) => {

      const business_name = localStorage.getItem("business_name")
      phone = "+55" + phone.replace(" ", "")
      const newTime = serviceTime.split(":")

      const formatedTime = newTime[0] + ":" + newTime[1]

      let messageContent = `${business_name}:\nOlá, gostaríamos de confimar o seu agendamento para:\nServiço: *${serviceName.split("-")[0]}*\nDia: *${serviceDate}*\nHorário: *${formatedTime} hrs*\nTolerância de atraso: *10min*\nconfirma?`

      messageContent = window.encodeURIComponent(messageContent);

      let apiURL = `https://api.whatsapp.com/send?phone=${phone}&text=${messageContent}`;

      window.open(apiURL);
   }

   const deleteSchedules = async (scheduleId: string) => {

      try {

         const token = localStorage.getItem("token");
         await api.delete(`/schedules/${scheduleId}`, {
            headers: { Authorization: "Bearer " + token },
         })
         setUpdateOnDelete(true)
         window.alert("Agendamento deletado com sucesso")
      } catch (error) {
         window.alert("Erro ao deletar agendamento")
      }

   }

   const handleAddToFinancial = async (serviceName: string,
      serviceDate: string,
      serviceValue: string,
      cliente: string,
      customer_phone: string) => {

      const clientFirstName = cliente.split(" ")[0]


      try {
         const token = localStorage.getItem("token");
         const user_id = localStorage.getItem("user_id");

         await api.post("/transactions", {
            title: clientFirstName + " - " + serviceName.split("-")[0],
            value: serviceValue,
            formatedDate: serviceDate,
            payment_status: paid ? "payd" : "topay",
            user_id: user_id,
            customer_phone,
         }, {
            headers: {
               Authorization: "Bearer " + token,
            },
         });

         if (paid) {
            window.alert("Agendamento adicionado ao Financeiro com sucesso!")
         } else {
            window.alert("Agendamento adicionado aos Pagamentos pendentes com sucesso!")
         }
      } catch (error) {
         window.alert("Erro ao adicionar agendamento no Financeiro")

      }



   }

   return (

      <div className={styles.card}>
         <div>

            <div className={styles.titleContent} style={{ display: "flex", width: "100%" }}>
               <p style={{ fontWeight: "lighter" }}>Cliente:</p><p>{props?.Customer}</p>
            </div>

            <div className={styles.titleContent} style={{ display: "flex", width: "100%" }}>
               <p style={{ fontWeight: "lighter" }}>Serviço:</p><p>{props?.Service}</p>
            </div>

            <div className={styles.titleContent} style={{ display: "flex", width: "100%" }}>
               <p style={{ fontWeight: "lighter" }}>Horário:</p><p>{String(props?.fStartTime)} às {String(props?.fEndTime)}</p>
            </div>

            <div className={styles.titleContent} style={{ display: "flex", width: "100%" }}>
               <p style={{ fontWeight: "lighter" }}>Contato:</p><p>{props?.phone}</p>
            </div>

            <div className={styles.titleContent} style={{ display: "flex", width: "100%" }}>
               <p style={{ fontWeight: "lighter" }}>Preço:</p><p>R$ {props?.value}</p>
            </div>


         </div>

         <div className={styles.dropContainer}>

            <>

               <p>Pago: </p>
               <DropDownListComponent id="EventType" dataSource={["SIM", "NÃO"]}
                  placeholder="Pago?" onChange={setPaidSelected} data-name="ifinance" value={null}>
               </DropDownListComponent>


               <div onClick={() => handleAddToFinancial(props?.Service, props?.date, props?.value, props?.Customer, props?.phone)} className={styles.addToFinButton} title="Clique aqui para adicionar ao financeiro">
                  <PaidIcon />
               </div>
            </>

         </div>

         <div className={styles.bottomContainer} >
            <div onClick={() => { onWhatsAppClick(props?.phone, props?.Service, props?.date, props?.fStartTime) }} className={styles.whatsappContainer}>
               <WhatsAppIcon />
            </div>

            <div className={styles.deleteContainer} onClick={() => deleteSchedules(props?.id)}>
               <DeleteForeverIcon sx={{ fontSize: 30 }} />
            </div>
         </div>

      </div>

   )
}

export default ScheduleDetail;