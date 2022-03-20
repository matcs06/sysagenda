import DesignServicesIcon from '@mui/icons-material/DesignServices';
import EventIcon from '@mui/icons-material/Event';
import AddBoxIcon from '@mui/icons-material/AddBox';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import PriceChangeIcon from '@mui/icons-material/PriceChange';


import AvailabilityInquiry from '../../pages/admin/app/availabilityInquiry';
import CreateAvailability from '../../pages/admin/app/createAvailability';
import ServicesList from '../../pages/admin/app/servicesList';
import CreateService from '../../pages/admin/app/createService';
import OpenSchedules from '../../pages/admin/app/openSchedules';
import Finance from '../../pages/admin/app/finance';
import Scheduller from "../Callendar/"

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
      icon: <FindInPageIcon />,
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
      icon: <EventIcon />,
      component: <Scheduller/>
   },
   {
      title: "Ifinance",
      icon: <PriceChangeIcon />,
      component: <Finance/>
   }
]