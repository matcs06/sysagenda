import { useState } from "react"
import styles from "./updateService.module.scss"
import Input from "../../../../components/input"
import Button from "../../../../components/Button";
import api from "../../../../api";

function UpdateService({ service_name, service_duration, service_value, service_description, is_enabled, service_id, openModal }) {

   const [serviceName, setServiceName] = useState(service_name)
   const [serviceInfo, setServiceInfo] = useState(service_description)
   const [serviceValue, setServiceValue] = useState(service_value)
   const [serviceDuration, setServiceDuration] = useState(service_duration)
   const [isEnabled, setIsEnabled] = useState(Boolean(is_enabled))
   const handleUpdate = async () => {
      const token = localStorage.getItem("token");

      try {
         await api.patch(
            `/products/${service_id}`,
            {
               name: serviceName,
               description: serviceInfo,
               price: serviceValue,
               duration: serviceDuration,
               enabled: isEnabled
            },
            {
               headers: {
                  Authorization: "Bearer " + token,
               },
            }
         );

         window.alert(
            `Serviço atualizado com sucesso`
         );

      } catch (error) {
         window.alert("erro ao adicionar produtos: " + String(error));
      }

   }

   const handleBack = () => {
      openModal(false)
   }

   const controlEnabled = () => {
      setIsEnabled(!isEnabled)
   }


   return (
      <div className={styles.container}>
         <div className={styles.panelContainer}>
            <div className={styles.panel}>
               <div className={styles.serviceName}>
                  <Input type="text" value={serviceName} name="Servico" setfieldvalue={setServiceName} />
               </div>
               <div className={styles.serviceDescription}>
                  <Input type="text" value={serviceInfo} name="Descricao" setfieldvalue={setServiceInfo} />
               </div>
               <div className={styles.valueAndDuration}>
                  <Input type="text" value={serviceValue} name="Valor" setfieldvalue={setServiceValue} />
                  <Input type="time" value={serviceDuration} name="Duração" setfieldvalue={setServiceDuration} />
               </div>
               <div className={styles.enabledStyle}>
                  <label className={styles.label} htmlFor="payment_status">Habilitar</label>

                  <input className="checkBox" type="checkbox" id="payment_status" checked={isEnabled} onChange={controlEnabled} />
               </div>
               <div className={styles.buttonContainer}>
                  <Button page="/admin/app/" handleClick={handleUpdate} >Atualizar</Button>
                  <Button page="/admin/app/" handleClick={handleBack} >Voltar</Button>
               </div>

            </div>
         </div>
      </div>
   )
}

export default UpdateService