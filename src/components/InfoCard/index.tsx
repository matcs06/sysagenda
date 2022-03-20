import styles from "./infoCard.module.scss"

const InfoCard = ({color, message})=>{

   let containerStyle = {
      flexDirection: "column",
      background:color, 
      width: "36%",
      color: "#dee0e4",
      height: "75px",
      fontFamily: "Roboto",
   }

   let line = {
      position: "absolute",
      background:"#000", 
      width: "100%",
      height: "10px",
      fontFamily: "Roboto",
      bottom: 0
   }

   return(
     <div className={styles.cardContainer} style={containerStyle}>
        {message}
        <div style={line}></div>
     </div>
   )

}

export default InfoCard