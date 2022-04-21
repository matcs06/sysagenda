import styles from "./PhoneInput.module.scss";
import InputMask from "react-input-mask";

interface InputProps{
   placeholder: string;
   type: string;
   name: string;
   setfieldvalue?: Function;
   disabled?: string;
}

export default function PhoneInput(props:any){

   const handleSet = (event:any) =>{
      props.setfieldvalue(event.target.value)
   }

   return(
      <div className={styles.inputcontainer}>
          <InputMask mask="(99) 99999-9999" value={props.value} onChange={handleSet} />
      </div>
   )
}