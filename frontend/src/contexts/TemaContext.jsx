import { createContext, useContext, useState } from 'react';

const TemaContext = createContext(null);

export function TemaProvider({ children }) {
    const [tema, setTema] = useState('claro');
    
    const toggleTema = () => {
        setTema((temaActual) => (temaActual === 'claro' ? 'oscuro' : 'claro'));
    };

    return (
        <TemaContext.Provider value={{ tema, toggleTema }}>
            {children}
        </TemaContext.Provider>
    );
}

export function useTema() {
    return useContext(TemaContext);
}