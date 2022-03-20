import React from 'react';
import SideBar from '../../../components/SideBar';
import ServicesList from './servicesList';
// import { Container } from './styles';

const App: React.FC = () => {
  return (
     <>
        <SideBar >
           <ServicesList/>
        </SideBar>
     </>
  )
}

export default App;