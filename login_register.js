async function login () {
    try {
  
      console.log('working!!!');
      console.log(document.getElementById('btn-text').textContent);
      document.getElementById('btn-text').textContent = 'Please Wait...';
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      // const url = 'https://crypto-backend1.herokuapp.com/api/user/login/';
  
      const url = 'https://mich-backend.onrender.com/api/user/login/';
  
      const body = {
        email,
        password,
      }
  
      const req = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
  
      const res = await req.json();
      console.log(res);
  
      if (req.status !==200) {
        document.getElementById('btn-text').value = 'Sign In';
        alert(res.message || res.errMessage);
      } else {
        localStorage.setItem('token', res.token);
        document.location.href = '/dash.html';
      }
    } catch (error) {
      console.log(error);
      document.getElementById('btn-text').textContent = 'Sign In';
      alert('Check Your Internet Connection!');
    }
  };
  
  
  async function register () {
    try {
      if (document.location.origin === 'https://meta30trader.com') {
        alert('Can not register at this time. Please Try again later');
      } else {
        document.getElementById('btn-text').textContent = 'Please Wait...';
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        // const url = 'https://crypto-backend1.herokuapp.com/api/user/login/';
  
        // const url = 'https://crypto-backend2.herokuapp.com/api/user/register/';
  
        const url = 'https://mich-backend.onrender.com/api/user/register';
  
        const body = {
          name,
          email,
          password,
        }
  
        const req = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        });
  
        const res = await req.json();
        // console.log(res);
  
        if (req.status !==200) {
          document.getElementById('btn-text').textContent = 'Sign In';
          alert(res.message);
        } else {
          localStorage.setItem('token', res.token);
          document.location.href = '/dash.html';
        }
      }
    } catch (error) {
      document.getElementById('btn-text').textContent = 'Sign In';
      alert('Check Your Internet Connection');
    }
  };