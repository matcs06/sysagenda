import React, { useEffect, useState } from 'react';
import Input from "../../../components/input/"
import PhoneInput from '../../../components/PhoneInput';
import Button from '../../../components/Button';
import styles from "./createuser.module.scss"
import api from "../../../api/index"
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const Createuser: React.FC = () => {

  const [name, setName] = useState("")
  const [userName, setUsername] = useState("")
  const [password, setPassword] = useState("") 
  const [listOfUsers, setListOfUsers] = useState([])
  const [userExists, setUserExists] = useState(false)

  const handleClick = async ()=>{
    if(userExists){
      window.alert("Erro: Nome de usuário não disponível")
    }else{

      try {
        await api.post('/users',{
          name: name,
          username: userName,
          password: password,
        })

        window.alert("Usuário criado com sucesso!! Preenche as informações adicionais para finalizar!")

      } catch (error) { 
        window.alert("Error ao criar usuário")
      }

    }

  }

  useEffect(()=>{
    setUserExists(false)

    async function loadUsers(){
      const allUsers = await api.get(`users/`)
      setListOfUsers(allUsers.data)
    
    }
    
    if(!userName){  
      loadUsers()
      console.log("chamou api")
    }else{
      listOfUsers.map((user)=>{
        if(user.username == userName){
          setUserExists(true)
        }
      })
  
    }

    
  },[userName])


  return (
     <div className={styles.container}>
        <div className={styles.createAccount1}>
          <h2>Crie sua Conta</h2>
          <Input className={styles.input} type="text" placeholder="Nome Completo" name="name" setfieldvalue={setName}/>

          <div className={styles.usernamecontainer}>
            <Input className={styles.input} type="text" placeholder="Usuário" name="username" setfieldvalue={setUsername}/>
            {
              userExists ? (
                <CloseIcon color="warning" className={styles.userAvailable}/>
              ): (<DoneIcon color="success" className={styles.userAvailable}/>)
            }
          </div>

          <Input className={styles.input} type="password" placeholder="Senha" name="senha" setfieldvalue={setPassword}/>

          <Button className={styles.button} page="/landing/createuser" handleClick={handleClick} >Continuar</Button>
       
        </div>
     </div>
  );
}

export default Createuser;