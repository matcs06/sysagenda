import Head from 'next/head'
import Image from 'next/image'
import Input from "../../../components/input"
import Button from "../../../components/Button"

import styles from "./signin.module.scss"
import { useState } from 'react';
import api from '../../../api'

export default function SignIn(){
   const [password, setPassword] = useState("");
   const [name, setName] = useState("");
   const [username, setUsername] = useState("");
   const [key, setKey] = useState("");
   
   const handleClick = async () =>{
   
      try {
         await api.post("/users", {
         name: name,
         username: username,
         password: password,
         key: key,
      },);

         window.alert("Usuário criado com sucesso");
         window.location.pathname = ("/admin/login")
      } catch (err) {
         
         window.alert(`Erro ao criar Usuário! Usuário já existe ou  chave incorreta`);
      }
   }

   return(
       <>
        <Head>
        <title>Criar Usuário | Antonielem studio</title>
        </Head>
       <div className={styles.imageContainer}>
          <Image
             className={styles.logo}
             src="/logologin.png"
             width={301}
             height={274}
             alt="logo-login"
          />
       </div>
       <div className={styles.cardContainer}>
          <div className={styles.loginCard}>
          <h1>Criar Usuário</h1>
          <Input type="text" placeholder="Nome" name="name" setfieldvalue={setName}/>
          <Input type="text" placeholder="Usuário" name="username" setfieldvalue={setUsername}/>
          <Input type="password" placeholder="Senha" name="senha" setfieldvalue={setPassword}/>
          <Input type="password" placeholder="Chave" name="key" setfieldvalue={setKey}/>
          <Button page="/admin/signin" handleClick={handleClick} >Criar Usuário</Button>
          <Button page="login">Voltar</Button>
          <div className={styles.space}></div>
       </div>
       </div>
      
      </>
   )
}