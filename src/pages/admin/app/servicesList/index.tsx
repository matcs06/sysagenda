import styles from "./serviceList.module.scss"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Router from 'next/router'
import { useEffect, useState } from "react";
import api from "../../../../api";
import InfoCard from "../../../../components/InfoCard";

interface ServiceFields {
   id:string;
   name:string;
   description:string;
   price:string;
   duration:string;
}

export default function ServicesList(){
   
   const [items, setItems] = useState<ServiceFields[]>([]);
   const [updateOnDelete, setUpdateOnDelete] = useState(false)

   const handleEdit = (serviceName: string, serviceId:string, serviceDuration:string,
   serviceDescription:string, serviceValue:string) =>{

      Router.push({
         pathname: '/admin/app/updateService',
         query: { serviceName, serviceId, serviceDuration, serviceDescription, serviceValue }
     })
   }

   useEffect(()=>{
      async function loadItems() {
         const token = localStorage.getItem("token");
         const response = await api.get<ServiceFields[]>("/products", {
         headers: { Authorization: "Bearer " + token },
         });

         setItems(response.data);
         setUpdateOnDelete(false)
      }
      loadItems();
      return () => {
         setItems([]);
      };
   }, [updateOnDelete])

   const deleteProduct = async (productId: string) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/products/${productId}`,{
          headers: { Authorization: "Bearer " + token },
      })
      setUpdateOnDelete(true)
    } catch (error) {
      window.alert("Erro ao deletar serviço")
    }
  }

   return(
      <div className={styles.container}>      
         <div className={styles.panel}>
            {items && items.map((item)=>(
               <div className={styles.card} key={item.id}>
                  <div className={styles.topCardContainer}>                     
                     <h1>{item.name}</h1>
                     <div className={styles.deleteEdit}>
                        <div className={styles.editContainer} onClick={()=>handleEdit(item.name, item.id, item.duration, item.description, item.price)}>
                           <EditIcon sx={{fontSize:30}}/>
                        </div>
                        <div className={styles.deleteContainer} onClick={()=>{deleteProduct(item.id)}}>
                        <DeleteForeverIcon sx={{fontSize:30}}/>
                        </div>
                     </div>
                  </div>
               
                  <ul>
                     {item.description.split(",").map((descLine)=>(
                     <li key={descLine}>
                        {descLine}
                     </li>
                     ))}
                  </ul>
                  <div className={styles.cardBottom}>
                     <h3>Duração: {item.duration} {item.duration.split(":")[0] == "00" ? "min" : "hr/s" }</h3>
                     <h3>{item.price} R$</h3>
                  </div>
               </div>
            ))}

         </div>
         
      </div>
      
   )


}