import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { UserContext } from "../users/UserProvider"

export const Protected = (props) => {
    const { checkAuthenticated, setLoggedInUserId } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true)
    const history = useHistory()
    useEffect(() => {
        checkAuthenticated()
            .then(res => {
                if (res.is_active){
                    if (res.is_admin) {
                        localStorage.setItem("priority_user_admin", "true")
                    }
                    else {
                        localStorage.setItem("priority_user_admin", "false")
                    }
                    setLoggedInUserId(res.logged_in_user_id)
                    setIsLoading(false)
                } else {
                    localStorage.removeItem("priority_user_token")
                    localStorage.removeItem("priority_user_admin")
                    history.push("/login")
                }
            })
    // eslint-disable-next-line
    }, [])
    return !isLoading ? props.children : null
}