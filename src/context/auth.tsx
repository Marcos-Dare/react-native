import { createContext, ReactNode, useContext, useState } from "react";
import { makeUserUseCases } from "../core/factories/makeUserUseCases"; // Verifique se o caminho está correto
import { User } from "../core/domain/entities/User"; // Verifique se o caminho está correto

// INTERFACE ATUALIZADA COM handleRegister
export interface IAuthContextData {
  isLogged: boolean;
  user: User | null;
  handleLogin(data: { email: string, password: string }): Promise<void>;
  handleLogout(): void;
  handleRegister(data: { name: string, email: string, password: string }): Promise<void>; // <-- ADICIONADO AQUI
}

export interface IProvider {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider = ({ children }: IProvider) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const userUseCases = makeUserUseCases();

  const handleLogin = async (data: { email: string, password: string }) => {
    try {
      const loggedInUser = await userUseCases.loginUser.execute(data);
      setUser(loggedInUser);
      setIsLogged(true);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsLogged(false);
  };

  // FUNÇÃO DE REGISTRO ADICIONADA AQUI
  const handleRegister = async (data: { name: string, email: string, password: string }) => {
    try {
      await userUseCases.registerUser.execute({ ...data, role: 'cidadão' });
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  return (
    // handleRegister ADICIONADO AO VALOR DO PROVIDER
    <AuthContext.Provider value={{ isLogged, user, handleLogin, handleLogout, handleRegister }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}