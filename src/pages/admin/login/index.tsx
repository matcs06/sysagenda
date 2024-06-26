import styles from "./login.module.scss"
import Head from 'next/head'
import Image from 'next/image'
import Input from "../../../components/input"
import Button from "../../../components/Button"
import { useState } from "react";
import instace from "../../../api";


export default function Login() {

   const [user, setUser] = useState("");
   const [password, setPassword] = useState("");

   const handleClick = async () => {
      try {
         const response = await instace.post("/sessions/", {
            username: user,
            password: password,
         });

         localStorage.setItem("token", response.data.token);
         localStorage.setItem("username", response.data.user.name);
         localStorage.setItem("user_name", response.data.user.username);
         localStorage.setItem("user_id", response.data.user.user_id);
         localStorage.setItem("business_name", response.data.user.
            business_name);


         window.location.pathname = ("/admin/app/")
      } catch (error) {
         window.alert("Erro ao realiza login, Tente novamente!!!");
      }
   }

   return (
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
               <h1>Fazer Login</h1>
               <form action="" style={{ width: "100%" }}>
                  <Input type="text" placeholder="Usuário" name="user" setfieldvalue={setUser} />
                  <Input type="password" placeholder="Senha" name="password" setfieldvalue={setPassword} />
                  <Button page="/admin/login" handleClick={handleClick} >Entrar</Button>
               </form>

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