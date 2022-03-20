import { AppProps} from "next/app"
import "../styles/global.scss"
import { loadCldr} from '@syncfusion/ej2-base';

function MyApp({ Component, pageProps }: AppProps) {

  loadCldr(
    require('cldr-data/supplemental/numberingSystems.json'),
    require('cldr-data/main/fr-CH/ca-gregorian.json'),
    require('cldr-data/main/fr-CH/numbers.json'),
    require('cldr-data/main/fr-CH/timeZoneNames.json')
    );

  return <>
     <Component {...pageProps}/>
  </> 
}

export default MyApp
