import React, { useState } from 'react';
import styles from "./TextDropDown.module.scss"
const Dropdown = ({ options, onSelect, id = 3 }) => {
   const [selectedOption, setSelectedOption] = useState('');

   const handleOptionChange = (event) => {
      const selectedValue = event.target.value;
      setSelectedOption(selectedValue);
      onSelect(selectedValue, id);
   };

   return (
      <div >
         <select
            id="dropdown"
            value={selectedOption}
            onChange={handleOptionChange}
            className={styles.optionContainer}
         >
            <option value="" disabled>
               {id == 3 && (
                  "Escolha uma opcao"
               )}
               {id == 2 && (
                  "Escolha o mês"
               )}
               {id == 1 && (
                  "Escolha o ano"
               )}
            </option>
            {options.map((option, index) => (
               <option key={index} value={option} >
                  {option}
               </option>
            ))}
         </select>
      </div>
   );
};

export default Dropdown;
