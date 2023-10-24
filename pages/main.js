import  Image  from 'next/image';
import { Select, Space } from 'antd';

import { Carousel } from 'antd'
import React, { useEffect, useState, useRef } from "react";
import clock from '../public/clock.png';
import main1 from '../public/main1.png'
import main2 from '../public/main2.png'
import main3 from '../public/main3.png'
import main4 from '../public/main4.png'
import {VscSearch} from 'react-icons/vsc'
import { useTranslations } from 'next-intl';
import bish from '../public/bish.png'
import nomad from '../public/nomad.jpg'
import isyklake from '../public/isyklake.jpg'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

// export const getServerSideProps = async () => {
//     const req = await fetch('https://jsonplaceholder.typicode.com/users')
//     const res = await req.json()

//     if (!res) {
//         return {
//             notFound: true
//         }
//     }
//     return {
//         props: { users: res }
//     }
// }




const  Main = () => {
    const t = useTranslations('main')
    

    
    const router = useRouter(),
     locale = router.locale;
    const [search, setSearch] = useState('')
    const [oneDay, setOneDay] = useState('')
    const [searchCategory, setSearchCategory] = useState('')

        const [tours, setTours] = useState()
        const [places, setPlaces] = useState([])
        const [categories, setCategories] = useState([])
    useEffect(()=>{
        const fetchdata = async () => {
            const req = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${locale }/api/v1/tours/?is_draft=false&is_top=true`)
            const res = await req.json()
            setTours(res.data)
        }
        fetchdata()
        const fetchCategories = async () => {
            const req = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${locale || 'ru'}/api/v1/categories/`)
            const res = await req.json()
            setCategories(res?.data)
        }
        fetchCategories()
        const fetchPlaces = async () => {
            const req = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${locale || 'ru'}/api/v1/places/?limit=3`)
            const res = await req.json()
            setPlaces(res.data.results)
        }

        fetchPlaces()
    },[locale])

    const photoBg = '/horse.jpg';

    return(
        <>
        <Head>
            <title> Boogoo || Главная страница</title>
        </Head>
        <div className="main">

        <div className='home'>
            <div className='home__banner'>
            <img src={photoBg} alt="background photo" style={{ zIndex: '-1', width: '100%' }} />
                <form onSubmit={(e) => e.preventDefault()} className='home__form' >
                    <div className={'home__form-inputs'}>
                        <Select
                        size='large'
                        dropdownMatchSelectWidth={true}
                            defaultValue={categories.length ? categories[0].name : 'category'}
                            onChange={e => setSearchCategory(e)}
                            options={categories?.map(c => (
                                {
                                    value: c.name,
                                    label: c.name
                                }
                            ))}
                            />
                        <Select
                        size='large'
                        dropdownMatchSelectWidth={true}
                            defaultValue={true}
                            // style={{width: 200}}
                            onChange={e => setOneDay(e)}
                            options={[
                                {
                                value: true,
                                label: t('searchCategoty_true'),
                                },
                                {
                                    value: false,
                                    label: t('searchCategoty_false'),
                                },
                            ]}
                            />
                    </div>
                    <input value={search} onChange={(e) => setSearch(e.target.value)} className='home__form-input' type="text" placeholder="City, place" />
                    <Link href={{pathname:'/allTours', query: {search: search, is_one_day: oneDay, category: searchCategory}}} className='home__form-btn' >{t('searchBtn')} <VscSearch/></Link>
                </form>
            </div>
        </div>
        

        <section className=" sectionservice works">
            <h2 className="section_title">{t('tours_title')}</h2>

        </section>
        <div className="container">
            
         
            <div className="prc card-blur"> 
                
            {
                tours?.map(tour => {
                    const src = tour.image
                    return (
                    <Link href={{ pathname: '/tours',  query: { id: tour.id, comment: 'asdsa'},
                    }} key={tour?.id} className=" card card__best">
                        <div className='card__imgBox'>
                            <Image className='card__img' width={300} unoptimized='true' loading="lazy" height={400} loader={() => src} unoptimizied='true' src={src} alt="bish"/>
                        </div>
                        {/* <span  className="card__icon card__geo" data-title={t.tags.join(', ')}>
                            <img className="card__icon" src={'/gps.png'}/>
                        </span> */}
                        <div className='card__inf'>
                            <div className="best">
                                <p>Best</p>
                            </div>
                            <h3 className="card__title">{tour.name}</h3>
                            {/* <p className="card__descr">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus, repellat.</p> */}
                            <div className="card__bot">
                                <span className="card__tags">
                                    {
                                        tour.tags.map((str , idx)=> (
                                            <Link href={{pathname:'/gallery', query: {tag:str}}} key={idx}> #{str} </Link>
                                        ))
                                    }
                                    
                                </span>
                                <span className="card__time">
                                    <Image width={50} className="card__icon" src={clock}  unoptimized alt="time"/>
                                    <span>{t('days')} {tour.days}</span>
                                </span>
                            </div> 
                        </div>
                </Link>
                )})
            }
             
                

            </div>
            <Link href={{pathname: '/allTours', query:{search: ''}}}>
                <button className="downprice">{t('see_tours')}</button>
            </Link>
            
        </div>

      

        <div className='home__parallax'>
            
        </div>

        <section className="sectionservice">
            <h2 className="section_title ">{t('adv_title')}</h2>
            <div className="container">
                <div className="group">
                    <div className="group1">
                        <Image width={120} height={120} className="group__img" loading="lazy"  src={main1} alt="Туризм по духу"/>
                        <p className="ptext1">{t('adv1')}</p>
                       
                    </div>


                    <div className="group2">
                        <Image width={180} height={130} className="group__img" loading="lazy" src={main2} alt="Туризм по духу"/>
                        <p className="ptext1">{t('adv2')}</p>
                      
                    </div>

                    <div className="group3">
                    <Image width={80} height={110} className="group__img" loading="lazy" src={main3} alt="Туризм по духу"/>
                        <p className="ptext1">{t('adv3')}</p>
                        
                    </div>

                    <div className="group4">
                        <Image width={80} height={110} className="group__img"  loading="lazy"src={main4} alt="Туризм по духу"/>
                        <p className="evenly">{t('adv4')}</p>
                        
                    </div>
                </div>
            </div>
        </section> <br/><br/>


        <section className=" sectionservice works">
            <h2 className="section_title">Articles & Tips</h2>
             <p style={{textAlign: 'center'}}>Explore some of the best tips from around the Kyrgyzstan</p> 
            <div className="container">
                <div className="prc card-blur">
                    {
                        places?.map( place => (
                            <Link key={place?.id} href={{ pathname: '/place',  query: { id: place.id, comment: 'asdsa'},}} className={"card price3"}>
                                <Image loader={() => place.image} src={place.image} alt="asf"  loading="lazy" unoptimized='true' width={1920} height={380} />
                                <div className="card__bg"> </div>
                                <div className="ptext1">{place.name}</div>
                                <p className="">{place.description?.slice(0,121)}</p>
                                <p className="pricetext2">{t('read_more')}</p>
                            </Link>
                        ))
                    }
    
                </div>
                <Link href={{pathname: '/gallery'}}>
                    <button className="downprice">{t('see_gallery')}</button>
                </Link>
            </div>
        </section>

      

        </div>
        </>
    )
}




 export default Main;



