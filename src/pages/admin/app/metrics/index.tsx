import styles from "./metrics.module.scss"
import { BRLReais } from "../../../../utils/CurrencyFmt"
import { useState } from "react"
import Dropdown from "../../../../components/TextDropDown"
import { options } from "./options"
import { useQuery } from "react-query";
import api from "../../../../api";
import { addLeadingZero } from "../../../../utils"
import { Schedule } from "@mui/icons-material"

interface SchduleFields {
   id: string;
   customer_name: string;
   service: string;
   date: string;
   start_time: string;
   service_duration: string;
   phone_number: string;
   value: string;
}
export default function Metrics() {

   const [metricsSelection, setMetricsSelection] = useState("")
   const [selectedMonth, setSelectedMonth] = useState("")
   const [selectedYear, setSelectedYear] = useState("")
   const monthToNumber = addLeadingZero(options.months.indexOf(selectedMonth) + 1)
   const handleDropDownSelection = (option, id) => {

      if (id == 3) {
         setMetricsSelection(option)
      }

      if (id == 2) {
         setSelectedMonth(option)
      }

      if (id == 1) {
         setSelectedYear(option)
      }


   }

   const fetchSchedules = async () => {
      const payment_status = localStorage.getItem("payment_status")

      try {

         const user_id = localStorage.getItem("user_id");
         const response = await api.get<SchduleFields[]>(`/schedules?user_id=${user_id}`)

         return response.data
      } catch (error) {

      }

   }



   const { data: schedules = [], isLoading, isError, } = useQuery("schedules", fetchSchedules)
   const schedlesAmountByPeriod = schedules.filter((schedule, index) => schedule.date.includes(monthToNumber + "/" + selectedYear))
   const earningsByPeriod = schedlesAmountByPeriod.reduce((acc, schedlesAmountByPeriod) => acc + Number(schedlesAmountByPeriod.value), 0)
   console.log(schedlesAmountByPeriod)

   return (
      <div className={styles.container}>
         <h1>Metricas e Ganhos</h1>
         <div className={styles.selectionAndEarnings}>
            <div className={styles.yearSelctionContainer}>
               <Dropdown options={options.years} onSelect={handleDropDownSelection} id={1} />
               <div></div>
            </div>

            <div className={styles.monthSelctionContainer}>
               <Dropdown options={options.months} onSelect={handleDropDownSelection} id={2} />
               <div></div>
            </div>


            <div className={styles.earningsContainer}>
               <Dropdown options={options.earningsAndSchedules} onSelect={handleDropDownSelection} id={3} />

               {metricsSelection == "Faturamento estimado" ? (
                  <div className={styles.card}>{BRLReais.format(earningsByPeriod)}</div>
               ) : (
                  <div className={styles.card}>{schedlesAmountByPeriod.length} agendamentos</div>
               )}

            </div>


         </div>
      </div>
   )

}