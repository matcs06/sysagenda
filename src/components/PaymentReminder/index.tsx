import styles from "./PaymentReminder.module.scss"
import QRCode from "react-qr-code";
import { qrcodelist } from "../../utils/QRCodeCustomerList";

interface QRCodeListProps {
   code?: string;
   key?: string;
}

export default function PaymentReminder({ name, setShowReminder, isReminderForPaymentDay = true }) {
   let qrcodevalue: QRCodeListProps[] = qrcodelist.filter((item) => item.key == String(name))


   if (qrcodevalue.length == 0) {
      qrcodevalue = [{ key: name, code: "00020126580014BR.GOV.BCB.PIX01367ca53266-9419-46f7-b2d3-2e2134efc92f5204000053039865802BR5918Mateus Costa Silva6009SAO PAULO61080540900062230519Q1v6m2WwgNbpVB5b4rw6304D175" }]
   }

   return (
      <div className={styles.Remindercontainer}>
         <div className={styles.reminder}>
            {isReminderForPaymentDay ? (<h3>Olá, {name}! Hoje é seu dia de pagamento!</h3>
            ) : (<h3>Olá, {name}! Seu pagamento está pendente!</h3>)}
            <h5>Para facilitar, você pode pagar via PIX lendo código QR abaixo <b>com o APP do seu banco:</b> </h5>
            <QRCode value={qrcodevalue[0].code} size={220} />
            <div onClick={() => setShowReminder(false)} className={styles.close}>Fechar</div>
         </div>

      </div>
   )
}