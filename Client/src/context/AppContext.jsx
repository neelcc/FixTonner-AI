import axios from "axios";
import { createContext,  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const AppContext = createContext()

export  const AppContextProvider = ({children}) => {

    const navigate = useNavigate()
    const [ user, setUser  ] = useState(null)
    const [ token , setToken ] = useState(localStorage.getItem('token'))
    const [ input_text , setInput_text ] = useState("")
    const [ tags , setTags ] = useState([])
    const [ isLoggedIn , setIsLoggedIn ] = useState(false)
    const [ activeTags , setActiveTags ] = useState([])
    const [ credits , setCredits ] = useState(null)
    const [ isResultLoaded , setIsResultLoaded ] = useState(false)
    const BackendUrl = import.meta.env.VITE_BACKEND_URL
    const [ output_text , setOutput_text ] = useState("")
    const [ errorMessage , setErrorMessage ] = useState("")
    const [ projectHistory , setProjectHistory ] = useState([])


    const getHistory = async () => {
        const { data } = await axios.get(BackendUrl+'project/history',
            {
                headers : {
                    token : token
                }
            }
        )
        if(data.success){
            setProjectHistory(data.projects)
            navigate('/history')    
        }
    }

    const loadCreditsData = async () => {
        const { data } = await axios.get(BackendUrl+'project/load-credits',
            {
                headers : {
                    token : token
                }
            }
        )
        if(data.success){
            setCredits(data.credits)
            setUser(data.user)
            navigate('/get-started')
        }
    }

    const promptResult = async () => {
        setIsResultLoaded(true)
        const { data } = await axios.post(BackendUrl+'project/fix-tone',
            {
            input_text : input_text,
            tone_tags : activeTags    
        },
        {
            headers : {
                token : token
            }
        }
    )
        
        if(data.success){
            setIsResultLoaded(false)
            navigate('/output')
            setOutput_text(data.reply)
            setCredits(data.credits)
        }else{
            setIsResultLoaded(false)
            navigate('/output')
            setErrorMessage(data.message)
        }

    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
        setToken(null)
        setTags([])
        setActiveTags([])
        setIsLoggedIn(false)
        setInput_text("")
        setCredits(null)
        navigate('/')
    }

    useEffect(()=>{
        if(token){
            loadCreditsData();
        }

    },[token])
    

    const value = {
        user,
        setInput_text,
        setTags,
        setToken,
        setUser,
        input_text,
        token,
        tags,
        activeTags,
        setActiveTags,
        BackendUrl,
        isLoggedIn,
        setIsLoggedIn,
        credits,
        setCredits,
        logout,
        loadCreditsData,
        promptResult,
        isResultLoaded,
        setOutput_text,
        output_text,
        setIsResultLoaded,
        errorMessage , 
        setErrorMessage,
        getHistory,
        projectHistory,
        setProjectHistory
    }

    return (
        <AppContext.Provider value={value} >
            {children}
        </AppContext.Provider>
    )
}
