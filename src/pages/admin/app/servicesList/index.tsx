import styles from "./serviceList.module.scss"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Image from "next/dist/client/image";
import { useEffect, useState } from "react";
import api from "../../../../api";

import UpdateService from "./UpdateService";

interface ServiceFields {
   id: string;
   name: string;
   description: string;
   price: string;
   duration: string;
   enabled: string;
   image_url: string
}

export default function ServicesList() {

   const testApiUrl = "http://localhost:3333/files/";
   const productionApiUrl = "https://clickeagenda.arangal.com/files";


   const [userName, setUserName] = useState("")
   const [items, setItems] = useState<ServiceFields[]>([]);
   const [updateOnDelete, setUpdateOnDelete] = useState(false)
   const [showUpdateModal, setShowUpdateModal] = useState(false)
   const [serviceUpdateData, setServiceUpdateData] = useState({
      service_name: "",
      service_id: "",
      service_duration: "",
      service_description: "",
      service_isEnabled: "",
      service_value: ""
   })

   const handleEdit = (serviceName: string, serviceId: string, serviceDuration: string,
      serviceDescription: string, serviceValue: string, isEnabled: string) => {

      setServiceUpdateData({
         service_name: serviceName,
         service_id: serviceId,
         service_description: serviceDescription,
         service_duration: serviceDuration,
         service_isEnabled: isEnabled,
         service_value: serviceValue
      })

      setShowUpdateModal(true)

   }

   useEffect(() => {
      setUserName(localStorage.getItem("user_name"))

   }, [])

   useEffect(() => {
      const payment_status = localStorage.getItem("payment_status")
      async function loadItems() {
         const token = localStorage.getItem("token");
         const user_id = localStorage.getItem("user_id");

         const response = await api.get<ServiceFields[]>(`/products?user_id=${user_id}`, {
            headers: { Authorization: "Bearer " + token },
         });

         setItems(response.data);
         setUpdateOnDelete(false)
      }

      if (payment_status == "pago") {

         loadItems();
      } else {
         window.alert("Error, Pagamento de mensalidade pendente! Pague sua mensalidade para continuar usando o serviço")
      }
      return () => {
         setItems([]);
      };
   }, [updateOnDelete])

   const deleteProduct = async (productId: string) => {

      try {
         const token = localStorage.getItem("token");
         await api.delete(`/products/${productId}?user_name=${userName}`, {
            headers: { Authorization: "Bearer " + token },
         })
         setUpdateOnDelete(true)
      } catch (error) {
         window.alert("Erro ao deletar serviço")
      }
   }

   console.log(userName)

   return (
      <div className={styles.container}>
         <div className={styles.panel} >
            {items && items.map((item) => {
               if (String(item.enabled) == 'true') {
                  return (
                     <div className={styles.card} key={item.id} >
                        <div className={styles.topCardContainer}>
                           <h1>{item.name}</h1>
                           <div className={styles.deleteEdit}>
                              <div className={styles.editContainer} onClick={() => handleEdit(item.name, item.id, item.duration, item.description, item.price, item.enabled)}>
                                 <EditIcon sx={{ fontSize: 30 }} />
                              </div>
                              <div className={styles.deleteContainer} onClick={() => { deleteProduct(item.id) }}>
                                 <DeleteForeverIcon sx={{ fontSize: 30 }} />
                              </div>
                           </div>
                        </div>

                        <ul>
                           {item.description.split(";").map((descLine) => (
                              <li key={descLine}>
                                 {descLine}
                              </li>
                           ))}
                        </ul>
                        <div className={styles.imageContainer}>
                           <Image className={styles.imagefile} src={item.image_url !== null ? `${productionApiUrl}/${userName}/${item.image_url}` : `/admin/${userName}/admlogo.png`}
                              width={90}
                              height={90}
                              alt={"imagem"} />
                        </div>
                        <div className={styles.cardBottom}>
                           <h3>Duração: {item.duration} {item.duration.split(":")[0] == "00" ? "min" : "hr/s"}</h3>
                           <h3>R$ {item.price}</h3>
                        </div>
                     </div>
                  )
               } else {
                  return (
                     <div className={styles.disabledCard} key={item.id} >
                        <div className={styles.topCardContainer}>

                           <h1>{item.name}</h1>
                           <div className={styles.deleteEdit}>
                              <div className={styles.editContainer} onClick={() => handleEdit(item.name, item.id, item.duration, item.description, item.price, item.enabled)}>
                                 <EditIcon sx={{ fontSize: 30 }} />
                              </div>
                              <div className={styles.deleteContainer} onClick={() => { deleteProduct(item.id) }}>
                                 <DeleteForeverIcon sx={{ fontSize: 30 }} />
                              </div>
                           </div>
                        </div>

                        <ul>
                           {item.description.split(";").map((descLine) => (
                              <li key={descLine}>
                                 {descLine}
                              </li>
                           ))}
                        </ul>
                        <div className={styles.imageContainer}>
                           <Image className={styles.imagefile} src={item.image_url !== null ? `${productionApiUrl}/${userName}/${item.image_url}` : `/admin/${userName}/admlogo.png`}
                              width={90}
                              height={90}
                              alt={"imagem"} />
                        </div>
                        <div className={styles.cardBottom}>
                           <h3>Duração: {item.duration} {item.duration.split(":")[0] == "00" ? "min" : "hr/s"}</h3>
                           <h3>R$ {item.price}</h3>
                        </div>
                     </div>
                  )
               }


            })}

         </div>
         {showUpdateModal && (
            <div className={styles.modalUpdate}>
               <UpdateService
                  service_name={serviceUpdateData.service_name}
                  service_description={serviceUpdateData.service_description}
                  service_duration={serviceUpdateData.service_duration}
                  is_enabled={serviceUpdateData.service_isEnabled}
                  service_id={serviceUpdateData.service_id}
                  service_value={serviceUpdateData.service_value}
                  openModal={setShowUpdateModal} />

            </div>
         )}


      </div>

   )


}