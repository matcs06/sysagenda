import { useEffect, useState } from "react"
import styles from "./update.module.scss"
import Input from "../../../../components/input"
import Button from "../../../../components/Button";
import api from "../../../../api";

interface UserInfo{
   name: string;
   phone: string;
   welcome_message: string;
   business_name:string;
   address: string;
   payment_status: string;
   payment_day: string;
   enabled: string;
}

export default function Update(props: any) {

   const [user, setUser] = useState<UserInfo>()
   const [welcome_message, setWelcomeMessage]= useState("")
   const [phone, setPhone]= useState("")
   const [business_name, setBusinessName]= useState("")
   const [address, setAddress]= useState("")
   const [payment_day, setPaymentDay] = useState("")
   const [payment_checked, setPaymentChecked] = useState<boolean>()
   
   const handleUpdate = async ()=>{
      const token = localStorage.getItem("token_super");
      const userToUpdate = localStorage.getItem("userToUpdate")

      if (userToUpdate !== ""){
         try {
            await api.patch(
            `/users/`,
            {
               username: userToUpdate,
               phone,
               welcome_message, 
               business_name,
               address,
               payment_status: payment_checked ? "pago" : "pendente",
               payment_day,
               enabled: true,
            },
            {
               headers: {
                  Authorization: "Bearer " + token,
               },
            }
            );
   
            window.alert(
            `Usuário atualizado com sucesso`
            );
   
         } catch (error) {
            window.alert("erro ao atualizar Usuário: " + String(error));
         }
      }
      
   }

   const controlPayment = ()=>{
      setPaymentChecked(!payment_checked)
   }

   const handleBack = ()=>{
      window.location.pathname = "admin/user/users"
   }

   useEffect(()=>{
      async function loadUser(){
         const userToUpdate = localStorage.getItem("userToUpdate")
         const response = await api.get<UserInfo>(`users/${userToUpdate}`)
         setUser(response.data)

         setBusinessName(response.data.business_name)
         setPhone(response.data.phone)
         setWelcomeMessage(response.data.welcome_message)
         setAddress(response.data.address)
         setPaymentDay(response.data.payment_day)

         if(response.data.payment_status == "pago"){
            setPaymentChecked(true)
         }else{
            setPaymentChecked(false)

         }
      }

      loadUser(); 

   },[])
  
   return(
      <div className={styles.container}>
         <div className={styles.panelContainer}>
         
           
         {user && (
             
             <div className={styles.panel}>
               <h3>{user.name}</h3>
               <div className={styles.serviceName}>
                  <Input type="text" placeholder={`Negócio: `+ user.business_name} name="BusinessName" setfieldvalue={setBusinessName}/>
               </div>
               <div className={styles.serviceName}>
                  <Input type="text" placeholder={`Contato: ` + user.phone} name="phone" setfieldvalue={setPhone}/>
               </div>
               <div className={styles.serviceName}>
                  <Input type="text" placeholder={`Boas: Vindas: ` + user.welcome_message} name="welcomeMessage" setfieldvalue={setWelcomeMessage}/>
               </div>
               <div className={styles.serviceName}>
                  <Input type="text" placeholder={`Endereço: ` + user.address} name="address" setfieldvalue={setAddress}/>
               </div>
              
               <div className={styles.serviceName}>
                  <Input type="text" placeholder={ `Dia de Pagamento: ` + user.payment_day} name="paymentDay" setfieldvalue={setPaymentDay}/>
               </div>

               <div className={styles.serviceName}>
                  <label className={styles.label} htmlFor="payment_status">Status do pagamento</label>

                 <input type="checkbox" id="payment_status" checked={payment_checked} onChange={controlPayment} />
               </div>
            
               <div className={styles.buttonContainer}>
                  <Button page="/admin/user/update" handleClick={handleUpdate} >Atualizar</Button>
                  <Button page="/admin/user/users" handleClick={handleBack} >Voltar</Button>
               </div>
            </div>
   
         )}
                
         </div>

      </div>
   )
}

