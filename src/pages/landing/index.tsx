import styles from "./landing.module.scss"
import Image from 'next/image'
import React, { useRef } from 'react'
import Plans from "./plans"
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)   

const Landing = () => {
  const scrollPage2 = useRef(null)
  const scrollPage1 = useRef(null)
  return (
     <div className={styles.container}>
        <header className={styles.header}>
          <div  className={styles.logo}>
            <Image
               
               src="/logoshort.png"
               width={400}
               height={120}
               alt="logo-login"
            />
          </div>
           
          
           <nav className={styles.nav}>
              <ul>
                 <li onClick={() => scrollToRef(scrollPage1)}>Início</li>
                 <li>Ajuda</li>
                 <li>Sobre nós</li>
              </ul>
              <div className={styles.planos} onClick={() => scrollToRef(scrollPage2)}>
                 <p>Planos</p>
              </div>
              
              <div id={styles.socialNetwork}>
                 <InstagramIcon id={styles.icon1}/>
                 <FacebookIcon id={styles.icon1}/>
              </div>
              
           </nav>
        </header>
        <main className={styles.main}>
           <section id={styles.sc1} ref={scrollPage1} >
            <div>
               <h1>Deixe o <span id={styles.ca}>Click&Agenda</span>  agendar por você!</h1>
               
               <div className={styles.button} onClick={() => scrollToRef(scrollPage2)}>
                  <p>ASSINE AGORA!</p>
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
           <section  ref={scrollPage2} >
            <Plans/>
           </section>
         
        </main>
     </div>
  );
}

export default Landing;