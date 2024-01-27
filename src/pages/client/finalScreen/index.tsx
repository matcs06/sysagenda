import Router, { withRouter, useRouter } from 'next/router'
import CheckIcon from '@mui/icons-material/Check';
import styles from "./finalScreen.module.scss"
import { timeFormated } from "../../../utils/index.js";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useEffect, useState } from 'react';
import api from '../../../api';
import { removeNonNumbers } from "../../../utils"

function FinalScreen(props: any) {
    const newrouter = useRouter()

    const [address, setAddress] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [serviceName, setServiceName] = useState(props.router.query.serviceName || "Serviço escolhido")

    useEffect(() => {
        const userName = localStorage.getItem("provider")

        async function loadUserInfo() {
            const response = await api.get(`users/${userName}`)

            setAddress(response.data.address)
            setPhoneNumber(response.data.phone)

        }

        loadUserInfo()

    }, [])

    const handleWhatsAppClick = () => {
        const customerName = props.router.query.customerName
        const phone = "+55" + removeNonNumbers(phoneNumber)
        const messageContent = `Olá meu nome é ${customerName}, fiz um agendamento com vocês, pode confirmar no sistema?`
        const apiURL = `https://api.whatsapp.com/send?phone=${phone}&text=${messageContent}`;

        window.open(apiURL)
    }

    const handleClick = () => {
        const userName = localStorage.getItem("user_name")
        Router.push({
            pathname: `/client/startPage/${userName}`
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.congratsContainer}>
                <h2 className={styles.congrats}>Parabéns!!!</h2>
                <CheckIcon sx={{ color: "#f48ab6", fontSize: 35 }} />
            </div>
            <div className={styles.text}>
                <h2>Seu agendamento do serviço <strong>{serviceName.split("-")[0]}</strong>  às <strong>{timeFormated(props.router.query.serviceTime)} horas</strong> foi realizado com sucesso.</h2>
            </div>

            <div className={styles.text2}>
                <p>Esse é nosso endereço: <br />
                    <strong> {address}</strong><br />
                </p>
                <p>Caso não receba nenhum contato em algumas horas, entre em contato pelo nosso WhatsApp: </p>
                <div onClick={handleWhatsAppClick} className={styles.whatsAppIcon}><WhatsAppIcon sx={{ fontSize: 35 }} /></div>
            </div>
            <p className={styles.paymentAlert}>O pagamento é feito depois serviço</p>


            <div className={styles.buttonContainer} onClick={handleClick}>
                <button>Voltar ao início</button>
            </div>
        </div>
    )

}

export default withRouter(FinalScreen)