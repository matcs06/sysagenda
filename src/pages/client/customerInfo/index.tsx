import Router, { withRouter } from "next/router"
import { useEffect, useState } from "react"
import api from "../../../api"
import Input from "../../../components/input"
import styles from "./customerInfo.module.scss"

function CustomerInfo(props:any){

    const [customerName, setCustomerName] = useState("")
    const [customerNumber, setCustomerNumber] = useState("")

    const handleClick = async()=>{

        const serviceDuration = props.router.query.serviceDuration;
        const choosedDate = props.router.query.choosedDate;
        const choosedTime = props.router.query.choosedTime;
        const serviceName = props.router.query.serviceName;
        let newServiceDuration: string;
        let newChoosedTime: string;
        if(serviceDuration.split(":").length != 3){
            newServiceDuration = serviceDuration + ":00"
        }else{
            newServiceDuration = serviceDuration
        }

        if(choosedTime.split(":").length != 3){
            newChoosedTime = choosedTime + ":00"
        }else{
            newChoosedTime = choosedTime
        }

        let isMorning = newChoosedTime < '12:00:00' ? true : false

        try {

            if(!customerName){
                throw new Error("Informe o seu nome para finalizar o agendamento")
            }

            if(!customerNumber || customerNumber.length < 8){
                throw new Error("Informe um número de telefone válido com o DD: EX: 98 991414243")
            }

            await api.post('/schedules',{
                customer_name: customerName,
                service: serviceName,
                date: choosedDate,
                start_time: newChoosedTime,
                service_duration: newServiceDuration,
                phone_number: customerNumber,
                isMorning: Boolean(isMorning)
            })

            Router.push({
                pathname: '/client/finalScreen',
                query:{valor:props.router.query.servicePrice, serviceName, serviceTime: choosedTime, customerName }
            })

        } catch (error) {
            if(error.message.indexOf("Informe") > -1){
                window.alert(error)
            }else{
                window.alert("Erro ao criar agendamento, tente novamente e confirme se já não existe um agendamento feito para esse horário!")
            }
        }
      
    }

    return(
       <div className={styles.container}>
           <div>
               <h2 className={styles.screenTitle}>Informações</h2>
           </div>
           <div className={styles.inputContainer}>
               <Input type="text" placeholder="Nome Completo"  name="name" setFieldValue={setCustomerName} autocomplete="off" />
               <Input type="text" placeholder="Número de telegone (WhatsApp)"  name="number" autocomplete="off" setFieldValue={setCustomerNumber} />
               <span>Insira o DD antes do número, Ex: 98991443355</span>
           </div>

           <div className={styles.paymentInfo}>
               <h2  className={styles.value}>Valor: {props.router.query.servicePrice} R$ </h2>
               <h2  className={styles.payment}>Pagamento é feito no momento do serviço</h2>
           </div>

           <div className={styles.buttonContainer} onClick={handleClick}>
                <button>Agendar</button>
            </div>
       </div>    
    )


}

export default withRouter(CustomerInfo);