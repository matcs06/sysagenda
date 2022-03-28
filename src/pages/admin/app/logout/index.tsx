import React from 'react';

export default function Logout ()  {
   
   localStorage.setItem("token", "");
   localStorage.setItem("username", "");

   window.location.pathname = ("/admin/login/")

   return 0;
}

