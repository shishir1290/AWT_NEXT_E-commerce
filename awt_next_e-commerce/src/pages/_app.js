import '@/styles/globals.css'
import {AuthProvider, MyProvider} from '../utils/authcontext';

import Layout from "@/layout/layout";

export default function App({ Component, pageProps }) {
  return(
    <AuthProvider>
    <Layout>
      <div >
        <Component {...pageProps} />
      </div>
      
    </Layout>
    </AuthProvider>
  )
   
}
