import { useState } from "react"
import styles from "./createService.module.scss"
import Input from "../../../../components/input"
import Button from "../../../../components/Button";
import api from "../../../../api";
import InfoCard from "../../../../components/InfoCard";


export default function CreateService() {

   const [serviceName, setServiceName] = useState()
   const [serviceInfo, setServiceInfo] = useState()
   const [value, setValue] = useState()
   const [duration, setDuration] = useState()
  
   const handleCreate = async ()=>{
      const token = localStorage.getItem("token");
      const user_id = localStorage.getItem("user_id");
      
      try {
         await api.post("/products", {
            name: serviceName,
            description: serviceInfo,
            price: value,
            duration: duration,
            user_id: user_id, 
            }, {
               headers: {
               Authorization: "Bearer " + token,
            },
         });
         window.alert(`Produto ${serviceName} criado com sucesso`);
         window.location.pathname = "/admin/app/"
      } catch (error) {
         window.alert(
            "erro ao criar novo produto: Verfifique se já não existe um produto com o mesmo nome"
      );
      }
      
   }

   const handleBack = ()=>{
      window.location.pathname = "/admin/app/servicesList"
   }
  
   return(
      <div className={styles.container}>
          <div className={styles.panelContainer}>
          <div className={styles.panel}>
             <div className={styles.serviceName}>
                 <Input type="text" placeholder="Nome do serviço" name="Servico" setfieldvalue={setServiceName}/>
             </div>
             <div className={styles.serviceDescription}>
                 <Input type="text" placeholder="Descrição do serviço" name="Descricao" setfieldvalue={setServiceInfo}/>
             </div>
             <div className={styles.valueAndDuration}>
                <Input type="text" placeholder="Valor" name="Valor" setfieldvalue={setValue}/>
                <Input type="time" placeholder="Duração" name="Duração" setfieldvalue={setDuration}/>
             </div>
             <div className={styles.buttonContainer}>
                <Button page="/admin/app/" handleClick={handleCreate} >Criar</Button>
                <Button page="login" handleClick={handleBack} >Voltar</Button>
             </div>
              
         </div>       
         </div>
      </div>
   )
}
