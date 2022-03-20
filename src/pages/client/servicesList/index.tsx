import styles from "./servicesList.module.scss"
import Router from 'next/router'
import { useEffect, useState } from "react"
import api from "../../../api";
import { Skeleton } from '@mui/material';


interface ServiceFields {
   id:string;
   name:string;
   description:string;
   price:string;
   duration:string;
}

export default function ServicesList(){

   const [items, setItems] = useState<ServiceFields[]>([]);
   const [isLoading, setIsLoading]= useState(true)
   const arrayLoop = [1,2,3,4,5,6]
   const handleClick = (serviceId: string, serviceName: string, serviceDuration:string, servicePrice:string
   ) =>{

      Router.push({
         pathname: '/client/chooseTime',
         query: { serviceName, serviceId, serviceDuration, servicePrice}
     })
   }


   useEffect(()=>{
      async function loadItems() {
         const response = await api.get<ServiceFields[]>("/products");

         setItems(response.data);
         setIsLoading(false)
         
      }
      loadItems();
      return () => {
         setItems([]);
      };
   }, [isLoading])

   const loading = ()=>{
      return(
         <div className={styles.container}>
         <Skeleton animation="wave" sx={{ bgcolor: '#3C2841' }}><h3 className={styles.screenTitle}>Escolha um serviço</h3> </Skeleton> 
         <div className={styles.panel}>
            {arrayLoop.map((cont)=>(
                <Skeleton width={290} animation="wave" sx={{ bgcolor: '#3C2841' }} key={cont}>
                <div className={styles.card} >
                </div>
            </Skeleton>
            ))}
         </div>
         
      </div>
      )
   }

   if(isLoading){
      return loading()
   }else{
      return(
      <div className={styles.container}>
        <h3 className={styles.screenTitle}>Escolha um serviço</h3>
         <div className={styles.panel}>
            {items && items.map((item)=>(
                 <div className={styles.card} onClick={()=>handleClick(item.id, item.name, item.duration, item.price)} key={item.id}>
               <div className={styles.topCardContainer}>
                   <h1>{item.name}</h1>
               </div>
              
               <ul>
                 {item.description.split(",").map((descLine)=>(
                     <li key={descLine}>
                        {descLine}
                     </li>
                  ))}
               </ul>
               <div className={styles.cardBottom}>
                  <h3>Duração: {item.duration} {item.duration.split(":")[0]==="00" ? "minutos" : "hr/s"}</h3>
                  <h3>{item.price} R$</h3>
               </div>
            </div>
            ))}
         </div>
         
      </div>
      
   )
   }

}
