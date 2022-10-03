import styles from "./landing.module.scss"
import Image from 'next/image'
import React, { useRef } from 'react'
import Plans from "./plans"
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)   

const Landing = () => {


  
  const wantKnow = ()=>{

    const phone = "+5511959842539"

    let messageContent = `Olá, tenho interesse no Sistema de agendamentos e gostaria de saber mais sobre!`

    messageContent = window.encodeURIComponent(messageContent);

    let apiURL = `https://api.whatsapp.com/send?phone=${phone}&text=${messageContent}`;
      
    window.open(apiURL);
  } 

  const openInstaPage = () =>{
      const instaUrl = "https://www.instagram.com/clickeagenda/"
      window.open(instaUrl)

  }

 
  return (
     <div className={styles.container}>
        <header className={styles.header}>
          <div  className={styles.logo}>
            <Image
               
               src="/logoshort.png"
               width={600}
               height={220}
               alt="logo-login"
            />
          </div>
           
          
           <nav className={styles.nav}>
              <ul>
                 <li>Início</li>
                 <li>Ajuda</li>
                 <li>Sobre</li>
              </ul>
            
              <div id={styles.socialNetwork}>
                 <InstagramIcon id={styles.icon1} onClick={openInstaPage}/>
                 <FacebookIcon id={styles.icon1}/>
              </div>
              
           </nav>
        </header>
        <main className={styles.main}>
           <section id={styles.sc1} >
            <div>
               <h1>Deixe o <span id={styles.ca}>Click&Agenda</span>  agendar por você!</h1>
               
               <div className={styles.button} onClick={wantKnow}>
                  <p>SAIBA MAIS!</p>
                  <span>Apartir de 49,99 p/mês</span>
               </div>
            </div>
            <Image
               src="/agendamento-online-de-consulta.png"
               width={443}
               height={441}
               alt="imagem-ilustrativa"
            /> 
           </section>
        </main>
     </div>
  );
}

export default Landing;