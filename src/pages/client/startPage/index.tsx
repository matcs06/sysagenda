import Image from 'next/image'
import Router, { withRouter } from 'next/router'
import { useEffect } from 'react'
import styles from "./startPage.module.scss"

function StartPage (props){

    const user = {
        welcomeMessage: "Bem Vindo ao Studio Antoniellem Ramos sobrancelhas e estética, aqui oferecemos serviços completos de estética pra você. Clique em Agendar Horário para ter acesso aos serviçoes e agendar seu horário. "
    }

    const handleClick = ()=>{
        window.location.pathname = "/client/servicesList"
    }

    useEffect(()=>{
        console.log(props.router.query.user_id)
    },[])

    return (
        <div className={styles.pageContainer}>
            <div className={styles.imageContainer}>
                <Image
                    src="/logo.png"
                    width={300}
                    height={100}
                    alt="logo-login"
                />
            </div>


            <div className={styles.welcomeText}>
                <p>{user.welcomeMessage} </p>
            </div>
            <div className={styles.buttonContainer} onClick={handleClick}>
                <button>Agendar Horário</button>
            </div>
            
        </div>
    )

}

export default withRouter(StartPage)