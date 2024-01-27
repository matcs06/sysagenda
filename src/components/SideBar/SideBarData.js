import DesignServicesIcon from '@mui/icons-material/DesignServices';
import AddBoxIcon from '@mui/icons-material/AddBox';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LogoutIcon from '@mui/icons-material/Logout';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';

import AvailabilityInquiry from '../../pages/admin/app/availabilityInquiry';
import CreateAvailability from '../../pages/admin/app/createAvailability';
import ServicesList from '../../pages/admin/app/servicesList';
import CreateService from '../../pages/admin/app/createService';
import Finance from '../../pages/admin/app/finance';
import Scheduller from "../../pages/admin/app/Callendar"
import OpenClient from "../../pages/admin/app/openClient"
import Logout from '../../pages/admin/app/logout';
import Metrics from '../../pages/admin/app/metrics'

export const SideBarData = [
   {
      title: "Criar Serviço",
      icon: <AddBoxIcon />,
      component: <CreateService />
   },
   {
      title: "Ver Serviços",
      icon: <DesignServicesIcon />,
      component: <ServicesList />
   },
   {
      title: "Criar Horário",
      icon: <MoreTimeIcon />,
      component: <CreateAvailability />
   },
   {
      title: "Ver Horário",
      icon: <AccessTimeFilledIcon />,
      component: <AvailabilityInquiry />
   },
   {
      title: "Agendamentos",
      icon: <DateRangeIcon />,
      component: <Scheduller />
   },
   {
      title: "Financeiro",
      icon: <PriceChangeIcon />,
      component: <Finance />
   },
   {
      title: "Metricas",
      icon: <StackedBarChartIcon />,
      component: <Metrics />
   },
   {
      title: "Site do Cliente",
      icon: <AirlineSeatReclineExtraIcon />,
      component: <OpenClient />
   },
   {
      title: "Sair",
      icon: <LogoutIcon />,
      component: <Logout />
   }
]