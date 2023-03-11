import styles from "./Input.module.scss";

interface InputProps {
   placeholder: string;
   type: string;
   name: string;
   setfieldvalue?: Function;
   disabled?: string;
}

export default function Input(
   { setfieldvalue, ...props }) {

   const handleSet = (event: any) => {
      setfieldvalue(event.target.value)
   }

   return (
      <div className={styles.inputcontainer}>
         <input autoComplete="off" onChange={handleSet} type={props.type} placeholder={props.placeholder} name={props.name} {...props} />
      </div>
   )
}