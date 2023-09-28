import Head from 'next/head'
import Main from './main';
import icon from '../public/bugu_travel_logo1.jpg'

export function getStaticProps({locale}){
  return {
    props: {
      messages: require(`../lang/${locale}.json`)
    }
  }
}

export default function Home(props){
  return(
    <>
    <Head>
    <meta lang="en" />
        <link rel="icon" href="/favicon.ico"/>
        <meta charSet="UTF-8" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta httpEquiv="content-language" content="en" />
        <meta name="rating" content="adult" />
        <meta name="keywords" content=" бугу, бугутревел, бугу тревел, Boogoo, Boogoo Travel, buugu, bugu, тур агентство, тур агентство бишкек, бишкек туры, путешествие по Кыргызстану, кыргызстан, туры, kyrgyzstan tours, tours bishkek" />
        <meta name="description" content="Туристическое агентство 'Boogoo Travel' в Бишкеке. Туры, отдых, каникулы, отпуск" key='desc' />
        <meta property="og:title" content="Boogoo Travel Тур агентство" />
        <meta name="robot" content="index, follow" />
        <meta property="og:url" content="https://www.boogootravel.kg" />
        <meta property="og:type" content="website"/>
        <meta property="og:image" content="/bugu_travel_logo1.jpg" />
        <meta property="og:description" content="Туристическое агентство 'Boogoo Travel' в Бишкеке. Туры, отдых, каникулы, отпуск" />
        <meta property="og:image" content="/bugu_travel_logo1.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon"  href="/bugu_travel_logo1.jpg" />
        <title>Boogoo Travel</title>
    </Head>
    <main>
      <Main/>
    </main>
    </>

  )
}