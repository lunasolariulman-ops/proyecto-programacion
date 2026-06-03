import { createContext, useContext, useState } from 'react';

const UsuarioContext = createContext(null);

export function UsuarioProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    
    const login = (datosUsuario) => {
        setUsuario(datosUsuario);
    };
    
    const logout = () => {
        setUsuario(null);
    };

    return (
        <UsuarioContext.Provider value={{ usuario, login, logout }}>
            {children}
        </UsuarioContext.Provider>
    );
}

export function useUsuario() {
    return useContext(UsuarioContext);
}