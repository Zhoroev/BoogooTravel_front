import React from 'react';
import { Collapse } from 'antd';
import Head from 'next/head'


export const getServerSideProps = async ({locale}) => {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${locale}/api/v1/faq/`)
    const res = await req.json()

    if (!res) {
        return {
            notFound: true
        }
    }
    return {
        props: { faq: res.data ,  messages: require(`../lang/${locale}.json`)}
    }
}




const Faq = ({faq}) => {
    const { Panel } = Collapse;
    // console.log(faq);
  

  function onChange(key) {
        console.log(key);
    }

    return (
        <>
         <Head>
            <title> Boogoo || FAQ</title>
        </Head>
        
        <div className='faq'> 
            <div className='container'>
                <h2>FAQ</h2> <br/><br/>
                <Collapse style={{fontWeight:'500'}} defaultActiveKey={['0']} onChange={onChange}>
                    {/* <Panel header="How to book?" key="Первая панель">
                        <p>{text}</p>
                    </Panel> */}
                    {
                        faq.map((faqEl, idx) => (
                            <Panel header={faqEl?.question || 'w'} key={idx}>
                                <p >{faqEl?.answer}</p>
                            </Panel>  
                        ))
                    }
                </Collapse>
                
                    
            </div>
            
        </div> <br/><br/><br/>
        </>
    );
};

export default Faq;