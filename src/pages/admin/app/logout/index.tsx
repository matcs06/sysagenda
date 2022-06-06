import React, { useEffect } from 'react';

export default function Logout ()  {
   
   useEffect(()=>{
      localStorage.setItem("token", "");
      localStorage.setItem("username", "");
      localStorage.setItem("user_id", "");
      localStorage.setItem("user_name", "");
      localStorage.setItem("business_name", "")

   window.location.pathname = ("/admin/login/")

   })
   
   return 0;
}

