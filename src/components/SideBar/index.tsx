import React from 'react';
import {SideBarData} from "./SideBarData"
import styles from "./SideBar.module.scss"
import Image from 'next/image'
import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';
import { useState, useEffect } from 'react';

interface SideBarItemProps{
   title: string;
   icon: any;
   page: string;
}

const SideBar: React.FC = ({children}) => {
  const [sideComponent, setSideComponent] = useState(children)
  const [sideBarContiner, setSideBarContainer] = useState("styles.sidebarContainer")
  const [ userName, setUsername] = useState('')
  
  useEffect(()=>{
   setUsername(localStorage.getItem("username"))
   window.addEventListener('resize', () => {
    if(window.screen.width <= 760){
       document.documentElement.style.setProperty('--sidebar-width', "0px");
       document.documentElement.style.setProperty('--display-header', "none");
    }else{
       document.documentElement.style.setProperty('--sidebar-width', "280px");
       document.documentElement.style.setProperty('--display-header', "flex");
    }
  });
  },[])


  const handleTogleClick = ()=>{
     if(sideBarContiner == "styles.sidebarContainer"){
        setSideBarContainer("styles.sideBarHidden")
        document.documentElement.style.setProperty('--sidebar-width', "0px");
        document.documentElement.style.setProperty('--display-header', "none");
     }else{
        setSideBarContainer("styles.sidebarContainer")
        document.documentElement.style.setProperty('--sidebar-width', "280px");
        document.documentElement.style.setProperty('--display-header', "flex");
     }

  }

  const OnClikOption = (component)=>{
      setSideComponent(component)
  }

  return(
     <div className={styles.screenContainer}>
     <div className={styles.toogle} onClick={handleTogleClick}>
        <FormatLineSpacingIcon/>
     </div> 
     <div className={styles.sidebarContainer}>
        <p className={styles.username}>Olá, {userName.split(" ")[0]}!</p>

        <ul>
           {SideBarData.map((value, key)=>{
           return( 
              <li key={key} onClick={()=>{OnClikOption(value.component)}}>
               {""}
               <div className={styles.icon}>{value.icon}</div>{""}
               <div className={styles.services}>
                  {value.title}
               </div>
              </li>
            )
           })}
        </ul>
        
     </div>
     <div className={styles.screenContainer}>
           {sideComponent}
     </div>
     </div>
  )
}

export default SideBar;