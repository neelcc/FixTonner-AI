import axios from "axios";
import { createContext, use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const AppContext = createContext()

export  const AppContextProvider = ({children}) => {

    const [ user, setUser  ] = useState(null)
    const navigate = useNavigate()
    const [ token , setToken ] = useState(localStorage.getItem('token'))
    const [ input_text , setInput_text ] = useState("")
    const [ tags , setTags ] = useState([])
    const [ isLoggedIn , setIsLoggedIn ] = useState(false)
    const [ activeTags , setActiveTags ] = useState([])
    const [ credits , setCredits ] = useState(null)
    const BackendUrl = import.meta.env.VITE_BACKEND_URL

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
            navigate('/get-started')
        }
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        setTags([])
        setActiveTags([])
        setIsLoggedIn(false)
        setInput_text("")
        setCredits(null)
    }

    useEffect(()=>{
        console.log(token)
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
        loadCreditsData
    }

    return (
        <AppContext.Provider value={value} >
            {children}
        </AppContext.Provider>
    )
}
