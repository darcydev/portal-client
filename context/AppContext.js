import { createContext } from 'react';

// create auth context with default value

// set backup default for isAuthenticated if none is provided in Provider
const AppContext = createContext({ isAuth: false });

export default AppContext;
