import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/Assets'
import { Context } from '../../context/Context'
const Main = () => {


    const {onSent,recentPrompt,showresult,loading,resultdata,setinput,input}=useContext(Context)






  return (
   <div className="main">
    <div className="nav">
         <p>Gemini</p>
         <img src={assets.user_icon} alt="" />

    </div>

    <div className="main-container">
      {!showresult 
      ?<>
       <div className="greet">
        <p><span>Hello,Ohm</span></p>
        <p>How can i help you, Today?</p>
      </div>
      <div className="cards">
        <div className="card">
          <p>Suggest beautiful places to see on an upcoming road trip.</p>
          <img src={assets.compass_icon} alt="" />
        </div>

        <div className="card">
          <p>Simply summarize this concept.</p>
          <img src={assets.bulbicon} alt="" />
        </div>

        <div className="card">
          <p>BrainsStrom team bonding activities foe our work retreat.</p>
          <img src={assets.message_icon} alt="" />
        </div>

        <div className="card">
          <p>Improve the readability of the following code.</p>
          <img src={assets.code_icon} alt="" />
        </div>

      </div>
      
      </>
    :
    <div className='result'>
      <div className="result-title">
         <img src={assets.user_icon} alt="" />
         <p>{recentPrompt}</p>
        
        </div>
        <div className="result-data">

          <img src={assets.gemini_icon} alt="" />
          {loading
          ?<div className='loader'>
            <hr />
            <hr />
            <hr />
          </div>:
          
          <p dangerouslySetInnerHTML={{__html:resultdata}}></p>
          }{/*we use __html:resultdata so its doesnot show tags just show results*/ }
        </div>
         </div>  
    }
     

      <div className="main-bottom">
        <div className="search-box">
          <input onChange={(e)=>setinput(e.target.value)} value={input}  type="text" placeholder='Enter a prompt here' />
          <div>
                   <img src={assets.gallery_icon}alt="" />
                   <img src={assets.mic_icon} alt="" />
                   <img onClick={()=>onSent()} src={assets.send_icon} alt="" />

          </div>
        </div>

        <p className="botton-info">Gemini is Google’s powerful AI model, designed for advanced reasoning, coding, multimodal tasks, and seamless integration across devices.</p>
      </div>
    </div>
   </div>
  )
}

export default Main