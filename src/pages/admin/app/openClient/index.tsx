import { useEffect, useState } from "react";
export default function OpenClient(){

   const [ isFirstTime, setIsFirstTime] = useState(true)

      useEffect(()=>{
         window.open("/client/startPage/",'mywin', "width=500, height=900")

      },[isFirstTime])


   return <></>;
}