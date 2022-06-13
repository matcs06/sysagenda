import styles from "./topay.module.scss"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useEffect, useState } from "react";
import Modal from "../../../../../components/Modal"
import Input from "../../../../../components/input"
import Button from "../../../../../components/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreditScoreIcon from '@mui/icons-material/CreditScore';

import api from "../../../../../api";

interface ITransactions{
   id:string;
   title:string;
   value:string;
   payment_status: string;
   formatedDate: string;
}

const Finance = () => {

  const [transactions, setTransactions] = useState<ITransactions[]>()
  let income=0
  const [rincome, setRincome] = useState(0)

  const [showModal, setShowModal] = useState(false)
  const [ isLoading, setIsLoading]= useState(true)

  const [description,setDescription] = useState("")
  const [value,setValue] = useState("")
  const [modalDate,setModalDate] = useState("")

  useEffect(()=>{

     async function loadItems(){
        try {
          const user_id = localStorage.getItem("user_id");          
          const response = await api.get<ITransactions[]>(`transactions?user_id=${user_id}`)

          setTransactions(response.data)
          setRincome(income)
          setIsLoading(false)
          

        } catch (error) {
           window.alert("Not able to load transactions")
        }
      
     }
     
     loadItems()

     return () => {
        setTransactions([]);
     };
  
  },[showModal, isLoading])

  const handleCreateTransaction = async () => {
      try {
         const user_id = localStorage.getItem("user_id"); 
         const token = localStorage.getItem("token"); 

         await api.post("/transactions", {
            title: description ,
            value: value,
            formatedDate: modalDate.replaceAll("-", "/"),
            payment_status: "topay",
            user_id: user_id,
            }, {
               headers: {
               Authorization: "Bearer " + token,
            },
         });

         window.alert("Transação criada com sucesso")
         setShowModal(false)
         setIsLoading(true)

      } catch (error) {
         window.alert("Erro ao criar transação")
      }
 
  }

  const handleDeleteTransaction = async (transactionId:string) =>{

   try {
      const token = localStorage.getItem("token");
      await api.patch(`/transactions/`,{
         id: transactionId,
	      payment_status:"payd"
      },{
          headers: { Authorization: "Bearer " + token },
      })

      setIsLoading(true)
      window.alert("Transação atualizada para pago com sucesso!!!")
   } catch (error) {
      window.alert("Erro ao mudar para pago! Faço o login e tente novamente")
   }
  }

  const backToFinance = () =>{
   window.location.pathname = ("/admin/app/finance")

  }

  return (
     <>
     <div className={styles.container}>
        <div className={styles.header}>
           <h2>Pagamentos Pendentes</h2>
           <div className={styles.arrowBackContainer} onClick={backToFinance}>
               <ArrowBackIcon/>
           </div>
        </div>
        
        <div className={styles.infoContaiener}>

           <div className={styles.cardType} id={styles["total"]}>
              <div className={styles.topCard}>
                 <p className={styles.type}>Total</p>
                 <AttachMoneyIcon sx={{ color: "#fff" }}/>
              </div>
              
              <p className={styles.value}>R$ {rincome}</p>
           </div>
        </div>
        <div className={styles.optionsContainer}>
            <div className={styles.addNewTransaction} onClick={()=>{setShowModal(true)}}>
               <AddIcon sx={{ color: "#4ECB71" }}/>
               <p>Nova Transação</p>
            </div>
        </div>

        <div className={styles.infoTitle}>
           <p>Descrição</p>
           <p>Valor</p>
           <p>Data</p>
           <p>Mudar para pago</p>
        </div>
        <div className={styles.transactionsContainer}>
       
            {transactions && transactions.map((transaction)=>{
              
              if(transaction.payment_status =="topay"){

                 if(Number(transaction.value) > 0 ){
                  income = Number(income) + Number(transaction.value.replace(",","."))
                 }

                 return (
                  <div className={styles.transactions} key={transaction.id}>
                     <p className={styles.transactionTitle}>{transaction.title}</p>
                     <p>{transaction.value} R$</p>
                     <p>{transaction.formatedDate}</p>
                     <div className={styles.remove} onClick={()=>{handleDeleteTransaction(transaction.id)}}>
                        <CreditScoreIcon sx={{ color: "#CB4E4E" }}/>
                     </div>
                  </div>
                 )
              }      

           })} 

        </div>
        
     </div>

        {showModal && 
        <Modal modalTitle="Adicionar Transação" viewModal={setShowModal}>
           <Input type="text" placeholder="Descrição" name="description" setfieldvalue={setDescription}/>
           <Input type="text" placeholder="Valor" name="value" setfieldvalue={setValue}/>
           <Input type="date" placeholder="Data" name="date" setfieldvalue={setModalDate}/>
           <Button handleClick={handleCreateTransaction} page="/admin/app/finance/topay">Cadastrar</Button>
           <Button handleClick={()=>{setShowModal(false)}} page="/admin/app/finance/topay">Sair</Button>
        </Modal>}

     </>
  )
}

export default Finance;