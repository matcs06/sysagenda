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

   const [user, setUser] = useState<UserInfo>()
   const [payment_day, setPaymentDay] = useState("")

   useEffect(() => {

      if (!localStorage.getItem("username")) {
         window.location.pathname = ("/admin/login/")
      }

      const userName = localStorage.getItem("user_name")

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