const isAuthenticated = () => {
    const token = localStorage.getItem('token');

    if (token != null) {    
        return true;    //Jos token on olemassa antaa true, pitää muuttaa järkevämmäksi

      } else {
        return false;

      }
  };

  //const getUserId = () => {
  //  return localStorage.getItem('userid');
  //};
  
  export default isAuthenticated;