import React, { useEffect } from 'react';
import Login from './login/index';
// import { Container } from './styles';

export default function Admin() {
  useEffect(()=>{
    window.location.pathname = ("/admin/login/")

  },[])

  return <></>
}
