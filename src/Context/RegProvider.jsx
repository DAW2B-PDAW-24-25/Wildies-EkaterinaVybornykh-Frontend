import React, { useState, useEffect } from 'react'
import { createContext } from 'react';
export const RegContext = createContext();
import { API_URL } from '../App';

function RegProvider({ children }) {
    const [deportes, setDeportes] = useState([]);

    useEffect(() => {
        cargarDeportes();
    }, [])

    async function cargarDeportes() {
        try {
            let response = await fetch(`${API_URL}/deportes`);
            if (!response.ok) {
                throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
            }
            let data = await response.json();
            setDeportes(data)
        }
        catch (error) {
            console.error("Error usuarios:", error);
        }
    }
    return (
        <RegContext.Provider
            value={{
                deportes
            }}
        >
            {children}
        </RegContext.Provider>
    )
}

export default RegProvider