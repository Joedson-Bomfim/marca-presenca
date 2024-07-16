import React, { createContext, useState } from 'react';

export const AuthContext = createContext({})

function AuthProvider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [tipo, setTipo] = useState('aluno');
    const [usuario, setUsuario] = useState('');
    const [nome, setNome] = useState('');
    const [matricula, setMatricula] = useState('');
    const [numero_registro, setNumero_registro] = useState('');

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, tipo, setTipo, usuario, setUsuario, nome, setNome, 
                                      matricula, setMatricula, numero_registro, setNumero_registro }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
