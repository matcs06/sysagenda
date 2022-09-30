import styles from "./PaymentAlert.module.scss"
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import api from "../../api/index"
import { useEffect, useState } from "react";
import Button from "../Button"


interface UserInfo{
   name: string;
   payment_status: string;
   payment_day: string;
   enabled: string;
}


export default function PaymentAlert({payment_day}) {
   const [ showMessage1, setShowMessage1] = useState(null)

   const todayDate = new Date().getDate()
  

   const handleWhatsAppClick = ()=>{
      const phone = '+5511959842539' 
      const apiURL = `https://api.whatsapp.com/send?phone=${phone}`;

      window.open(apiURL)
   }


   useEffect(()=>{

      function loadMessageType(){
         if ((Number(payment_day) == Number(todayDate)) ||
            (Number(payment_day + 1) == Number(todayDate)) ||
            (Number(payment_day + 2) == Number(todayDate))
            ){
            setShowMessage1(true)
            localStorage.setItem("moreTwoDays", "yes")
         }else{
            if(Number(payment_day) > Number(todayDate + 2) ){
               setShowMessage1(false)
               localStorage.setItem("token", "");
               localStorage.setItem("moreTwoDays", "no")
            }
         }
      }

      

      loadMessageType()
   
   },[])


   return (
      <> {setShowMessage1 ? (
         <div className={styles.case1}>
         <h1>Hoje é dia do seu pagamento!</h1>
         <div>
            <h3>Faça o pagamento do seu plano para continuar ter acesso ao seu sistema, o acesso é liberado assim que o pagamento é identificado</h3>
            <div>
               <h3>Envie o comprovante de pagamento para esse contato do WhatsApp</h3>

               <WhatsAppIcon onClick={handleWhatsAppClick}/>
            </div>
            <h3>Você pode usar dois dias de cortesia, depois continue usando  mediante o pagamento </h3>
            <Button page="/admin/user/login">Usar 2 dias de cortesia</Button>
            <button>Usar por mais dois dias</button>
         </div>
      </div>
        
      ):(
         <div className={styles.case2}>
            <h1>Hoje é dia do seu pagamento!</h1>
            <div>
             <h3>Faça o pagamento do seu plano para continuar ter acesso ao seu sistema, o acesso é liberado assim que o pagamento é identificado</h3>
            <div>
               <h3>Envie o comprovante de pagamento para esse contato do WhatsApp</h3>

               <WhatsAppIcon onClick={handleWhatsAppClick}/>
            </div>
            <h3>O seu perído para uso da cortesia também já expirou</h3>
            <Button page="/admin/user/login">OK</Button>
            </div>
         </div>

      )}
      </>
   );
}

