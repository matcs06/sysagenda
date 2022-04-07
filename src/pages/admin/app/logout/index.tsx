import React from 'react';

export default function Logout ()  {
   
   localStorage.setItem("token", "");
   localStorage.setItem("username", "");
   localStorage.setItem("user_id", "");

   window.location.pathname = ("/admin/login/")

   return 0;
}

