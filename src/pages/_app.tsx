import { AppProps} from "next/app"
import "../styles/global.scss"
import { loadCldr} from '@syncfusion/ej2-base';


function MyApp({ Component, pageProps }: AppProps) {

  loadCldr(
    require('cldr-data/supplemental/numberingSystems.json'),
    require('cldr-data/main/pt/ca-gregorian.json'),
    require('cldr-data/main/pt/numbers.json'),
    require('cldr-data/main/pt/timeZoneNames.json')
    );

  return <>
     <Component {...pageProps}/>
  </> 
}

export default MyApp
