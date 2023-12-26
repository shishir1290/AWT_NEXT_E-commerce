import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

// create a context
const AuthContext = createContext();

// create a provider component
export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  
  const login = () => {
    
    const tokenString = localStorage.getItem('authForEcomerce');
    

    /// setUser(userData);
    setUser(JSON.parse(tokenString)); 

    console.log("🔰🔰🔰🔰🔰 Login 🔰🔰🔰🔰🔰🔰", user, "--", JSON.parse(tokenString));
    
  }

  const checkUser = () => {
    
    const token = localStorage.getItem('authForEcomerce');
    //if(user.userEmailAddress!=null && user.cookie!=null) {
    if(token){
      console.log("🔰🔰🔰🔰🔰 check User -> token exist🔰🔰🔰🔰🔰🔰", JSON.parse(token));
      setUser(JSON.parse(token)); 
      return JSON.parse(token);
    }else{
      console.log("🔰🔰🔰🔰🔰 check User -> token does not exist🔰🔰🔰🔰🔰🔰");
      return false;
    }
  }

  return (
    <AuthContext.Provider value={{user, login, checkUser}}>
      {children}
    </AuthContext.Provider>
  );


};

export const useAuth = () => useContext(AuthContext);



  // const getUser = () =>{
  //   //console.log("user from getUser🔰 ->Navbar.js:  "+user)
  //   const tokenString = localStorage.getItem('authForEcomerce');
  //   const token = JSON.parse(tokenString);
  //   return token;
  // }
