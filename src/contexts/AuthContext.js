import { createContext, useContext } from "react";
import useLocalStorage from '../hooks/useLocalStorage';

export const AuthContext = createContext();

const initialAuthState = {
    _id: '',
    email: '',
    accessToken: ''
  };

// const reducer = (state, action) => {
//     switch (action.type) {
//         case 'LOGIN':
//             return { ...state, email: action.payload };
//         case 'LOGOUT':
//             return initialState;
//         default:
//             return state;
//     }
// }
  
export const AuthProvider = ({
    children
}) => {
    const [user, setUser] = useLocalStorage('user', initialAuthState);

    const login = (authData) => {
        setUser(authData);
    }
    
    const logout = () => {
      setUser(initialAuthState)
    };

    // const [user, dispatch] = useReducer(reducer, initialState);
    // const login = (email, password) => {
    //     dispatch({
    //         type: 'LOGIN',
    //         payload: email
    //     });
    // };
    // const logout = () => dispatch({type: 'LOGOUT'})

    const isAuth = Boolean(user.email);
    // console.log(isAuth);

    return (
        <AuthContext.Provider value = {{ user, login, logout, isAuthenticated: isAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const authState = useContext(AuthContext);
    return authState;
}