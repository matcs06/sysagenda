import React, { useEffect } from 'react';

export default function Logout() {

   useEffect(() => {
      localStorage.clear()

      window.location.pathname = ("/admin/login/")

   })

   return 0;
}

