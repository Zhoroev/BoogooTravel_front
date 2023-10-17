import Image from 'next/image';
import Link from 'next/link';
// import blogImg1 from '../public/bish.png'
// import blogImg2 from '../public/isyklake.jpg'
// import blogImg3 from '../public/nomad.jpg'
import { useState, useEffect } from 'react';
import Head from 'next/head'



export const getServerSideProps = async (context) => {
    const {locale, query} = context;
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${locale }/api/v1/places/?tags__name=${query.tag || ''}`)
    const res = await req.json()
    // setTours(res.data)

    if (!res) {
        return {
            notFound: true
        }
    }
    return {
        props: { tours: res.data, messages: require(`../lang/${locale}.json`) }
    }
}


const Blog = ({tours}) => {
  


    
    
    
    const [search, setSearch] = useState('')
    const [oneDay, setOneDay] = useState('')

    const onCategoryChange = (value) => {
        console.log(`selected ${value}`);
    };

    const photoBg = '/horse.jpg'

    return (
        <>
         <Head>
            <title> Boogoo || Галерея</title>
        </Head>
        <div>
        <section>
                <img src={photoBg} alt="background photo" style={{ zIndex: '-1', width: '100%', height: '70vh', objectFit: 'cover'}} />
            </section>
            <section className=" sectionservice works">
           
            <h2 className="section_title">Articles & Tips</h2>
            <p style={{textAlign: 'center'}}>Explore some of the best tips from around the Kyrgyzstan</p> 
            
            <div className="container">
                <div className="prc card-blur">
                  
                    {
                        tours?.map( ( t, idx) => (
                            <Link key={idx} href={{ pathname: '/place',  query: { id: t.id, comment: 'asdsa'},}} className={"card price3"}>
                                <Image loader={() => t.image} src={t.image} alt="asf" width={1920} height={380} />
                                <div className="card__bg"> </div>
                                <div className="ptext1">{t.name}</div>
                                <p className="">{t.description?.slice(0,121)}</p>
                                <p className="pricetext2">Читать больше</p>
                            </Link>
                        ))
                    }
                 
                </div>
                 
            </div>
        </section> <br/><br/>
        </div>
        </>
    );
};

export default Blog;