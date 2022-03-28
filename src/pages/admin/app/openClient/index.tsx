import { useEffect, useState } from "react";
export default function OpenClient(){

   const [ isFirstTime, setIsFirstTime] = useState(true)

      useEffect(()=>{
         window.open("/client/startPage")

      },[isFirstTime])


   return 0;
}