function logoutHandler(){
    fetch('http://localhost:8000/api/logout', {
      headers:{
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "https://localhost:5173",
        "X-Requested-With": "XMLHttpRequest",
        "Authorization": "Bearer " + localStorage.getItem("auth_token"),
      }
    }).then((res)=>{
      console.log(res)
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      localStorage.removeItem('auth');
    })
  
  }