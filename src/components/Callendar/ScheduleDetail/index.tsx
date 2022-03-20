import React from 'react';
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import styles from "./scheduleDetail.module.scss"
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const ScheduleDetail= ({props}) => {

   const onWhatsAppClick = (phone: string, serviceName:string, serviceDate:string, serviceTime:string)=>{

      
      phone = "+55"+phone.replace(" ","")
      const newTime = serviceTime.split(":")

      const formatedTime = newTime[0] + ":" + newTime[1]      

      let messageContent = `Studio Antonielem Ramos:\nOlá, gostaríamos de confimar o seu agendamento para:\nServiço: *${serviceName}*\nDia: *${serviceDate}*\nHorário: *${formatedTime} hrs*\nconfirma?`

      messageContent = window.encodeURIComponent(messageContent);

      let apiURL = `https://api.whatsapp.com/send?phone=${phone}&text=${messageContent}`;
      
      window.open(apiURL);
  }

  return (
     <div>
         <table className="custom-event-editor">
          <tbody>
              <tr>
                <td className="e-textlabel">Cliente: </td>
                <td><p>{props.Cliente}</p></td>
              </tr>
              <tr>
                <td className="e-textlabel">Serviço: </td>
                <td><p>{props.Service}</p></td>
              </tr>
           {/*    <tr>
                  <td className="e-textlabel">Status</td>
                  <td>
                      <DropDownListComponent id="EventType" dataSource={["Aberto", "Concluído", "Cancelado"]}
                      placeholder="Selecione um status" data-name="Status" value={props.Status || null}>

                      </DropDownListComponent>
                  </td>
              </tr> */}
              <tr className="e-textlabel">
                  <td>
                      Início:   
                  </td>
                  <p>{String(props.fStartTime)}</p>
              </tr>
              <tr className="e-textlabel">
                  <td>
                      Fim:     
                  </td>
                  <p>{String(props.fEndTime)}</p>
              </tr>
              <div>
                 <p>Preço: {props.value} R$</p>
              </div>
              <div>
                 <p>Contato: {props.phone} </p>
                 <div onClick={()=>{onWhatsAppClick(props.phone, props.Service, props.date, props.fStartTime)}} className={styles.whatsappContainer}><WhatsAppIcon/></div>
              </div>
            
          </tbody>
      </table>
     </div>
     
  )
}

export default ScheduleDetail;