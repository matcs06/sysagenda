import styles from "./openSchedules.module.scss"
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useState } from "react";
import api from "../../../../api";
import { getWeekDayName, timeFormated, removeNonNumbers } from "../../../../utils/index.js";


interface SchduleFields{
   id:string;
   customer_name:string;
   service:string;
   date:string;
   start_time:string;
   service_duration:string;
   phone_number:string;
   value: string;
}

export default function OpenSchedules(){

   const [items, setItems] = useState<SchduleFields[]>([]);
   const [updateOnDelete, setUpdateOnDelete] = useState(false)
   const [updateOnClick, setupdateOnClick] = useState(false)
   const [togleTransaction, setTogleTransaction] = useState(true)

   useEffect(()=>{

      async function loadItems(){
         const user_id = localStorage.getItem("user_id");
         const response = await api.get<SchduleFields[]>(`/schedules?user_id=${user_id}`)

         setItems(response.data)
         setUpdateOnDelete(false)

      }
      loadItems();

      return()=>{

         setItems([]);
      }

   },[updateOnDelete, updateOnClick])

   const deleteSchedules = async (scheduleId: string,
                                  serviceName:string,
                                  serviceDate:string,
                                  serviceValue:string) => {
     
     if(togleTransaction){
        try {
            const token = localStorage.getItem("token"); 

            await api.post("/transactions", {
               title: serviceName ,
               value: serviceValue,
               formatedDate: serviceDate,
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
     } catch (error) {
       window.alert("Erro ao deletar agendamento")
     }
   }

   const onWhatsAppClick = (phone: string, serviceName:string, serviceDate:string, serviceTime:string)=>{

      const businessName = localStorage.getItem("business_name")
      
      phone = "+55"+removeNonNumbers(phone)
      const newTime = serviceTime.split(":")

      const formatedTime = newTime[0] + ":" + newTime[1]      

      let messageContent = `${businessName}:\nOlá, gostaríamos de confimar o seu agendamento para:\nServiço: *${serviceName}*\nDia: *${serviceDate}*\nHorário: *${formatedTime} hrs*\nconfirma?`

      messageContent = window.encodeURIComponent(messageContent);

      let apiURL = `https://api.whatsapp.com/send?phone=${phone}&text=${messageContent}`;
      
      window.open(apiURL);
   }

   return(
      <div className={styles.container}>        
         <div className={styles.addToIfinance}>
            <p>IF:</p>
            <input type="checkbox" checked={togleTransaction} onClick={()=>{setTogleTransaction(!togleTransaction)}}/>
         </div>
         <div className={styles.panel} onClick={()=>{setupdateOnClick(!updateOnClick)}}>
            {items.map((item)=>(
               <div className={styles.card} key={item.id}>
               <div>
                  <p>Cliente: {item.customer_name}</p>
                  <p>Serviço: {item.service}</p>
                  <p>Data: {item.date} - {getWeekDayName(item.date)}</p>
                  <div className={styles.numberContainer}>
                     <p>Número: {item.phone_number}</p>
                  </div>
                  <p>Horário: {timeFormated(item.start_time)}</p>
                  <div className={styles.cardBottom}>
                     <p>Duração: {timeFormated(item.service_duration)}</p>
                     <p>{item.value} R$</p>
                  </div>
               </div>
             
               <div className={styles.bottomContainer}>
                  <div className={styles.wppIcon} onClick={()=>{onWhatsAppClick(item.phone_number, item.service, item.date, item.start_time)}}>
                        <WhatsAppIcon/>   
                  </div>  
                  <div className={styles.deleteContainer} onClick={()=>deleteSchedules(item.id, item.service, item.date, item.value)}>
                    <DeleteForeverIcon sx={{fontSize:30}}/>
                  </div>
               </div>               
            </div>
            ))}
            
         </div>
      </div>
      
   )


}