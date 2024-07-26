import React, { createContext, useState } from 'react';

export const Context = createContext({})

function ContextProvider({children}) {
    const [professorId, setProfessorId] = useState('');
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [numero_registro, setNumeroRegistro] = useState('');
    
    return (
        <Context.Provider value={{professorId, setProfessorId, nomeCompleto, setNomeCompleto, numero_registro, setNumeroRegistro }}>
            {children}
        </Context.Provider>
    );
}

export default ContextProvider;
