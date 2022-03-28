import DesignServicesIcon from '@mui/icons-material/DesignServices';
import EventIcon from '@mui/icons-material/Event';
import AddBoxIcon from '@mui/icons-material/AddBox';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LogoutIcon from '@mui/icons-material/Logout';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';

import AvailabilityInquiry from '../../pages/admin/app/availabilityInquiry';
import CreateAvailability from '../../pages/admin/app/createAvailability';
import ServicesList from '../../pages/admin/app/servicesList';
import CreateService from '../../pages/admin/app/createService';
import OpenSchedules from '../../pages/admin/app/openSchedules';
import Finance from '../../pages/admin/app/finance';
import Scheduller from "../../pages/admin/app/Callendar"
import OpenClient from "../../pages/admin/app/openClient"
import Link from "react"
import Logout from '../../pages/admin/app/logout';

export const SideBarData = [
   {
      title: "Ver Serviços",
      icon: <DesignServicesIcon />,
      component: <ServicesList/>
   },
    {
      title: "Criar Serviço",
      icon: <AddBoxIcon />,
      component: <CreateService/>
   },
     {
      title: "Ver Horário",
      icon: <AccessTimeFilledIcon />,
      component: <AvailabilityInquiry/>
   },
    {
      title: "Criar Horário",
      icon: <MoreTimeIcon />,
      component: <CreateAvailability/>
   },
   {
      title: "Agendamentos",
      icon: <EventIcon />,
      component: <OpenSchedules/>
   },
   {
      title: "Calendário",
      icon: <DateRangeIcon />,
      component: <Scheduller/>
   },
   {
      title: "Ifinance",
      icon: <PriceChangeIcon />,
      component: <Finance/>
   },
   {
      title: "Site do Cliente",
      icon: <AirlineSeatReclineExtraIcon/>,
      component: <OpenClient/>
   },
   {
      title: "Sair",
      icon: <LogoutIcon/>,
      component: <Logout/>
   }
]