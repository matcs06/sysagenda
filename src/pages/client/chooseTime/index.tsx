import styles from "./chooseTime.module.scss"
import Router, { withRouter } from 'next/router'
import { useEffect, useState } from "react"
import api from "../../../api"
import { getDateFromString, getWeekDayName, isTodayOrTomorrow, timeFormated } from "../../../utils/index.js"
interface AvailabilityFields {
    id: string;
    date: string;
}

interface availabilityDetails {
    availability: AvailabilityFields;
    morning_available_times: []
    afternoon_available_times: []
}

function ChooseTime(props: any) {

    const [daysAvailable, setDaysAvailable] = useState<AvailabilityFields[]>([])
    const [timesAvailable, setTimesAvailable] = useState<availabilityDetails>()
    const [choosedDate, setChoosedDate] = useState("")
    const [choosedTime, setChoosedTime] = useState("")
    const [serviceName, setServiceName] = useState(props.router.query.serviceName || "Serviço escolhido")

    daysAvailable.sort(function (a, b) { return getDateFromString(a.date).getTime() - getDateFromString(b.date).getTime() });

    const onClickDay = async (id: string, dateChoosed) => {

        setChoosedDate(dateChoosed)

        try {
            const userId = props.router.query.userId;
            const response = await api.get<availabilityDetails>(`/availability/details/${id}`, {
                params: {
                    service_duration: props.router.query.serviceDuration + ":00",
                    user_id: userId
                }
            })
            setTimesAvailable(response.data)
        } catch (error) {
            window.alert("Erro ao ler horários pra esse dia")
        }

    }

    const onClickTime = async (time: string,) => {

        setChoosedTime(time)

        if (time === "X") {
            window.alert("Este horário não está disponível para agendamento")
        }
    }

    const handleClick = () => {

        const serviceDuration = props.router.query.serviceDuration;
        const serviceName = props.router.query.serviceName;
        const servicePrice = props.router.query.servicePrice;
        const userId = props.router.query.userId;

        Router.push({
            pathname: '/client/customerInfo',
            query: { serviceName, serviceDuration, servicePrice, choosedDate, choosedTime, userId }
        })
    }

    useEffect(() => {

        const userId = props.router.query.userId;

        async function loadItems() {
            const response = await api.get<AvailabilityFields[]>(`/availability?user_id=${userId}`);

            setDaysAvailable(response.data);
        }
        loadItems();
        return () => {
            setDaysAvailable([]);
        };
    }, [])

    return (
        <div className={styles.container}>
            <h2 className={styles.titleService}>{serviceName.split("-")[0]}</h2>

            <h3 className={styles.pickDayTitle}>Escolha um dia{choosedDate && `: ${choosedDate}`}</h3>
            <div className={styles.weekDays}>
                {daysAvailable && daysAvailable.map((day) => (
                    <>
                        <div key={day.id} className={styles.weekDay} onClick={() => { onClickDay(day.id, day.date) }}>
                            <p>{isTodayOrTomorrow(day.date)}</p>
                            <p>{getWeekDayName(day.date)}</p>
                        </div>
                    </>
                ))}
            </div>

            <div className={styles.pickTimeContainer}>
                <h2 className={styles.pickTimeTitle} >Escolha um horário{choosedTime && `: ${choosedTime}`}</h2>

                {timesAvailable?.morning_available_times.length > 0 && (
                    <h2>Manhã</h2>

                )}
                <div className={styles.times}>
                    {timesAvailable?.morning_available_times && timesAvailable.morning_available_times.map((time) => (
                        <div onClick={() => { onClickTime(timeFormated(time)) }} key={time} className={styles.time}>{timeFormated(time)}</div>
                    ))}
                </div>
                {timesAvailable?.afternoon_available_times.length > 0 && (
                    <h2>Tarde</h2>

                )}
                <div className={styles.times}>
                    {timesAvailable?.afternoon_available_times && timesAvailable.afternoon_available_times.map((time) => (
                        <div onClick={() => { onClickTime(timeFormated(time)) }} key={time} className={styles.time}>{timeFormated(time)}</div>
                    ))}
                </div>
            </div>

            <div className={styles.buttonContainer} onClick={handleClick}>
                <button>Continuar</button>
            </div>
        </div>
    )
}

export default withRouter(ChooseTime);