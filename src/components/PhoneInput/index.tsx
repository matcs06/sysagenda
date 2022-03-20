import { useState } from 'react';
import InputMask from 'react-input-mask';

export default function PhoneInput(props) {

  const handleSet = ({ target: { value } }) =>{
     props.onChange(value)
  }

  return (
    <InputMask 
      mask='(99) 9999 9999' 
      value={props.value} 
      onChange={handleSet}>
    </InputMask>
  )
}
