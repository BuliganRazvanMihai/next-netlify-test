import { createContext, useState, useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget'

const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {},
    authReady: false
})

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        // will fire on every login of a user
        netlifyIdentity.on('login', (user) => {
            setUser(user)
            netlifyIdentity.close()
            console.log('login event')
        })
        //logout event
        netlifyIdentity.on('logout', () => {
            setUser(null)
            console.log('logout event')
        })

        //initialize netlify connection
        netlifyIdentity.init()

        //unregister event listeners
        return () => {
            netlifyIdentity.off('login')
            netlifyIdentity.off('logout')
        }
    }, [])

    const login = () => {
        netlifyIdentity.open()
    }

    const logour = () => {
        netlifyIdentity.logout()
    }

    const context = { user: user, login: login, logout}


    return (
        <AuthContext.Provider value={context}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext