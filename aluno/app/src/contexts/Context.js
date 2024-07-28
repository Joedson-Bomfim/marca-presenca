import React, { createContext, useState } from 'react';

export const Context = createContext({})

function ContextProvider({children}) {
    const [nome, setNome] = useState('');
    const [uuid, setUuid] = useState('');
    const [senha, setSenha] = useState('');
    
    return (
        <Context.Provider value={{nome, setNome, uuid, setUuid, senha, setSenha }}>
            {children}
        </Context.Provider>
    );
}

export default ContextProvider;
