import { EventSettingsModel,Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda } from "@syncfusion/ej2-react-schedule";
import ScheduleDetail from "./ScheduleDetail";

import {L10n} from "@syncfusion/ej2-base"
import { useEffect, useState } from "react";
import { addTimes } from "../../utils";
import api from "../../api"

L10n.load({
    'en-US':{
        'schedule':{
            'saveButton': 'Salvar',
            'cancelButton': 'Fechar',
            'deleteButton': 'Remover',
            'newEvent': 'Detalhes do agendamento'
        }
    }
})

interface SchduleFields{
    id:string;
    customer_name:string;
    service:string;
    date:string;
    start_time:string;
    service_duration:string;
    phone_number:string;
    value: string;
 }
 

export default function Scheduller({data}){

    const [items, setItems] = useState<SchduleFields[]>([]);
 
    useEffect(()=>{
 
       async function loadItems(){
          const response = await api.get<SchduleFields[]>("/schedules")
 
          setItems(response.data)
 
       }
       loadItems();
 
       return()=>{
 
          setItems([]);
       }
 
    },[])

    const dataSource = items.map((item)=>{
        
        const SEndTime = addTimes(item.service_duration, item.start_time) + ":00"

        const [day, month, year] = item.date.split("/")

        const [shour, sminutes, ss] = item.start_time.split(":") 
        const [ehours, eminutes, es ] = SEndTime.split(":")


        const StartTime = new Date(Number(year), Number(month)-1, Number(day), Number(shour), Number(sminutes) )

        const EndTime = new Date(Number(year), Number(month)-1, Number(day), Number(ehours), Number(eminutes) )



        return {
            id: item.id,
            Cliente: item.customer_name,
            Service:item.service,
            Subject: item.service,
            StartTime,
            EndTime,
            fStartTime: item.start_time,
            fEndTime: SEndTime,
            Status: "Aberto",
            phone: item.phone_number,
            date: item.date,
            value: item.value
        }
    })

    const localData: EventSettingsModel = {

        dataSource
    }

    const eventTemplate = (props)=>{
      
    }

    const editorWindow = (props: any) =>{
        return <ScheduleDetail props={props}/>
    }
    
    return(
        <ScheduleComponent eventSettings={{dataSource: localData.dataSource}  } 
            editorTemplate={editorWindow}
            showQuickInfo={false} 
            >
            <Inject services={[Day, Week, WorkWeek, Month, Agenda] }/>
        </ScheduleComponent>
    )
}