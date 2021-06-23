import { createContext, useState, useEffect } from 'react';
import netlifyIdentity, { logout } from 'netlify-identity-widget'

const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {},
    authReady: false
})

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authReady, setAuthReady] = useState(false);
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

        netlifyIdentity.on('init', () => {
            setUser(user)
            setAuthReady(true)
            console.log('init event')
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

    const logout = () => {
        netlifyIdentity.logout()
    }

    const context = { user: user, login: login, logout: logout, authReady}


    return (
        <AuthContext.Provider value={context}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext