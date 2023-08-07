import { EventSettingsModel, Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda } from "@syncfusion/ej2-react-schedule";
import ScheduleDetail from "./ScheduleDetail";

import { useEffect, useState } from "react";
import { addTimes } from "../../../../utils/";
import api from "../../../../api"

import "../../../../utils/translation"
import PaymentReminder from "../../../../components/PaymentReminder";


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

interface UserInformation {
    name: string;
    payment_status: string;
    payment_day: string;
    enabled: string;
}

export default function Scheduller({ data }) {

    const [items, setItems] = useState<SchduleFields[]>([]);
    const [updateOnDelete, setUpdateOnDelete] = useState(false)

    const [userFullName, setUserFullName] = useState("")
    const [isReminderForPaymentDay, setIsReminderForPaymentDay] = useState(true)
    const [showReminder, setShowReminder] = useState(false)


    useEffect(() => {

        const payment_status = localStorage.getItem("payment_status")

        async function loadItems() {
            const user_id = localStorage.getItem("user_id");
            const response = await api.get<SchduleFields[]>(`/schedules?user_id=${user_id}`)

            setItems(response.data)
        }


        loadItems();


        return () => {

            setItems([]);
        }

    }, [])

    useEffect(() => {
        let payment_status = localStorage.getItem("payment_status")
        const user_name = String(localStorage.getItem("user_name"))

        setUserFullName(String(localStorage.getItem("username")))

        async function loadUserAndReminder() {
            const response = await api.get<UserInformation>(`users/${user_name}`)
            if (response.data.payment_status !== "pago") {
                payment_status = "pendente"
            } else {
                payment_status = "pago"
            }

            const formatedPaymentDay = Number(response.data.payment_day)

            //getting current day
            const today = new Date()
            const dateDay = Number(today.getDate().toString())

            const isPaymentDayToday = dateDay == formatedPaymentDay

            const showReminderFlagFirstCondition = isPaymentDayToday && payment_status == "pendente"
            const showReminderFlagSecondCondition = payment_status == "pendente"

            //Usado para definir o tipo de mensagem: lembrete do dia de pagamente o pagamento pendente
            setIsReminderForPaymentDay(showReminderFlagFirstCondition)

            //Mostrar o reminder caso seja a data de pagamento e esteja pendente
            setShowReminder(showReminderFlagFirstCondition || showReminderFlagSecondCondition)

        }

        loadUserAndReminder();

    }, [])

    const dataSource = items.map((item: SchduleFields) => {

        const SEndTime = addTimes(item.service_duration, item.start_time) + ":00"

        const [day, month, year] = item.date.split("/")

        const [shour, sminutes, ss] = item.start_time.split(":")
        const [ehours, eminutes, es] = SEndTime.split(":")


        const StartTime = new Date(Number(year), Number(month) - 1, Number(day), Number(shour), Number(sminutes))

        const EndTime = new Date(Number(year), Number(month) - 1, Number(day), Number(ehours), Number(eminutes))



        return {
            id: item.id,
            Customer: item.customer_name,
            Service: item.service,
            Subject: item.service,
            StartTime,
            EndTime,
            fStartTime: item.start_time.substring(0, 5),
            fEndTime: SEndTime.substring(0, 5),
            phone: item.phone_number,
            date: item.date,
            value: item.value
        }
    })

    const localData: EventSettingsModel = {
        dataSource
    }

    const editorWindow = (props) => {
        return <ScheduleDetail props={props} />
    }

    return (
        <>
            <ScheduleComponent eventSettings={{ dataSource: localData.dataSource }}
                editorTemplate={editorWindow}
                showQuickInfo={false}
                height='1000px'
                timeFormat="HH:mm"
                locale="pt"
                startHour="07:00am"
                workHours={{ highlight: true, start: '07:00', end: '18:00' }}
            >
                <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
            </ScheduleComponent>
            {showReminder && (
                <PaymentReminder showCloseOption={false} name={userFullName.split(" ")[0]} setShowReminder={setShowReminder} isReminderForPaymentDay={isReminderForPaymentDay} />

            )}
        </>

    )
}