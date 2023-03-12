import styles from "./servicesList.module.scss"
import Router, { useRouter, withRouter } from 'next/router'
import { useEffect, useState } from "react"
import api from "../../../api";
import { Skeleton } from '@mui/material';
import Image from "next/dist/client/image";
import { height } from "@material-ui/system";
import { BRLReais } from "../../../utils/CurrencyFmt"

interface ServiceFields {
   id: string;
   name: string;
   description: string;
   price: string;
   duration: string;
   enabled: string;
   image_url: string;
}

function ServicesList(props) {

   const testApiUrl = "http://localhost:3333/files/";
   const productionApiUrl = "https://clickeagenda.arangal.com/files";

   let userName;
   const [items, setItems] = useState<ServiceFields[]>([]);
   const [isLoading, setIsLoading] = useState(true)
   const [userId, setUserId] = useState("")
   const router = useRouter()
   const [imageUserName, setImageUserName] = useState("")

   const arrayLoop = [1, 2, 3, 4, 5, 6]

   const handleClick = (
      serviceId: string,
      serviceName: string,
      serviceDuration: string,
      servicePrice: string) => {
      Router.push({
         pathname: '/client/chooseTime',
         query: { serviceName, serviceId, serviceDuration, servicePrice, userId }
      })
   }



   useEffect(() => {
      userName = router.query.user_name;
      setImageUserName(userName)
      async function loadItems() {

         localStorage.setItem("provider", String(userName))
         const userInfo = await api.get(`users/${userName}`)
         setUserId(userInfo.data.id)
         const response = await api.get<ServiceFields[]>(`/products?user_id=${userInfo.data.id}`);

         setItems(response.data);
         setIsLoading(false)

      }
      loadItems();
      return () => {
         setItems([]);
      };
   }, [isLoading])

   const loading = () => {
      return (
         <div className={styles.container}>
            <Skeleton animation="wave" sx={{ bgcolor: '#eb99bb' }}><h3 className={styles.screenTitle}>Escolha um serviço</h3> </Skeleton>
            <div className={styles.skpanel}>
               {arrayLoop.map((cont) => (
                  <Skeleton width={320} animation="wave" sx={{ bgcolor: '#eb99bb', minHeight: "220px" }} key={cont}>
                     <div className={styles.card} >
                     </div>
                  </Skeleton>
               ))}
            </div>

         </div>
      )
   }

   if (isLoading) {
      return loading()
   } else {
      return (
         <div className={styles.container}>
            <h3 className={styles.screenTitle}>Escolha um serviço</h3>
            <div className={styles.panel}>
               {items && items.map((item) => {
                  if (String(item.enabled) == "true") {
                     return (
                        <div className={styles.card} onClick={() => handleClick(item.id, item.name, item.duration, item.price)} key={item.id}>

                           <div className={styles.imageContainer}>
                              <Image className={styles.imageFile} src={item.image_url !== null ? `${productionApiUrl}/${imageUserName}/${item.image_url}` : `/admin/${imageUserName}/clientlogo.png`}
                                 width={130}
                                 height={160}
                                 alt={"imagem"} />
                           </div>

                           <div className={styles.cardContainer}>
                              <div className={styles.topCardContainer}>
                                 <h1>{item.name}</h1>
                              </div>

                              <ul>
                                 {item.description.split(",").map((descLine) => (
                                    <li key={descLine}>
                                       {descLine}
                                    </li>
                                 ))}
                              </ul>
                              <div className={styles.cardBottom}>
                                 <h3>{item.duration.split(":")[0] === "00" ? `${item.duration.split(":")[1]} minutos` : `${item.duration} h`}</h3>
                                 <span className={styles.priceStyle}> {BRLReais.format(Number(item.price))}</span>
                              </div>
                           </div>
                        </div>
                     )
                  }
               })}
            </div>

         </div>

      )
   }

}

export default withRouter(ServicesList)