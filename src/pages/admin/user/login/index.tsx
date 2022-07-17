import styles from "./login.module.scss"
import Head from 'next/head'
import Image from 'next/image'
import Input from "../../../../components/input"
import Button from "../../../../components/Button"
import { useState } from "react";
import instace from "../../../../api";

export default function UserLogin(){
   
   const [user, setUser] = useState("");
   const [password, setPassword] = useState("");
   
   
   const handleClick = async () =>{
      try {
         const response = await instace.post("/sessions/", {
         username: user,
         password: password,
         });

         localStorage.setItem("token_super", response.data.token);

         window.location.pathname = ("/admin/user/users")
      } catch (error) {
         window.alert("Erro ao realiza login, Tente novamente!!!");
      }
   }

   return(
      <>
        <Head>
        <title>Login | Click & Agenda</title>
        </Head>
       <div className={styles.imageContainer}>
          <Image
             className={styles.logo}
             src="/logo.png"
             width={300}
             height={100}
             alt="logo-login"
          />
       </div>
       <div className={styles.cardContainer}>
          <div className={styles.loginCard}>
          <h1>Controle de usuários</h1>
          <Input type="text" placeholder="Usuário" name="user" setfieldvalue={setUser} />
          <Input type="password" placeholder="Senha" name="password" setfieldvalue={setPassword}/>
          <Button page="/admin/user/login" handleClick={handleClick} >Entrar</Button>
          <div className={styles.spamContainer}>
            {/*  <Link href="signin">
                 <span>Ainda não tenho uma conta</span>
             </Link> */}
          </div>
       </div>
       </div>
      
      </>
   )
}