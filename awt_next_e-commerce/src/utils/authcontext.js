import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

// create a context
const AuthContext = createContext();

// create a provider component
export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  
  const login = (user) => {
    // setUser(user, cookie);
    setUser(user);
    //console.log("from login -> authContext 🔰 : ",user)
  }

  const getUser = () =>{
    //console.log("user from getUser🔰 ->Navbar.js:  "+user)
    const tokenString = localStorage.getItem('authForEcomerce');
    const token = JSON.parse(tokenString);
    return token;
  }
  

  const checkUser = () => {
    const token = localStorage.getItem('authForEcomerce');
    //if(user.userEmailAddress!=null && user.cookie!=null) {
    if(token){
      return true;
    }else{
      return false;
    }
  }

  const logout = () => {
    doSignOut();
  }

  async function doSignOut(){
    try{
      const response = await axios.get(process.env.API_ENDPOINT+'/logout');
      console.log("response: ", response);
      setUser(null);
      document.cookie = null;
      ////////////////////////////////////////////localStorage.clear();
      router.push("/"); // 🔰⚫🔗 Router.push()
    }catch(error){
      console.log("error:", error);
    }
  }
  return (
    <AuthContext.Provider value={{user, getUser, login, logout, checkUser }}>
      {children}
    </AuthContext.Provider>
  );


};

export const useAuth = () => useContext(AuthContext);
