import { NextIntlProvider } from 'next-intl'
import { appWithTranslation, AppWithTranslation } from 'next-i18next'
import Layout from '../components/layout'
import '../styles/globals.scss'
import { useRouter } from 'next/router'
import Header from '../components/header'
import Footer from '../components/footer'




function App({ Component, pageProps }) {
  
  
  return (
    <NextIntlProvider messages={pageProps.messages}>
      {/* <Layout> */}
      <Header/>
        <Component {...pageProps} />
        <Footer/>

      {/* </Layout> */}
    </NextIntlProvider>
  )
}

export default appWithTranslation(App)
 