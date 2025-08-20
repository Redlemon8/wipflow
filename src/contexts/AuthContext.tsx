import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { IUser, ILoginRequest, IRegisterRequest } from '../@types';
import { login as apiLogin, register as apiRegister, logout as apiLogout } from '../api';

export interface AuthContextType {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: ILoginRequest) => Promise<boolean>;
  register: (userData: IRegisterRequest) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('access_token');
      
      if (token) {
        // Pour l'instant, on fait confiance au token existant
        // TODO: implémenter une vérification du token ou refresh automatique
        setUser({ 
          id: 0, 
          email: 'user@example.com', 
          created_at: new Date().toISOString() 
        });
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials: ILoginRequest): Promise<boolean> => {
    try {
      setIsLoading(true);
      const result = await apiLogin(credentials);
      if (result) {
        setUser(result.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erreur lors de la connexion', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: IRegisterRequest): Promise<boolean> => {
    try {
      setIsLoading(true);
      const result = await apiRegister(userData);
      if (result) {
        setUser(result.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erreur lors de l\'inscription', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await apiLogout();
    } catch (error) {
      console.error('Erreur lors de la déconnexion', error);
    } finally {
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider };