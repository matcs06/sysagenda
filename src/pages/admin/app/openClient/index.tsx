import { useEffect, useState } from "react";
export default function OpenClient(){

   const [ isFirstTime, setIsFirstTime] = useState(true)

      useEffect(()=>{
         const username = localStorage.getItem("user_name");
         window.open(`/client/startPage/${username}`,'mywin', "width=500, height=900")

      },[isFirstTime])


   return <></>;
}