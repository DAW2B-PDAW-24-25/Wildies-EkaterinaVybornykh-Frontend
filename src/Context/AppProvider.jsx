import React, { useEffect } from 'react'
import { createContext } from 'react'
import { useState } from 'react';
import { CgSmartHomeBoiler } from 'react-icons/cg';
export const AppContext = createContext();
import { API_URL } from '../App';



function AppProvider({ children }) {
    const [usuarioLogueado, setUsuarioLogueado]=useState(() => JSON.parse(localStorage.getItem('usuario')));
    const [token, setToken]=useState(() => localStorage.getItem('token'));

    function login(datosUsuario, token){
        setUsuarioLogueado(datosUsuario);
        setToken(token);
        localStorage.setItem('usuario', JSON.stringify(datosUsuario));
        localStorage.setItem('token', token);
      };
 
    return (
        <AppContext.Provider value={{
            usuarioLogueado, setUsuarioLogueado, login, token
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider