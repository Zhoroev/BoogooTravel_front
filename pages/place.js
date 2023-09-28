import React from 'react';
import  Image  from 'next/image';
import { Image as NewImg} from 'antd';
import  Link  from 'next/link';
import nomad from '../public/nomad.jpg'
import { useState } from 'react';
import { Collapse } from 'antd';
const { Panel } = Collapse;
import Head from 'next/head'


export async function getServerSideProps(context){
  const {locale, query} = context;
  const req = await fetch(`http://127.0.0.1:8000/${locale}/api/v1/places/${query.id}/`)
  const res = await req.json()
  //  setPageInfo(res.data)

  

  return {
      props: {
          messages:  require(`../lang/${locale}.json`),
          pageInfo: res.data,
      }
  }
}


const Place = ({pageInfo}) => {
  const [lorem, setLorem] = useState('aist_lorem1200')
  const [gal, setGal] = useState('aist_gallery_none')
  const [visible, setVisible] = useState(false)
  const viewGallery = () => {
    setLorem('aist_lorem_none')
    setGal('aist_gallery_view')
    // console.log(lorem)
  }
  const hideGallery = () => {
    setGal('aist_gallery_none')
    setLorem('aist_lorem1200')
  }
  
   
     
  
      return (
        <>
         <Head>
            <title> Boogoo || Локации</title>
        </Head>
          <div className='place'>
            <section data-image={pageInfo?.image} style={{background: `url(${pageInfo?.image}) center/cover no-repeat`}} className='aist_back'>
              <div>
                <h1 className='aist_title'>{pageInfo?.name}</h1>
              </div>
            </section>
            <section className='aist_page_back'>
            <div className='aist_main_container'>
            <div className='aist_container'>
            <div className='aist_grid_buttons'>
              <button onClick={()=> hideGallery()} className={lorem =='aist_lorem1200' ? 'aist_grid_button active':''}>ITINERARY</button>
              <button onClick={()=> viewGallery()} className={gal =='aist_gallery_view' ? 'aist_grid_button active':''}>GALLERY</button>
          </div>
              <div className="parent">
              <div className="div1">
             <div className='asit_grid_buttons_borderLine'></div>
             <div className={lorem}>
                  <p>{pageInfo?.description}</p>
             </div>
              <div className={`${gal} place__gall`} >
                <div className="row">
                  <div className="column">
                    {
                      pageInfo?.images?.map((inf, idx) =>(
                        <NewImg key={idx} src={inf.image} />
                      ))
                    }
                  </div>
                  {/* <div className="column">
                  {
                      pageInfo?.images?.map((inf, idx) =>(
                        <NewImg key={idx} src={inf.image} />
                      ))
                    }
                  </div>
                  <div className="column">
                  {
                      pageInfo?.images?.map((inf, idx) =>(
                        <NewImg key={idx} src={inf.image} />
                      ))
                    }
                  </div>
                  <div className="column">
                  {
                      pageInfo?.images?.map((inf, idx) =>(
                        <NewImg key={idx} src={inf.image} />
                      ))
                    }
                  </div> */}
                </div>

                
                </div>

              <div  style={{position: 'relative' , width: '100%', height: '400px', margin: '22px 0', }}>
                
                  <div style={{display: 'none'}}>
                   <NewImg.PreviewGroup preview={{visible,onVisibleChange: (vis) => setVisible(vis),}} >
                    {
                      pageInfo?.images?.map((inf, idx) =>(
                        <NewImg key={idx} style={{display: 'none'}} src={inf.image} />
                      ))
                    }
                    </NewImg.PreviewGroup>
                    </div>
                <Image alt={pageInfo?.name || 'Картинка места туризма'} loader={() => pageInfo?.image} src={pageInfo?.image || nomad}
                    onClick={() => setVisible(true)} fill unoptimized='true' style={{objectFit: 'cover'}}/>
              </div>
                


                
              </div>
                    <div className="div2">
                      <h2 className='aist_div2_title'>TAGS</h2>
                      <div className='aist_div2_title_borderLine'></div>
                      <div className='aist_div2_links'>
                         {
                              pageInfo?.tags?.map((str , idx)=> (
                                <li key={idx}>
                                  <Link href={{pathname:'/allTours', query: {tag:str, search:''}}} key={idx}> #{str} </Link>
                                </li>
                              ))
                          }                   
                      </div>
                    </div>
              </div>
            </div>
          </div>
        </section>
    </div>
    </>
  );
};

export default Place;
