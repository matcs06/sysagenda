import React from 'react';
import { SideBarData } from "./SideBarData"
import styles from "./SideBar.module.scss"
import { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

interface SideBarItemProps {
   title: string;
   icon: any;
   page: string;
}

const SideBar: React.FC = ({ children }) => {
   const [sideComponent, setSideComponent] = useState(children)
   const [sideBarContiner, setSideBarContainer] = useState("styles.sidebarContainer")
   const [userFullName, setUserFullname] = useState("User Welcome")
   const [selectedService, setSelectedService] = useState("")


   useEffect(() => {
      if (!localStorage.getItem("username")) {
         window.location.pathname = ("/admin/login/")
      }
      setUserFullname(localStorage.getItem("username"))
      window.addEventListener('resize', () => {
         if (window.screen.width <= 760) {
            document.documentElement.style.setProperty('--sidebar-width', "50px");
            document.documentElement.style.setProperty('--display-header', "none");
            document.documentElement.style.setProperty('--display-title', "none")
         } else {
            document.documentElement.style.setProperty('--sidebar-width', "280px");
            document.documentElement.style.setProperty('--display-header', "flex");
            document.documentElement.style.setProperty('--display-title', "flex")
         }
      });
   }, [])


   const handleTogleClick = () => {
      if (sideBarContiner == "styles.sidebarContainer") {
         setSideBarContainer("styles.sideBarHidden")
         document.documentElement.style.setProperty('--sidebar-width', "50px");
         document.documentElement.style.setProperty('--display-header', "none");
         document.documentElement.style.setProperty('--togleRotateDeg', "90deg");
         document.documentElement.style.setProperty('--display-title', "none")
      } else {
         setSideBarContainer("styles.sidebarContainer")
         document.documentElement.style.setProperty('--sidebar-width', "280px");
         document.documentElement.style.setProperty('--display-header', "flex");
         document.documentElement.style.setProperty('--togleRotateDeg', "0deg")
         document.documentElement.style.setProperty('--display-title', "flex")

      }

   }

   const OnClikOption = (component, serviceTitle) => {
      ChangeBackGround(serviceTitle)
      setSideComponent(component)
   }

   const ChangeBackGround = (title: string) => {
      setSelectedService(title)
   }
   return (
      <div className={styles.screenContainer}>

         <div className={styles.sidebarContainer}>
            <div className={styles.sideBarHeader}>
               <p className={styles.username}>Olá, {userFullName.split(" ")[0]}!</p>
               <div className={styles.toogle} onClick={handleTogleClick}>
                  <MenuIcon />
               </div>
            </div>
            <ul>
               {SideBarData.map((value, key) => {
                  var serviceBackGround = value.title == selectedService ? "#2d2c2d" : ""
                  return (
                     <li key={key} onClick={() => { OnClikOption(value.component, value.title) }} style={{ background: serviceBackGround }}>
                        {""}
                        <div className={styles.icon}>{value.icon}</div>{""}
                        {selectedService == value.title ? (
                           <div className={styles.services}  >
                              {value.title}
                           </div>
                        ) : (
                           <div className={styles.services} >
                              {value.title}
                           </div>
                        )}

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