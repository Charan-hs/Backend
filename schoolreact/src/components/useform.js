import { useState } from 'react';

const useForm = () => {
    const [isLogin,setIsLogin] = useState(() =>  false)
    const loginto = () => {
        // setIsLogin(!isLogin)
        console.log("vf")
    }
    const [loginOpen,setLoginOpen] = useState(false)
    const [token,setToken] = useState("")
    const [userdata, setUserData] = useState({
        token:undefined,
        user:undefined,
    })
    return {
        isLogin,
        setIsLogin,
        loginto,
        loginOpen,setLoginOpen,
        userdata, setUserData,
        token,setToken,

    }
}

export default useForm;