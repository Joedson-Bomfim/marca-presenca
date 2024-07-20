import React, { createContext, useState } from 'react';

export const Context = createContext({})

function ContextProvider({children}) {
    const [isCadastroConcluido, setIsCadastro] = useState(false);
    const [professorId, setProfessorId] = useState('1'); //Usário provisório...dps irei adicionar uma lógica para setar o id do professor

    return (
        <Context.Provider value={{isCadastroConcluido, setIsCadastro, professorId, setProfessorId }}>
            {children}
        </Context.Provider>
    );
}

export default ContextProvider;
