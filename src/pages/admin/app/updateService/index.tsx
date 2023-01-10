import { useEffect, useState } from "react"
import styles from "./updateService.module.scss"
import Input from "../../../../components/input"
import Button from "../../../../components/Button";
import { withRouter } from 'next/router'
import api from "../../../../api";

function UpdateService(props: any) {

   const [serviceName, setServiceName] = useState()
   const [serviceInfo, setServiceInfo] = useState()
   const [value, setValue] = useState()
   const [duration, setDuration] = useState()
   const enabledProps: boolean = props.router.query.isEnabled == 'false' ? false : true
   const [isEnabled, setIsEnabled] = useState(enabledProps)

   const handleUpdate = async () => {
      const token = localStorage.getItem("token");
      var existentServiceName = ''
      var existentDuration = ''
      var existentDescription = ''
      var existentValue = ''

      if (!serviceName) {
         existentServiceName = props.router.query.serviceName;
      } else {
         existentServiceName = serviceName
      }

      if (!duration) {
         existentDuration = props.router.query.serviceDuration;
      } else {
         existentDuration = duration
      }

      if (!serviceInfo) {
         existentDescription = props.router.query.serviceDescription;
      } else {
         existentDescription = serviceInfo
      }

      if (!value) {
         existentValue = props.router.query.serviceValue;
      } else {
         existentValue = value
      }

      try {
         await api.patch(
            `/products/${props.router.query.serviceId}`,
            {
               name: existentServiceName,
               description: serviceInfo,
               price: value,
               duration: existentDuration,
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
      window.location.pathname = "/admin/app/"
   }

   const controlEnabled = () => {
      setIsEnabled(!isEnabled)
   }


   return (
      <div className={styles.container}>
         <div className={styles.panelContainer}>
            <div className={styles.panel}>
               <div className={styles.serviceName}>
                  <Input type="text" placeholder={props.router.query.serviceName} name="Servico" setfieldvalue={setServiceName} />
               </div>
               <div className={styles.serviceDescription}>
                  <Input type="text" placeholder={props.router.query.serviceDescription} name="Descricao" setfieldvalue={setServiceInfo} />
               </div>
               <div className={styles.valueAndDuration}>
                  <Input type="text" placeholder={props.router.query.serviceValue} name="Valor" setfieldvalue={setValue} />
                  <Input type="time" placeholder="Duração" name="Duração" setfieldvalue={setDuration} />
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

export default withRouter(UpdateService)