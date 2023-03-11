import { useState } from "react"
import styles from "./createService.module.scss"
import Input from "../../../../components/input"
import Button from "../../../../components/Button";
import api from "../../../../api";
import ImageUploading from 'react-images-uploading';


export default function CreateService() {

   const [serviceName, setServiceName] = useState()
   const [serviceInfo, setServiceInfo] = useState()
   const [value, setValue] = useState()
   const [duration, setDuration] = useState()
   const [images, setImages] = useState([])
   const [showWarning, setShowWarning] = useState(false)

   const handleCreate = async () => {
      const token = localStorage.getItem("token");
      const user_id = localStorage.getItem("user_id");
      const payment_status = localStorage.getItem("payment_status")
      if (images.length === 0) {
         setShowWarning(true)
      }
      else {
         if (payment_status == "pago") {
            setShowWarning(false)
            const formData = new FormData()

            try {

               formData.append("name", serviceName)
               formData.append("price", value)
               formData.append("description", serviceInfo)
               formData.append("duration", duration)
               formData.append("user_id", user_id)
               formData.append("filename", images[0].file)

               await api.post("/products", formData, {
                  headers: {
                     "Content-Type": "multipart/form-data",
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

         } else {
            window.alert("Erro ao criar.  Pagamento de mensalidade pendente, você precisa fazer o pagamento para continuar usando o serviço")
         }
      }


   }

   const handleBack = () => {
      window.location.pathname = "/admin/app/servicesList"
   }

   const onChangeFile = (imageList, addUpdateInfex) => {
      setImages(imageList)

      if (imageList.length > 0) {

         setShowWarning(false)
      }

   }

   return (
      <div className={styles.container}>
         <div className={styles.panelContainer}>
            <div className={styles.panel}>
               <div className={styles.serviceName}>
                  <Input type="text" placeholder="Nome do serviço" name="Servico" setfieldvalue={setServiceName} />
               </div>
               <div className={styles.serviceDescription}>
                  <Input type="text" placeholder="Descrição do serviço" name="Descricao" setfieldvalue={setServiceInfo} />
               </div>
               <div className={styles.valueAndDuration}>
                  <Input type="number" placeholder="Valor" name="Valor" setfieldvalue={setValue} />
                  <Input type="time" placeholder="Duração" name="Duração" setfieldvalue={setDuration} />
               </div>
               <div className={styles.addImageContainer}>
                  <ImageUploading
                     value={images}
                     onChange={onChangeFile}
                     maxNumber={1}
                     dataURLKey="data_url"
                     multiple={false}
                     acceptType={["jpg", "png", "jpeg"]}
                  >
                     {({
                        imageList,
                        onImageUpload,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                     }) => (
                        // write your building UI
                        <div className="upload__image-wrapper">
                           {images.length == 0 && (
                              <button
                                 style={isDragging ? { color: 'red' } : undefined}
                                 onClick={onImageUpload}
                                 {...dragProps}
                              >
                                 Adicionar imagem
                              </button>
                           )}

                           &nbsp;
                           {imageList.map((image, index) => (
                              <div key={index} className="image-item">
                                 <img src={image['data_url']} alt="" width="100" />
                                 <div className="image-item__btn-wrapper">
                                    <button onClick={() => onImageUpdate(index)}>Atualizar</button>
                                    <button onClick={() => onImageRemove(index)}>Remover</button>
                                 </div>
                              </div>
                           ))}
                        </div>
                     )}

                  </ImageUploading>

               </div>
               {showWarning && (
                  <span>Selecione uma imagem</span>
               )}

               <div className={styles.buttonContainer}>
                  <Button page="/admin/app/" handleClick={handleCreate} >Criar</Button>
                  <Button page="login" handleClick={handleBack} >Voltar</Button>
               </div>

            </div>
         </div>
      </div>
   )
}
