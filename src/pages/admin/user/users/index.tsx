import { useEffect, useState } from "react";
import api from "../../../../api"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Button from '../../../../components/Button';


import styles from "./users.module.scss"
interface UserInfo{
   name: string;
   username: string;
   phone: string;
   payment_status: string;
   payment_day: string;
   id: string;
}

export default function Users() {

  const [user, setUser]= useState<UserInfo[]>() 
  const [updateOnDelete, setUpdateOnDelete] = useState(false)

  useEffect(()=>{
   async function loadUsers(){

      const response  = await api.get<UserInfo[]>("/users")
      setUser(response.data)
      setUpdateOnDelete(false)
   }

   loadUsers()

   return () => {
      setUser([]);
   };
  },[updateOnDelete]) 

  const deleteUser = async (user_id:string)=>{
   try {
      const token = localStorage.getItem("token_super");
      await api.delete(`/users/${user_id}`,{
          headers: { Authorization: "Bearer " + token },
      })
      setUpdateOnDelete(true)
   } catch (error) {
      window.alert("Erro ao remover usuário!")
   }
  }

  const goToupdateUser = (username:string) =>{
    localStorage.setItem("userToUpdate", username)

    window.location.pathname = "admin/user/update"

  }

  const handleCreate = () =>{
   window.location.pathname = ("/admin/user/createuser")
 }

  return (
   <div className={styles.container}> 

      <div className={styles.topContainer}>
         <h2 className={styles.title}>Usuários do sistema</h2>
         <div className={styles.createUser} onClick={handleCreate}>Criar novo usuário</div>
      </div>
      
         {user && 
          user.map((user)=>(
            
            <div className={styles.userContainer} key={user.id}>
               
               <div className={styles.cardText}>
                  <p>{user.username}</p>
                  <p>Dia de pagamento: {user.payment_day}</p>
                  <p>Pagamento: {user.payment_status == "pago" ? "Pago" : "Pendente"}</p>
               </div>
               <div className={styles.edit} onClick={()=>{goToupdateUser(user.username)}}>
                  <EditIcon sx={{fontSize:30}}/>
               </div>
               <div className={styles.delete} onClick={()=>{deleteUser(user.id)}}>
                        <DeleteForeverIcon sx={{fontSize:30}}/>
               </div>
            </div>
          ))}

   </div>
   
  );
}

