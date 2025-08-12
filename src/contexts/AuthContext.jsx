import React, { createContext, useContext } from 'react';

const AuthContext = createContext({ user: null });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const authContextValue = {
    user: null, // no auth logic needed
    login: () => {},
    logout: () => {},
    updateKYC: () => {}
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};



// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [wallet, setWallet] = useState({
//     connected: false,
//     address: null,
//     balance: {
//       ETH: 2.5,
//       USDT: 10000,
//       USDC: 5000,
//       BNB: 15.2,
//       MATIC: 1500
//     },
//     network: 'Ethereum'
//   });

//   useEffect(() => {
//     const savedUser = localStorage.getItem('ownabit_user');
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//   }, []);

//   const connectWallet = async () => {
//     try {
//       const address = '0x742d35Cc6563C13426c7f6AEB6DE4b2d55eE8eB7';
//       setWallet(prev => ({
//         ...prev,
//         connected: true,
//         address
//       }));
//       login(address);
//     } catch (error) {
//       console.error('Failed to connect wallet:', error);
//     }
//   };

//   const disconnectWallet = () => {
//     setWallet({
//       connected: false,
//       address: null,
//       balance: {},
//       network: 'Ethereum'
//     });
//     logout();
//   };

//   const login = (address) => {
//     const existingUser = localStorage.getItem(`user_${address}`);
//     let userData;

//     if (existingUser) {
//       userData = JSON.parse(existingUser);
//     } else {
//       userData = {
//         id: address,
//         address,
//         kycStatus: 'not-started',
//         isAdmin: address === '0x742d35Cc6563C13426c7f6AEB6DE4b2d55eE8eB7',
//         createdAt: new Date(),
//         totalInvested: 0,
//         totalReturns: 0
//       };
//       localStorage.setItem(`user_${address}`, JSON.stringify(userData));
//     }

//     setUser(userData);
//     localStorage.setItem('ownabit_user', JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('ownabit_user');
//   };

//   const updateKYC = (status) => {
//     if (user) {
//       const updatedUser = { ...user, kycStatus: status };
//       setUser(updatedUser);
//       localStorage.setItem('ownabit_user', JSON.stringify(updatedUser));
//       localStorage.setItem(`user_${user.address}`, JSON.stringify(updatedUser));
//     }
//   };

//   return (
//     <AuthContext.Provider value={{
//       user,
//       wallet,
//       connectWallet,
//       disconnectWallet,
//       updateKYC,
//       login,
//       logout
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
