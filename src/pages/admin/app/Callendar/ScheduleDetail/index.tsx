import React, { useEffect, useState } from 'react';
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import styles from "./scheduleDetail.module.scss"
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import api from "../../../../../api"

const ScheduleDetail= ({props}) => {

    const [updateOnDelete, setUpdateOnDelete] = useState(false)
    const [updateOnClick, setupdateOnClick] = useState(false)
    const [togleTransaction, setTogleTransaction] = useState(true)

   const setTogleValue = (target:any) =>{
      if(target.value == "NÃO"){
         setTogleTransaction(false)
      }else{
         setTogleTransaction(true)
      }
   } 

   const onWhatsAppClick = (phone: string, serviceName:string, serviceDate:string, serviceTime:string)=>{

      
      phone = "+55"+phone.replace(" ","")
      const newTime = serviceTime.split(":")

      const formatedTime = newTime[0] + ":" + newTime[1]      

      let messageContent = `Studio Antonielem Ramos:\nOlá, gostaríamos de confimar o seu agendamento para:\nServiço: *${serviceName}*\nDia: *${serviceDate}*\nHorário: *${formatedTime} hrs*\nconfirma?`

      messageContent = window.encodeURIComponent(messageContent);

      let apiURL = `https://api.whatsapp.com/send?phone=${phone}&text=${messageContent}`;
      
      window.open(apiURL);
  }

  const deleteSchedules = async (scheduleId: string,
                                  serviceName:string,
                                  serviceDate:string,
                                  serviceValue:string) => {
      
      if(togleTransaction){
         try {
            const token = localStorage.getItem("token"); 
            const user_id = localStorage.getItem("user_id");
   
            await api.post("/transactions", {
               title: serviceName ,
               value: serviceValue,
               formatedDate: serviceDate,
               user_id: user_id,
               }, {
                  headers: {
                  Authorization: "Bearer " + token,
               },
            });
   
            window.alert("Agendamento adicionado ao IFinance com sucesso!")
         } catch (error) {
            window.alert("Erro ao adicionar agendamento no IFinance")
            
         }
      }


      try {

         const token = localStorage.getItem("token");
         await api.delete(`/schedules/${scheduleId}`,{
            headers: { Authorization: "Bearer " + token },
         })
         setUpdateOnDelete(true)
         window.alert("Agendamento deletado com sucesso")
      } catch (error) {
         window.alert("Erro ao deletar agendamento")
      }

  }

  return (

     <div className={styles.card}>
          <div>
            <p>Cliente: {props.Cliente}</p>
            <p>Serviço: {props.Service}</p>
             
            <p>Início: {String(props.fStartTime)}</p>
            <p>Fim: {String(props.fEndTime)}</p>
            <div className={styles.numberContainer}>
               <p>Contato: {props.phone}</p>
            </div>
            <div>
               <p>Preço: {props.value} R$</p>
            </div>
          </div>

          <div className={styles.bottomContainer}>
              <div onClick={()=>{onWhatsAppClick(props.phone, props.Service, props.date, props.fStartTime)}} className={styles.whatsappContainer}>
                     <WhatsAppIcon/>
              </div>

              <div className={styles.deleteContainer} onClick={()=>deleteSchedules(props.id, props.Service, props.date, props.value)}>
                    <DeleteForeverIcon sx={{fontSize:30}}/>
              </div>
          </div>
          
          <div className={styles.dropContainer}>
                <p>IFinance: </p>
                <DropDownListComponent id="EventType" dataSource={["SIM", "NÃO"]}
                placeholder="Adicionar ao Ifinance?" onChange={setTogleValue} data-name="ifinance" value={props.Status || null}>

                </DropDownListComponent>
            </div>
            
     </div>
     
  )
}

export default ScheduleDetail;