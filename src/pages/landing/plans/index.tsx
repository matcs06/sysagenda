import React from 'react';

import styles from "./plans.module.scss"

const Plans = () => {
  return (
     <div className={styles.container}>
        <div className={styles.plan1}>
           <div>
              <p>Modo Padrão</p>
              <p id={styles.price}>49,99 p/mês</p>
           </div>
           <p id={styles.title1}>Obtenha acesso ao Click&Agenda 
              com as cores padrões  da aplicação: </p>

           <p id={styles.title2}>No sistema de gerenciamento você pode:</p>
           <ul>
              <li>Criar serviços</li>
              <li>Criar Horários</li>
              <li>Agendamentos</li>
              <li>Gerenciar Sistema financeiro</li>
           </ul>
           <div className={styles.button}>
              <p>Assinar</p>
           </div>
        </div>
        <div className={styles.plan1}>
           <div>
              <p>Modo Personalizado</p>
              <p id={styles.price}>79,99 p/mês</p>
           </div>
           <p id={styles.title1}>Obtenha acesso ao Click&Agenda 
com as cores personalizadas e identidade visual so seu negócio: </p>

           <p id={styles.title2}>No sistema de gerenciamento você pode:</p>
           <ul>
              <li>Criar serviços</li>
              <li>Criar Horários</li>
              <li>Agendamentos</li>
              <li>Gerenciar Sistema financeiro</li>
           </ul>
           <div className={styles.button}>
              <p>Assinar</p>
           </div>
        </div>
     </div>
  );
}

export default Plans;