import styles from "./serviceList.module.scss"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Image from "next/dist/client/image";
import { useEffect, useState } from "react";
import api from "../../../../api";

import UpdateService from "./UpdateService";
import PaymentReminder from "../../../../components/PaymentReminder";

import { useQuery } from "react-query";

interface ServiceFields {
   id: string;
   name: string;
   description: string;
   price: string;
   duration: string;
   enabled: string;
   image_url: string
}

interface UserInfo {
   name: string;
   payment_status: string;
   payment_day: string;
   enabled: string;
}


export default function ServicesList() {

   const testApiUrl = "http://localhost:3333/files";
   let productionApiUrl = "https://clickeagenda.arangal.com/files";

   const [showReminder, setShowReminder] = useState(false)
   const [userFullName, setUserFullName] = useState("")
   const [isReminderForPaymentDay, setIsReminderForPaymentDay] = useState(true)

   const [userName, setUserName] = useState("")
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

   const [inputedValue, setImputedValue] = useState("")

   const fetchServices = async () => {
      try {
         const token = localStorage.getItem("token");
         const user_id = localStorage.getItem("user_id");

         const response = await api.get<ServiceFields[]>(`/products?user_id=${user_id}`, {
            headers: { Authorization: "Bearer " + token },
         });

         setUpdateOnDelete(false)
         return response.data

      } catch (error) {

      }
   }

   const { data: services = [], isLoading, isError, } = useQuery("services", fetchServices)
   const filteredServices = services.filter((item) => item.name.toLocaleLowerCase().includes(inputedValue.toLocaleLowerCase()))


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
      let payment_status = localStorage.getItem("payment_status")
      const user_name = String(localStorage.getItem("user_name"))
      setUserName(user_name)
      setUserFullName(String(localStorage.getItem("username")))

      async function loadUserAndReminder() {
         const response = await api.get<UserInfo>(`users/${user_name}`)
         if (response.data.payment_status !== "pago") {
            payment_status = "pendente"
         } else {
            payment_status = "pago"
         }

         const formatedPaymentDay = Number(response.data.payment_day)

         //getting current day
         const today = new Date()
         const dateDay = Number(today.getDate().toString())

         const isPaymentDayToday = dateDay == formatedPaymentDay

         const showReminderFlagFirstCondition = isPaymentDayToday && payment_status == "pendente"
         const showReminderFlagSecondCondition = payment_status == "pendente"

         //Usado para definir o tipo de mensagem: lembrete do dia de pagamente o pagamento pendente
         setIsReminderForPaymentDay(showReminderFlagFirstCondition)

         //Mostrar o reminder caso seja a data de pagamento e esteja pendente
         setShowReminder(showReminderFlagFirstCondition || showReminderFlagSecondCondition)

      }

      loadUserAndReminder();

   }, [])


   const deleteProduct = async (productId: string) => {

      try {
         const token = localStorage.getItem("token");
         await api.delete(`/products/${productId}?user_name=${userName}`, {
            headers: { Authorization: "Bearer " + token },
         })
         window.alert(
            "Horário removido com sucesso!"
         );
         setUpdateOnDelete(true)
      } catch (error) {
         window.alert("Erro ao deletar serviço")
      }
   }

   function handleSearch(event: any) {
      event?.preventDefault()
      setImputedValue(event.target.value)
   }


   return (
      <div className={styles.container}>
         <form action="" className={styles.form}>
            <input className={styles.search} type="text" placeholder="Busque por um serviço" onChange={handleSearch} />
         </form>
         <div className={styles.panel} >
            {filteredServices?.map((item) => {
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

         {showReminder && (
            <PaymentReminder name={userFullName.split(" ")[0]} setShowReminder={setShowReminder} isReminderForPaymentDay={isReminderForPaymentDay} />

         )}
      </div>

   )


}