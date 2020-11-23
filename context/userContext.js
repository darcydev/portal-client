import React, { createContext, useState } from 'react';

/* const UserContext = createContext();

const UserConsumer = UserContext.Consumer;

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ test: true });

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserConsumer };
export default UserProvider; */

const UserContext = createContext();

export default UserContext;
