import styles from "./availabilityInquiry.module.scss"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { fontSize } from "@mui/system";
import { useEffect, useState } from "react";
import { getMonthName, getWeekDayName, getYear, getDayInNumber, timeFormated } from "../../../../utils/index.js"
import api from "../../../../api";
import { useQuery } from "react-query";

interface AvailabilityFiels {
   id: string;
   date: string;
   morning_start_time: string;
   morning_end_time: string;
   afternoon_start_time: string;
   afternoon_end_time: string;
}

export default function AvailabilityInquiry() {
   const [updateOnDelete, setUpdateOnDelete] = useState(false)


   const fetchAvailabilities = async () => {
      try {
         const user_id = localStorage.getItem("user_id");
         const response = await api.get<AvailabilityFiels[]>(`/availability?user_id=${user_id}`)

         return response.data

      } catch (error) {

      }
   }

   const { data: availabilities, isLoading, isError, } = useQuery("availabilities", fetchAvailabilities)


   const deleteAvailability = async (productId: string) => {
      try {
         const token = localStorage.getItem("token");
         await api.delete(`/availability/${productId}`, {
            headers: { Authorization: "Bearer " + token },
         })
         window.alert(
            "Horário removido com sucesso!"
         );
         setUpdateOnDelete(true)
      } catch (error) {
         window.alert("Erro ao deletar serviço")
      }
   }


   return (
      <div className={styles.container}>
         <div className={styles.panel}>
            {availabilities?.map((item) => (
               <div className={styles.card} key={item.date} >
                  <p>Dia da semana: {getWeekDayName(item.date)}</p>
                  <p>Data: {getDayInNumber(item.date)} de {getMonthName(item.date)}, {getYear(item.date)}</p>
                  <p className={styles.divideLine}>****🕜  Horários   🕜****</p>
                  <div className={styles.cardBottom}>
                     {item.morning_start_time && (
                        <p>Manhã: {timeFormated(item.morning_start_time)} hrs - {timeFormated(item.morning_end_time)} hrs</p>
                     )}
                     {item.afternoon_start_time && (
                        <p>Tarde: {timeFormated(item.afternoon_start_time)} hrs - {timeFormated(item.afternoon_end_time)} hrs</p>
                     )}
                  </div>
                  <div className={styles.deleteContainerContainer}>
                     <div className={styles.deleteContainer} onClick={() => { deleteAvailability(item.id) }}>
                        <DeleteOutlineIcon sx={{ fontSize: 25 }} />
                     </div>
                  </div>
               </div>
            ))}

         </div>

      </div>

   )


}