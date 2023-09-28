import { Carousel, Collapse } from 'antd'
const { Panel } = Collapse;
import clock from '../public/clock.png';
import {MdFoodBank, MdMoreTime} from 'react-icons/md'
import {GiMountainRoad} from 'react-icons/gi'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Image as NewImg} from 'antd';
import  Image  from 'next/image';
import { useRouter} from 'next/router'
import { useEffect } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import {  Modal } from 'antd';
import axios from 'axios';
import Head from 'next/head';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';



  export async function getServerSideProps(context){
    const {locale, query} = context;
    const req = await fetch(`http://127.0.0.1:8000/${locale}/api/v1/tours/${query.id}/`)
    const res = await req.json()

    

    return {
        props: {
            messages:  require(`../lang/${locale}.json`),
            pageInfo: res.data,
        }
    }
  }


const  TourPage = (props) =>{
    const {pageInfo} = props;
    const router = useRouter(),
     {id} = router.query,
     [isModalOpen, setIsModalOpen] = useState(false);
     const [visible, setVisible] = useState(false)
     const notify = (text) =>toast(text, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        className: 'toast-message',
        closeOnClick: true,
        theme:"dark",
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    // console.log(pageInfo);

     const t = useTranslations('tour')
     const [tours, setTours] = useState()
     const [tourForm, setTourForm] = useState({
       sender: '' , 
       email: '',
       phone_number: '',
       text: '',
     })

   
     useEffect(() => {
        const fetchdata = async () => {
            const req = await fetch(`http://127.0.0.1:8000/${router.locale}/api/v1/tours/?is_draft=false&limit=6&tags__name=${pageInfo?.tags[0] || ''}`)
            const res = await req.json()
            setTours(res.data.results)
        }
        fetchdata();
     },[pageInfo, router.locale])

    
     const submitHandler = async () =>{
          await axios.post('http://127.0.0.1:8000/ru/api/v1/messages/', tourForm)
        .then(res =>{
             console.log(res)
             notify('Ваша бронь отправлена👌');
             setTourForm({
                sender: '' , 
                email: '',
                phone_number: '',
                text: '',
              })
            })
        .catch(err =>{
             console.log(err)
             if (err.response.data.data.email){
                notify('Ведите точный адрес почты');
             }
            })
     }

     useEffect(() => {
        console.log(tourForm);
     },[tourForm])

     const {
        reset,
        register,
        handleSubmit,
        watch,
        formState: {errors}
     } = useForm()
    
      const handleOk = () => {
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };
    
     const bgImage = pageInfo?.image


    //   alert('l'.toUpperCase())
    return (
        <>
         <Head>
            <title> Boogoo || Туры</title>
        </Head>
        <ToastContainer
            position="bottom-left"
            closeOnClick={true}
        />
        
        <div className='tourPage'>
            <Modal centered title={pageInfo?.name} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]}>
                <form className='tours__form' onSubmit={(e) => e.preventDefault()}>
                    <div className='tours__modal_inputs'>
                    <input type="text" onChange={(e) => setTourForm({...tourForm, sender:  e.target.value}) }  placeholder='Имя'/>
                <input type="email" onChange={(e) => setTourForm({...tourForm, email: e.target.value}) } placeholder='эл. почта'/>
                <input type="text" onChange={(e) => setTourForm( {...tourForm, phone_number: e.target.value}) }  placeholder='Номер телефона'/>
                <textarea type="text" onChange={(e) => setTourForm( {...tourForm, text: e.target.value}) } placeholder='Комментарий'/>
                    </div>
                    <button className='tours__modal_button' onClick={() => submitHandler()}>Подтвердить</button>
                </form>
            </Modal>
           
             <div className="tour__slider">
                <Carousel autoPlaySpeed={8000} autoplay  dotPosition={'right'} easing  >
                    <div className='tour__banner'>
                        <Image loader={() => pageInfo?.image}  src={pageInfo?.image} fill alt="yui" style={{ objectFit:'cover'}} priority />
                    </div>
                    {
                        pageInfo?.images?.map((i, idx) => (
                            <div key={idx} className='tour__banner'>
                                <Image loader={() => i.image} src={i.image} fill alt="yui" style={{ objectFit:'cover'}} unoptimized />
                            </div>
                        ))
                    }
                 
                </Carousel>
                <NewImg preview={{ visible: false, }} style={{display: 'none', marginBottom:'-30px'}} width={200} src={pageInfo?.images}/>
                <div style={{display: 'none'}}>
                    <NewImg.PreviewGroup preview={{visible,onVisibleChange: (vis) => setVisible(vis),}} >
                    <NewImg  src={pageInfo?.image} />
                    {
                        pageInfo?.images?.map((inf, idx) =>(
                        <NewImg key={idx} style={{display: 'none'}} src={inf.image} />
                        ))
                    }
                    </NewImg.PreviewGroup>
                </div>
                    <div className="tour__position">
                        <div className="afisha">
                            <p className="text">{pageInfo?.name} </p>
                            <p id="line"></p>
                            <p className="text2">{pageInfo?.category}</p>
                            {/* <button onClick={() => setVisible(true)}  className="tour__position-btn">Смотреть фото</button> */}
                        </div>
                    </div>
            </div>
           
            <div className='container tour__text'>

                <div className='tour__info'>
                    <h1 className={'tour__info-title'}> {pageInfo?.name}</h1>
                    <div className='tour__top'> <br/>
                        <div>
                        </div>
                    </div>


                    <p className='tour__description'>
                        {pageInfo?.description}
                    </p> <br/><br/><br/>
                    <div className='tour__description-programm'>
                      <li><strong>{t("duration")} :</strong> {pageInfo?.days} {t('programs.day')}</li>
                      <li><strong>{t('category')} :</strong> {pageInfo?.category}</li>
                      {
                        pageInfo?.price &&
                        <li><strong>{t('price')} :</strong> {pageInfo?.price}$</li>
                      }
                        {
                        pageInfo?.start_date &&
                            <li><strong>{t('starts')}: </strong> 
                                {new Date(pageInfo?.start_date).toLocaleString(router.locale, { 
                                     weekday: "long", 
                                     year: "numeric",
                                      month: "long", 
                                       day: "numeric",
                                        hours:'numeric' 
                                    })}
                            </li>
                       }
                       {
                        pageInfo?.end_date &&
                        <li><strong>{t('ends')}: </strong> 
                            {new Date(pageInfo?.end_date).toLocaleString(router.locale, {  
                                // weekday: "long",
                                // year: "numeric", 
                                month: "long", 
                                day: "numeric", 
                            })}
                        </li>
                       }

        
                  </div>
                </div>

                <div className='tour__form'>
                <div className="row">
                  <div className="tour__images-column">
                  <NewImg  src={pageInfo?.image} />
                    {
                      pageInfo?.images?.map((inf, idx) =>(
                        <NewImg key={idx} src={inf.image} />
                      ))
                    }
                    <button onClick={() => setVisible(true)}  className="tour__images-btn">Смотреть фото</button>
                  </div>
                  
                </div>

                    <form className='tours__form' onSubmit={handleSubmit(submitHandler)}>
                        <div className='tours__modal_inputs'>
                        <input type="text" {...register('sender', {required:true , pattern: /^([а-яё]+|[a-z]+)$/i})}
                        value={tourForm.sender} onChange={(e) => setTourForm({...tourForm, sender:  e.target.value}) }  placeholder='Имя'/>
                        {errors?.sender?.type === 'pattern' || errors?.sender?.type === 'required'&& (
                            <p className='tours__form-error'>*  только символы алфавита</p>
                        )}

                        <input type="email" {...register('email', {required:true })}
                         value={tourForm.email} onChange={(e) => setTourForm({...tourForm, email: e.target.value}) } placeholder='эл. почта'/>
                          {errors?.email?.type === 'required'&& (
                            <p className='tours__form-error'>*  Нужно заполнить</p>
                          )}
                        <input type="text"  {...register('phone', {required:true, pattern: /^([0-9]+)$/i })}
                         value={tourForm.phone_number} onChange={(e) => setTourForm( {...tourForm, phone_number: e.target.value}) }  placeholder='Номер телефона'/>
                          {errors?.phone?.type === 'required'|| errors?.phone?.type === 'pattern' && (
                            <p className='tours__form-error'>*  Нужно заполнить номер</p>
                          )}
                        <textarea type="text"  {...register('text', {required:true })}
                         value={tourForm.text} onChange={(e) => setTourForm( {...tourForm, text: e.target.value}) } placeholder='Комментарий'/>
                          {errors?.text?.type === 'pattern' && (
                            <p className='tours__form-error'>*  Нужно заполнить</p>
                          )}
                        </div>
                        <button className='tours__modal_button' >Бронировать</button>
                    </form>
                </div>

               
            </div>  
                

                    <div className='tourPage__info'>
                        <div className='container tourPage__info-row'>
                        <Collapse defaultActiveKey={['0']}>
                            {
                                pageInfo?.programs?.map((prog, id) => (
                                    <Panel style={{minWidth:'46vw', fontWeight:'700'}} header={`${prog.day} ${t('programs.day')}`} key={id}>
                                        <div className={'tourPage__info-col'} >
                                            <h2>{pageInfo?.programs[id]?.name}</h2>
                                            <div className={'tourPage__info-wrapper'}>
                                                <div className='tourPage__info-box'>
                                                    <h4>{prog.day} {t('programs.day')}</h4>
                                                    <h4>{t('programs.place')}:</h4>
                                                    <MdMoreTime className='tourPage__info-icon'/>
                                                    <ul>
                                                        <li>{prog.accommodation}</li>
                                                    </ul>
                                                </div>
                                                {
                                                    prog?.altitude &&
                                                    <div className='tourPage__info-box'>
                                                        <h4>{t('programs.altitude')}</h4>
                                                        <p>{prog?.altitude}</p>
                                                        <GiMountainRoad className='tourPage__info-icon'/>
                                                        {}
                                                    </div>
                                                }
                                                <div className='tourPage__info-box'>
                                                    <h4>{t('programs.food')}</h4>
                                                    <p>{prog?.meal?.join(', ')}</p>
                                                    <MdFoodBank className='tourPage__info-icon'/>
                                                    {}
                                                </div>
                                            </div>
                                            <p className={'tourPage__info-descr'} style={{fontWeight: '500'}}>{prog.description}</p>
                                        </div>

                                        {
                                            prog.additionally &&
                                            <Collapse defaultActiveKey={['0']}>
                                                <Panel header="Additionally" key="Первая панель">
                                                    <p className={'tourPage__info-additional'} style={{fontWeight:'500'}}>{prog.additionally}</p>
                                                </Panel>
                                            </Collapse>
                                        }
                                        
                                    </Panel>
                                ))
                            }
                           
                        </Collapse>
                            {/* {
                                pageInfo?.programs?.map((prog, id) => (
                                    <div className={'tourPage__info-col'} key={id}>
                                        <h2>{pageInfo?.programs[id]?.name}</h2>
                                        <div className={'tourPage__info-wrapper'}>
                                            <div className='tourPage__info-box'>
                                                <h4>{prog.day} День</h4>
                                                <p>Маршрут:</p>
                                                <MdMoreTime className='tourPage__info-icon'/>
                                                <ul>
                                                    <li>{prog.accommodation}</li>
                                                </ul>
                                            </div>

                                            <div className='tourPage__info-box'>
                                                <h4>Питание</h4>
                                                <p>{pageInfo?.programs[id]?.meal?.join(', ')}</p>
                                                <MdFoodBank className='tourPage__info-icon'/>
                                                {}
                                            </div>
                                        </div>
                                        <p className={'tourPage__info-descr'}>{prog.description}</p>
                                    </div>
                                ))
                            } */}
                          
                        </div>
                    </div>



                    <br/><br/>
                <div className="container prc card-blur"> 
                
                {
                    tours?.map(t => {
                        const src = t.image
                        return pageInfo?.id !== t.id ? (
                            <Link href={{ pathname: '/tours',  query: { id: t.id, comment: 'asdsa'},
                            }} key={t?.id} className=" card">
                                <div className='card__imgBox'>
                                    <Image className='card__img' width={300} height={400} loading="lazy" loader={() => src} src={src} alt="bish"/>
                                </div>
                                <div className='card__inf'>
                                    <div className="card__bg"> </div>
                                    <h3 className="card__title">{t.name}</h3>
                                    <div className="card__bot">
                                        <span className="card__tags">
                                            {
                                                t.tags.map((str , idx)=> (
                                                    <Link href={{pathname:'/gallery', query: {tag:str}}} key={idx}><a>#</a>{str} </Link>
                                                ))
                                            }
                                        </span>
                                        <span className="card__time">
                                            <Image width={50} className="card__icon" loading="lazy" src={clock} alt="time"/>
                                            <span>{t.days} days</span>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                    ) : ''})
                }
                     
                    
    
                </div> <br/><br/><br/>
        </div>
        </>
    )
}


export default TourPage;