import React, { useEffect, useState } from 'react';
import SideBar from '../../../components/SideBar';
import ServicesList from './servicesList';
// import { Container } from './styles';
import api from "../../../api"
interface UserInfo {
   name: string;
   payment_status: string;
   payment_day: string;
   enabled: string;
}


const App: React.FC = () => {

   const todayDate = new Date().getDate()


   const [user, setUser] = useState<UserInfo>()
   const [payment_day, setPaymentDay] = useState("")

   useEffect(() => {
      const userName = localStorage.getItem("user_name")
      if (!localStorage.getItem("username")) {
         console.log("passou aqui")
         window.location.pathname = ("/admin/login/")
      }
      async function loadUser() {
         const response = await api.get<UserInfo>(`users/${userName}`)
         setUser(response.data)


         localStorage.setItem("payment_day", response.data.payment_day)
         if (response.data.payment_status !== "pago") {
            localStorage.setItem("payment_status", "pendente")
         } else {
            localStorage.setItem("payment_status", "pago")
         }
      }

      loadUser();

   }, [])

   return (

      <>
         <SideBar >
            <ServicesList />
         </SideBar>

      </>
   )
}

export default App;