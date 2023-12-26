import axios from 'axios';

// const tokenString = () => localStorage.getItem('authForEcomerce'); 

const api = axios.create({
  baseURL: process.env.API_ENDPOINT, // Assuming you have API_ENDPOINT defined in your environment variables
  timeout: 5000, // Set a timeout (optional)
  headers: {
    'Content-Type': 'application/json',
    //'Authorization': `Bearer ${localStorage.getItem('authForEcomerce')}`,
    },
  // transformRequest: [function (data, headers) {
  //   // Do whatever you want to transform the data

  //   const tokenString = localStorage.getItem('authForEcomerce');    
  //   console.log("🔗 tokenString from transform Request 🟢 : ", JSON.parse(tokenString) );
      

  //   headers.Authorization = `Bearer ${JSON.parse(tokenString)}`;
  //   console.log(data, headers)
  //   return data;
  // }],
});

// Add a request interceptor
// api.interceptors.request.use(
//   (config) => {
    
//     const  tokenString = localStorage.getItem('authForEcomerce');    
//       console.log("🔗 tokenString from transform Request 🟢 : ",  tokenString );
      


//     if (token) {
//       config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWxsZXJFbWFpbEFkZHJlc3MiOiJhQGdtYWlsLmNvbSIsInN1YiI6IjE0IiwiaWF0IjoxNzAxMTk1NTg2LCJleHAiOjE3MDExOTU2NDZ9.gLX9nHTlLha0_GREcsc8nrlM0hHgJUsTsA5CZgryrEk`;
//     }
//     return config;
//   },
//   (error) => {
//     // Handle request error
//     return Promise.reject(error);
//   }
// );

export default api;