import React, { createContext, useState } from 'react';

export const AuthContext = createContext({})

function AuthProvider({children}) {
    const [isCadastroConcluido, setIsCadastro] = useState(false);

    return (
        <AuthContext.Provider value={{isCadastroConcluido, setIsCadastro }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
