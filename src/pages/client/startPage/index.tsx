import Image from 'next/image'
import styles from "./startPage.module.scss"

export default function StartPage (){

    const handleClick = ()=>{
        window.location.pathname = "/client/servicesList"
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.imageContainer}>
                <Image
                    src="/logologin.png"
                    width={266}
                    height={234}
                    alt="logo-login"
                />
            </div>


            <div className={styles.welcomeText}>
                <p>Bem Vindo ao Studio Antoniellem Ramos sobrancelhas e estética,
                 aqui oferecemos serviços completos de estética pra você. 
                 Clique em <strong>Agendar Horário</strong> para ter acesso aos serviçoes e agendar seu horário. </p>
            </div>

            <div className={styles.servicesName}>
              <div className={styles.line}/>
                <p className={styles.services} >Design Natural * Design com henna * Depilação</p>
                <p className={styles.services}>Limpeza de Pele * Micropigmentação * Hidralips</p>
              <div className={styles.line}/>
            </div>

            <div className={styles.buttonContainer} onClick={handleClick}>
                <button>Agendar Horário</button>
            </div>
            
        </div>
    )

}