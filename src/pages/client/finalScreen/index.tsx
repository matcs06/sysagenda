import Router, {withRouter } from 'next/router'
import CheckIcon from '@mui/icons-material/Check';
import { fontSize } from "@mui/system";
import Button from '../../../components/Button';
import styles from "./finalScreen.module.scss"
import { timeFormated } from "../../../utils/index.js";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

function FinalScreen(props:any){
    

    const handleWhatsAppClick = ()=>{
        const customerName = props.router.query.customerName
        const phone = "+559891437241"
        const messageContent = `Olá meu nome é ${customerName}, fiz um agendamento com vocês, pode confirmar no sistema?`
        const apiURL = `https://api.whatsapp.com/send?phone=${phone}&text=${messageContent}`;

        window.open(apiURL)
    }

    const handleClick = ()=>{
        Router.push({
            pathname: '/client/startPage'
        })      
    }

    return(
        <div className={styles.container}>
            <h2 className={styles.congrats}>Parabéns!!!</h2>
            <CheckIcon sx={{fontSize:100}}/>
            <div className={styles.text}>
                <h2>Seu agendamento do serviço <strong>{props.router.query.serviceName}</strong>  às <strong>{timeFormated(props.router.query.serviceTime)} horas</strong> foi realizado com sucesso.</h2>
            </div>

            <div className={styles.text}>
                <p>Esse é nosso endereço: <br />
                  <strong> Rua Santa Inês - VIla Silva (Ninho do Rato)</strong><br /> 
                </p>
                <p>Caso necessário, entraremos em contato pelo WhatsApp para mais 
                   informações sobre o endereço. <br />
                </p>
                <div> 
                    <p>Caso não receba nenhum contato em algumas horas, entre em contato pelo nosso WhatsApp: </p> 
                    <div onClick={handleWhatsAppClick} className={styles.whatsAppIcon}><WhatsAppIcon/></div>
                </div>
                 <p>O pagamento é feito depois serviço</p>
            </div>

            <div className={styles.buttonContainer} onClick={handleClick}>
                <button>Voltar ao início</button>
            </div>
        </div>
    )

}

export default withRouter(FinalScreen)