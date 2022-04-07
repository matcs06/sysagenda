import { useState } from "react"
import styles from "./createAvailability.module.scss"
import Input from "../../../../components/input"
import Button from "../../../../components/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import { registerLocale } from  "react-datepicker";
import {validateMorningTime, validateAfternoonTime} from "../../../../utils/index.js"
import pt from "date-fns/locale/pt-BR"
import api from "../../../../api";

export default function CreateAvailability() {

   const [picketDate, setPickedDate] = useState(new Date())
   const [morningFrom, setMorningFrom] = useState()
   const [morningTo, setMorningTo] = useState()
   const [afternoonFrom, setAfternoonFrom] = useState()
   const [afternoonTo, setAfternoonTo] = useState()
   const [formatedDate, setFormatedDate] = useState("Selecione uma data")

   registerLocale('pt', pt)
   
   const addZero = (value) => {
      
      if(value < 10 ){
         value = '0' + value;   
      }
      return value
   }

   const handlePickedDate = (date) =>{
      setPickedDate(date)

      var month = date.getMonth() + 1; //months from 1-12
      var day = date.getDate();
      var year = date.getFullYear();

      day = addZero(day)
      month = addZero(month)

      const formatedDate = day + "/" + month + "/" + year
      setFormatedDate(formatedDate)

   }

   const handleCreate = async ()=>{
      
      try {

         validateMorningTime(morningFrom, morningTo);
         validateAfternoonTime(afternoonFrom, afternoonTo)
         
         const token = localStorage.getItem("token");
         const user_id = localStorage.getItem("user_id");

         var morning_start_time = ""
         var morning_end_time = ""
         var afternoon_start_time = ""
         var afternoon_end_time = ""

         if (morningFrom){
            morning_start_time = morningFrom + ":00"
         }

         if (morningTo){
            morning_end_time = morningTo + ":00"
         }

         if (afternoonFrom){
            afternoon_start_time = afternoonFrom + ":00"
         }

         if (afternoonTo){
            afternoon_end_time = afternoonTo + ":00"
         }

         await api.post("/availability/", {
            date: formatedDate,
            morning_start_time,
            morning_end_time,
            afternoon_start_time,
            afternoon_end_time,
            user_id: user_id,
            }, {
               headers: {
               Authorization: "Bearer " + token,
            },
         });
         window.alert(`Horário na data ${formatedDate} criado com sucesso`);
         window.location.pathname = "/admin/app/"
      } catch (error) {
         window.alert(
            "erro ao criar novo horário: Verfifique se já não existe um horário na mesma data"
      );
      }

   }

   const handleBack = ()=>{
      window.location.pathname = "/admin/app/"
   }
  
   return(
      <div className={styles.container}>
          <div className={styles.panelContainer}>
          <div className={styles.panel}>
             <DatePicker className={styles.datePicker} locale="pt" selected={picketDate} onChange={(date)=>{handlePickedDate(date)}} />
             <div className={styles.formatedDate}>{formatedDate}</div>
             <h3>Manhã</h3>
             <div className={styles.morningAfternoon}>
                <Input type="time" placeholder="das" name="fromM" setfieldvalue={setMorningFrom}/>
                <Input type="time" placeholder="as" name="toM" setfieldvalue={setMorningTo}/>
             </div>
             <h3>Tarde</h3>
             <div className={styles.morningAfternoon}>
                <Input type="time" placeholder="das" name="fromA" setfieldvalue={setAfternoonFrom}/>
                <Input type="time" placeholder="as" name="toA" setfieldvalue={setAfternoonTo}/>
             </div>
             <div className={styles.buttonContainer}>
                <Button page="/admin/app/" handleClick={handleCreate} >Criar</Button>
                <Button page="/admin/app/" handleClick={handleBack} >Voltar</Button>
             </div>
              
         </div>       
         </div>
      </div>
   )
}
