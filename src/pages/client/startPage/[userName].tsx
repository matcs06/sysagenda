import Image from 'next/image'
import Router, { withRouter, useRouter } from 'next/router'
import { useEffect } from 'react'
import styles from "./startPage.module.scss"

function StartPage (props){
    const router = useRouter()
    const user = {
        welcomeMessage: "Bem Vindo ao Studio Antoniellem Ramos sobrancelhas e estética, aqui oferecemos serviços completos de estética pra você."
    }

    const handleClick = ()=>{
        const userName = router.query.userName;
        localStorage.setItem("user_name", String(router.query.userName));
        router.push({
            pathname: `/client/servicesList`,
            query:{user_name: userName}
        })
    }

    useEffect(()=>{
       const userName = router.query.userName;
       console.log(userName)

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
                <p>{user.welcomeMessage} <br />
                Clique em Agendar Horário para ter acesso aos serviçoes e agendar seu horário. </p>
            </div>
            <div className={styles.buttonContainer} onClick={handleClick}>
                <button>Agendar Horário</button>
            </div>
            
        </div>
    )

}

export default withRouter(StartPage)