import styles from "./finance.module.scss"
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useEffect, useState } from "react";
import Modal from "../../../../components/Modal"
import Input from "../../../../components/input"
import Button from "../../../../components/Button";
import PaymentsIcon from '@mui/icons-material/Payments';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreditScoreIcon from '@mui/icons-material/CreditScore';


import api from "../../../../api";

interface ITransactions {
   id: string;
   title: string;
   value: string;
   payment_status: string;
   formatedDate: string;
}

const Finance = () => {

   const [transactions, setTransactions] = useState<ITransactions[]>()
   let income = 0
   let outcome = 0
   const [rincome, setRincome] = useState(0)
   const [routcome, setRoutcome] = useState(0)

   const [showModal, setShowModal] = useState(false)
   const [isLoading, setIsLoading] = useState(true)

   const [description, setDescription] = useState("")
   const [value, setValue] = useState("")
   const [modalDate, setModalDate] = useState("")
   const [isPayed, setIsPayed] = useState("payd")

   useEffect(() => {

      async function loadItems() {
         try {
            const user_id = localStorage.getItem("user_id");
            const response = await api.get<ITransactions[]>(`transactions?user_id=${user_id}`)

            setTransactions(response.data)
            setRincome(income)
            setRoutcome(outcome)
            setIsLoading(false)


         } catch (error) {
            window.alert("Not able to load transactions")
         }

      }

      loadItems()

      return () => {
         setTransactions([]);
      };

   }, [showModal, isLoading])

   const handleCreateTransaction = async () => {
      try {
         const user_id = localStorage.getItem("user_id");
         const token = localStorage.getItem("token");

         await api.post("/transactions", {
            title: description,
            value: value,
            formatedDate: modalDate.replaceAll("-", "/"),
            user_id: user_id,
            customer_phone: "123456789"
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

   const handleDeleteTransaction = async (transactionId: string) => {

      try {
         const token = localStorage.getItem("token");
         await api.delete(`/transactions/${transactionId}`, {
            headers: { Authorization: "Bearer " + token },
         })

         setIsLoading(true)
      } catch (error) {
         window.alert("Erro ao deletar transação")
      }
   }

   const handlePayTransaction = async (transactionId: string) => {

      try {
         const token = localStorage.getItem("token");
         await api.patch(`/transactions/`, {
            id: transactionId,
            payment_status: "payd"
         }, {
            headers: { Authorization: "Bearer " + token },
         })

         setIsLoading(true)
         window.alert("Transação atualizada para pago com sucesso!!!")
      } catch (error) {
         window.alert("Erro ao mudar para pago! Faço o login e tente novamente")
      }
   }


   const goToPendentPayments = () => {
      window.location.pathname = ("/admin/app/finance/topay")
   }

   const backToMain = () => {
      window.location.pathname = ("/admin/app/")

   }

   return (
      <>
         <div className={styles.container}>
            <div className={styles.header}>
               <h2>Financeiro</h2>
               <div className={styles.arrowBackContainer} onClick={backToMain}>
                  <ArrowBackIcon />
               </div>
            </div>
            <div className={styles.infoContaiener}>
               <div className={styles.cardType}>
                  <div className={styles.topCard}>
                     <p className={styles.type}>Entradas</p>
                     <ArrowDownwardIcon sx={{ color: "#4ECB71" }} />
                  </div>

                  <p className={styles.value}>R$ {rincome}</p>

               </div>
               <div className={styles.cardType}>
                  <div className={styles.topCard}>
                     <p className={styles.type}>Saídas</p>
                     <ArrowUpwardIcon sx={{ color: "#CB4E4E" }} />
                  </div>
                  <p className={styles.value}>R$ {routcome}</p>
               </div>
               <div className={styles.cardType} id={styles["total"]}>
                  <div className={styles.topCard}>
                     <p className={styles.type}>Total</p>
                     <AttachMoneyIcon sx={{ color: "#fff" }} />
                  </div>

                  <p className={styles.value}>R$ {rincome + routcome}</p>
               </div>
            </div>
            <div className={styles.optionsContainer}>
               <div className={styles.addNewTransaction} onClick={() => { setShowModal(true) }}>
                  <AddIcon sx={{ color: "#4ECB71" }} />
                  <p>Nova Transação</p>
               </div>
               <div style={{ background: isPayed == "payd" && "#FFF", borderRadius: isPayed == "payd" && 3, padding: isPayed == "payd" && "5px" }} className={styles.finishedPayments} onClick={() => { setIsPayed("payd") }}>
                  <PaymentsIcon sx={{ color: "#4ECB71" }} />
                  <p>Pagamentos Concluídos</p>
               </div>
               <div style={{ background: isPayed == "topay" && "#FFF", borderRadius: isPayed == "topay" && 3, padding: isPayed == "topay" && "5px" }} className={styles.pendingPayments} onClick={() => { setIsPayed("topay") }}>
                  <PaymentsIcon sx={{ color: "#ca8b8b" }} />
                  <p>Pagamentos Pendentes</p>
               </div>
            </div>

            <div className={styles.infoTitle}>
               <p>Descrição</p>
               <p>Valor</p>
               <p>Data</p>
               <p>{isPayed == "payd" ? "Deletar" : "Mudar para pago"} </p>
            </div>
            <div className={styles.transactionsContainer}>

               {transactions && transactions.map((transaction) => {

                  if (transaction.payment_status == isPayed) {

                     if (Number(transaction.value) > 0) {
                        income = Number(income) + Number(transaction.value.replace(",", "."))
                     } else {
                        outcome = Number(outcome) + Number(transaction.value.replace(",", "."))
                     }

                     return (
                        <div className={styles.transactions} key={transaction.id}>
                           <p className={styles.transactionTitle}>{transaction.title}</p>
                           <p>R$ {transaction.value}</p>
                           <p>{transaction.formatedDate}</p>

                           {isPayed == "topay" ? (
                              <div className={styles.remove} onClick={() => { handlePayTransaction(transaction.id) }}>
                                 <CreditScoreIcon sx={{ color: "#CB4E4E" }} />
                              </div>
                           ) : (
                              <div className={styles.remove} onClick={() => { handleDeleteTransaction(transaction.id) }}>
                                 <RemoveCircleIcon sx={{ color: "#cc5252" }} />
                              </div>
                           )}

                        </div>
                     )
                  }

               })}

            </div>

         </div>

         {showModal &&
            <Modal modalTitle="Adicionar Transação" viewModal={setShowModal}>
               <Input type="text" placeholder="Descrição" name="description" setfieldvalue={setDescription} />
               <Input type="text" placeholder="Valor" name="value" setfieldvalue={setValue} />
               <Input type="date" placeholder="Data" name="date" setfieldvalue={setModalDate} />
               <Button handleClick={handleCreateTransaction} page="/admin/app/finance">Cadastrar</Button>
               <Button handleClick={() => { setShowModal(false) }} page="/admin/app/finance">Sair</Button>
            </Modal>}

      </>
   )
}

export default Finance;