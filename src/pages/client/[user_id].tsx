import { request } from "http"
import Router, {withRouter } from 'next/router'
import { useEffect } from "react"
import api from "../../api/index"

function UserRedireact(){
   let userName;
   let user_id;
   useEffect(()=>{

      userName = String(window.location.pathname).split("/")[2]
      
      async function loadUser(){
         const response = await api.get(`users/${userName}`)

         Router.push({
            pathname: '/client/startPage',
            query:{user_id: response.data.id }
        })
      }

      
      loadUser();

      

   },[])
   
   return(
      <div>
         <h1>details page</h1>
      </div>
   )
}

export default withRouter (UserRedireact)