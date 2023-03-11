import Image from 'next/image'
import Router, { withRouter, useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from "./startPage.module.scss"
import api from "../../../api"

function StartPage(props) {
    const router = useRouter()

    const [wecomeText, setWelcomeText] = useState("")

    const handleClick = () => {
        const userName = router.query.userName;
        localStorage.setItem("user_name", String(router.query.userName));
        router.push({
            pathname: `/client/servicesList`,
            query: { user_name: userName }
        })
    }

    useEffect(() => {
        const userName = router.query.userName;

        async function loadUserInfo() {
            const response = await api.get(`users/${userName}`)

            setWelcomeText(response.data.welcome_message)
        }

        loadUserInfo()


    }, [wecomeText, router.query.userName])

    return (
        <div className={styles.pageContainer}>
            <div className={styles.imageContainer}>
                <Image
                    src="/admin/logo.png"
                    width={276}
                    height={85}
                    alt="logo-login"
                />
            </div>


            <div className={styles.welcomeContainer}>
                <p>{wecomeText}</p>
                <Image
                    className={styles.adminImage}
                    src="/admin/admin_image.png"
                    width={192}
                    height={415}
                    alt="logo-login"
                />
            </div>
            <div className={styles.agendar}>
                <p>Clique em Agendar Horário para ter acesso aos serviçoes e agendar seu horário.

                </p>
            </div>
            <div className={styles.buttonContainer} onClick={handleClick}>
                <button>Agendar Horário</button>
            </div>

        </div>
    )

}

export default withRouter(StartPage)