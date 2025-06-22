import { createContext, useState } from "react";
import runChat from "../Config/Gemini";

export const Context = createContext();
const ContextProvider=(props)=>{


  const[input,setinput]=useState("");
  const[recentPrompt,setRecentPrompt]=useState("");
  const[prevPrompt,setPrevPrompt]=useState([])
  const[showresult,setShowResult]=useState(false);
  const[loading,setLoading]=useState(false);
  const[resultdata,setResultData]=useState("");

  const delaypara=(index,nextword)=>{
  setTimeout(function(){
    setResultData(prev=>prev+nextword)

  },75*index)
  }


//for new chat button
    const newchat=()=>{
      setLoading(false)
      setShowResult(false)  // after these result screen will hidden and card screen will be shown
    }

    const onSent=async(prompt)=>{
        setResultData("")
        setLoading(true)
        setShowResult(true)


        let response;
        if (prompt !==undefined){
             response = await runChat(prompt);
             setRecentPrompt(prompt)
        }
        else{
          setPrevPrompt(prev=>[...prev,input])  //for adding ques in sidebar 
          setRecentPrompt(input)                 // for adding ques in sidebar 
          response = await runChat(input)
        }


       
        let responseArray= response.split("**");
        let newresponse="";
        for(let i=0;i<responseArray.length;i++)
        {
          if (i===0 || i%2!==1){
            newresponse+= responseArray[i];
          }
          else{
            newresponse += "<b>"+responseArray[i]+"</b>";
          }
        }
        let newResponse2 = newresponse.split("*").join("</br>")
        let newrespnseArray = newResponse2.split(" ");
        for(let i=0;i<newrespnseArray.length;i++)
        {
          const nextword = newrespnseArray[i];
          delaypara(i,nextword+" ")
        }
        setLoading(false)
        setinput("")
        
  }
 
  const contextValue={
      prevPrompt,
      setPrevPrompt,
      onSent,
      setRecentPrompt,
      showresult,
      loading,
      resultdata,
      input,
      setinput,
      newchat
  }

  return(
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  )
}
export default ContextProvider