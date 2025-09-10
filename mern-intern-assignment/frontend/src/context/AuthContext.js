import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true
  });

  useEffect(() => {
    const loadUser = async () => {
      if (state.token) {
        try {
          const response = await fetch('/api/auth/user', {
            headers: {
              'Authorization': `Bearer ${state.token}`
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            dispatch({
              type: 'LOGIN',
              payload: {
                user: userData.user,
                token: state.token
              }
            });
          } else {
            localStorage.removeItem('token');
            dispatch({ type: 'LOGOUT' });
          }
        } catch (error) {
          localStorage.removeItem('token');
          dispatch({ type: 'LOGOUT' });
        }
      }
      dispatch({ type: 'SET_LOADING', payload: false });
    };

    loadUser();
  }, []);

  const login = (token, user) => {
    localStorage.setItem('token', token);
    dispatch({
      type: 'LOGIN',
      payload: { token, user }
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
