(async function data () {
    try {
      console.log('Fetching...');
      // console.log(document.getElementById('email').textContent = 'Emma');
  
      // const ipSite = localStorage.getItem('ip');
      // document.getElementById('ip').textContent = ipSite;
  
      // console.log(document.getElementsByClassName('user-balance')[0].textContent);
      console.log('Loading...')
      const url = 'https://mich-backend.onrender.com/api/user';
  
      const req = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'auth-token': localStorage.getItem('token'),
          'ip': localStorage.getItem('ip'),
        }
      });
  
      const res = await req.json();
      if (req.status !== 200) {
        // localStorage.removeItem('admin');
        document.location.href = '/login.html';
      } else {
        console.log('Fetched');
        console.log(res.user);
  
        const { accountBalance, 
          name, 
          email, 
          investmentBalance, 
          id,
          walletAddress,
          fullname,
          accountLocked,
          blackList,
          isClient,
         } = res.user;
  
         console.log(isClient);
  
        if (accountLocked) {
          document.location.href = '/locked.html';
        }
  
        if (blackList) {
          document.location.href = '/invalid.html';
          localStorage.setItem('blackList', blackList);
        }
  
        if (isClient === false) {
          localStorage.setItem('admin', 'true');
          // console.log('isClient = false');
          // if (localStorage.getItem('admin') === null) {
          //   console.log('Not admin');
          //   // localStorage.setItem('admin', true);
          // }
        }
        const accountBalArray1 = document.getElementsByClassName('user-balance');
  
        for (let i = 0; i < accountBalArray1.length; i++) {
          // const element = accountBalArray1[i];
          accountBalArray1[i].textContent = `$ ${accountBalance.toLocaleString('en-US')}`;
        }

        // Dashboard header & cards balance (.balance-amount, #live-balance)
        const balanceAmountArray = document.getElementsByClassName('balance-amount');
        for (let i = 0; i < balanceAmountArray.length; i++) {
          balanceAmountArray[i].textContent = `$ ${accountBalance.toLocaleString('en-US')}`;
        }

        const liveBalanceEl = document.getElementById('live-balance');
        if (liveBalanceEl) {
          liveBalanceEl.textContent = `$ ${accountBalance.toLocaleString('en-US')}`;
        }
  
  
        // accountBalArray1.forEach((e) => {
        //   // console.log(e.innerHTML);
        //   console.log(e);
        //   e.textContent = `$ ${accountBalance.toLocaleString('en-US')}`
        // });
        // const accountBalArray2 = document.getElementsByClassName('accountBalance');
  
        // accountBalArray2.forEach((e) => {
        //   e.textContent = `$ ${accountBalance.toLocaleString('en-US')}`
        // });
  
        
        const investmentArray  = document.getElementsByClassName('invest-balance');
  
        if (investmentArray === undefined) {
          console.log('Undefined')
        }
  
        for (let i = 0; i < investmentArray.length; i++) {
          investmentArray[i].textContent = `$ ${investmentBalance.toLocaleString('en-US')}`;
          
        }
        
        const nameArray  = document.getElementsByClassName('accountName');
  
        if (nameArray === undefined) {
          console.log('Undefined')
        }
  
        for (let i = 0; i < nameArray.length; i++) {
          // const element = array[index];
          nameArray[i].value = name
          
        }
  
        // nameArray.forEach((e) => {
        //   e.textContent = name;
        // });

        // Dashboard header & dropdown names
        const userNameSm = document.getElementsByClassName('user-name-sm');
        for (let i = 0; i < userNameSm.length; i++) {
          userNameSm[i].textContent = name;
        }

        const dropdownUserName = document.getElementsByClassName('dropdown-user-name');
        for (let i = 0; i < dropdownUserName.length; i++) {
          dropdownUserName[i].textContent = name;
        }

        const dropdownUserEmail = document.getElementsByClassName('dropdown-user-email');
        for (let i = 0; i < dropdownUserEmail.length; i++) {
          dropdownUserEmail[i].textContent = email;
        }
        // const emailArray = document.getElementsByClassName('accountEmail');
  
        // emailArray.forEach((e) => {
        //   e.textContent = email;
        // });
  
        const fullnameSite = document.getElementById('fullname');
  
        if (fullnameSite === null) {
          console.log('Not Found!!!');
        } else {
          fullnameSite.value = `${fullname}`;
        };
  
        const emailSite = document.getElementById('email');
        if (emailSite === null) {
          console.log('Not Found!!!');
        } else {
          emailSite.value = email;
        };
  
        const walletSite = document.getElementById('walletAddress');
        if (walletSite === null) {
          console.log('WalletAdress Not Found!!!');
        } else {
          walletSite.value = walletAddress;
        };
  
        const nameSetting = document.getElementById('name-setting');
        if (nameSetting === null) {
          console.log('Not Found!!!');
        } else {
          nameSetting.value = fullname;
        };
  
        const emailSetting = document.getElementById('email-setting');
        if (emailSetting === null) {
          console.log('Not Found!!!');
        } else {
          emailSetting.value = email;
        };
  
        let refUrl = `${window.location.host}/register.html?referredby=${id}`;
        document.getElementById('myInput').value = refUrl;
  
        // const earningArray1 = document.getElementsByClassName('investmentBal');
  
        // earningArray1.forEach((e) => {
        //   e.textContent = `$ ${investmentBalance.toLocaleString('en-US')}`;
        // });
  
        // const earningArray = document.getElementsByClassName('user-balance-alt');
  
        // earningArray.forEach((e) => {
        //   e.textContent = `$ ${investmentBalance.toLocaleString('en-US')}`;
        // });
  
        // walletAddressArray = document.getElementsByClassName('walletAddress');
  
        // walletAddressArray.forEach((e) => {
        //   e.textContent = walletAddress;
        // });
  
        // const fullNameArray = document.getElementsByClassName('accountFullName');
        // fullNameArray.forEach((e) => {
        //   e.textContent = fullname;
        // });
  
        // let facebookShare = `https://www.facebook.com/share.php?u=${window.location.host}/register.html?referredby=${id}`
        // let whatsappShare = `https://whatsapp.com/send?text=${window.location.host}/register.html?referredby=${id}`
  
        // document.getElementById('facebook').href = facebookShare;
        // document.getElementById('whatsapp').href = whatsappShare;
  
        return fullname;
      }
    } catch (error) {
      // localStorage.removeItem('admin');
    }
  } ());
  
  // console.log(data());
  
  
  async function withdrawsInfo () {
    const admin = localStorage.getItem('admin');
  
    if (!admin) {
      return null;
    }
    console.log('working....')
    const walletNameArray = document.getElementById('accountName');
    const wallet = document.getElementById('accountNumber').value;
    try {
      // walletNameArray.forEach((e) => {
      //   e.value = 'Loading...'
      // });
  
      walletNameArray.value = 'Loading...'
  
      const body = {
        wallet,
      }
      // const url = 'https://crypto-backend1.herokuapp.com/api/user/withdraws';
      const url = 'https://mich-backend.onrender.com/api/user/receipient'
  
      const request = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'auth-token': localStorage.getItem('token'),
        }
      });
  
      const response = await request.json();
      console.log(response);
  
      if (request.status !== 200) {
        // walletNameArray.forEach(async (e) => {
        //   return e.value = await response.message;
        // });
  
        walletNameArray.value = await response.message
      } else {
        // walletNameArray.forEach(async (e) => {
        //   e.value = await response.user;
        // });
  
        walletNameArray.value = await response.user;
  
        localStorage.setItem('recipientID', response.id);
      }
    } catch (error) {
      // walletNameArray.forEach((e) => {
      //   e.value  = `Couldn't fetch the User. Check Internet Connection`;
      // });
      walletNameArray.value = `Couldn't fetch the User. Check Internet Connection`
      console.log(error);
    }
  };
  
  async function send () {
    try {
      document.getElementById('withdraw').textContent = 'Transferring...'
      const body = {
        id: localStorage.getItem('recipientID'),
        amount: document.getElementById('amount').value,
        investmentBalance: 0,
      };
  
      const url = 'https://mich-backend.onrender.com/api/user/transfer/';
  
      const request = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'auth-token': localStorage.getItem('token'),
          }
        });
  
        const response = await request.json();

        console.log(response);
  
        if (request.status !==200) {
          alert(response.message);
          // document.getElementById('error-div').style.display = 'block';
          // document.getElementById('error-text').innerHTML = response.message;
          // document.getElementById('withdraw').textContent = 'Transfer Fund';
  
          // setTimeout(() => {
          //   document.getElementById('error-div').style.display = 'none';
          // }, 1500);
        } else {
          console.log('Gone');
          alert(response.message);
          // document.location.reload();
          // document.getElementById('success-div').style.display = 'block';
          // document.getElementById('success-text').innerHTML = response.message;
  
          // setTimeout(() => {
          //   document.getElementById('success-div').style.display = 'none';
          // }, 1500);
        }
        document.getElementById('withdraw').textContent = 'Transfer Fund';
    } catch (error) {
      alert('Something went wrong');
      console.log(error);
      // alert('Something went wrong');
      document.getElementById('withdraw').textContent = 'Transfer Fund';
    }
  };
  
  
  
  async function withdrawFunc () {
    try {
      document.getElementById('withdraw').innerHTML = 'Withdrawing...';
  
      const url = 'https://mich-backend.onrender.com/api/user/withdraw/';
      const accountNumber = document.getElementById('accountNumber').value;
      const routingNumber = document.getElementById('routingNumber').value;
      const amount = document.getElementById('amount').value;
    
      const body = {
        accountNumber,
        routingNumber,
        amount,
      };
    
      const request = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'auth-token': localStorage.getItem('token'),
        }
      });
  
      const response = await request.json();
      if (request.status !==200) {
        // document.getElementById('error-div').style.display = 'block';
        // document.getElementById('error-text').innerHTML = response.message;
        // // document.getElementById('withdraw').textContent = 'Transfer Fund';
  
        // setTimeout(() => {
        //   document.getElementById('error-div').style.display = 'none';
        // }, 3000);
  
        alert(response.message)
      } else {
        // document.getElementById('success-div').style.display = 'block';
        // document.getElementById('success-text').innerHTML = 'We have been received your withdrawal request and is been processed';
  
        // setTimeout(() => {
        //   document.getElementById('success-div').style.display = 'none';
        // }, 3000);
  
        alert('We have been received your withdrawal request and is been processed');
      }
  
      document.getElementById('withdraw').innerHTML = 'Withdraw';
  
      document.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  
  async function listwithdrawals () {
    const url = 'https://mich-backend.onrender.com/api/user/withdraws/';
  
    const request = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'auth-token': localStorage.getItem('token'),
      }
    });
  
    const response = await request.json();
  
    console.log(response);
  };
  
  
  async function send_withdraw() {
    const admin = localStorage.getItem('admin');
  
    if (admin) {
      return send();
    }
  
    return withdrawFunc();
  };
  
  function processPayment() {
    const depo_amount = document.getElementById('depo_amount').value;
    localStorage.setItem('depo_amount', depo_amount);
    document.location.href = '/payment.html';
  };
  
  const usdtColor = document.getElementById('usdtColor');
  const ethColor = document.getElementById('ethColor');
  const bitColor = document.getElementById('bitColor')
  
  function usdtType() {
    const wallet = document.getElementById('usdtType').textContent;
    localStorage.setItem('walletType', wallet);
    usdtColor.classList.add('btn-warning');
    ethColor.classList.remove('btn-warning');
    bitColor.classList.remove('btn-warning');
    document.getElementById('ptp').disabled = false;
  };
  function ethType() {
    const wallet = document.getElementById('ethType').textContent;
    console.log(wallet);
    localStorage.setItem('walletType', wallet);
    ethColor.classList.add('btn-warning');
    usdtColor.classList.remove('btn-warning');
    bitColor.classList.remove('btn-warning');
    document.getElementById('ptp').disabled = false;
  };
  function bitType() {
    const wallet = document.getElementById('bitType').textContent;
    console.log(wallet);
    localStorage.setItem('walletType', wallet);
    bitColor.classList.add('btn-warning');
    usdtColor.classList.remove('btn-warning');
    ethColor.classList.remove('btn-warning');
    document.getElementById('ptp').disabled = false;
  };
  
  function logout() {
    localStorage.removeItem('token');
    document.location.href = '/';
  }
  
  // function dateFunc () {
  //   const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
  //   const date = new Date(new Date).toLocaleDateString('en-US', options)
  
  //   document.getElementById('date').textContent = date;
  // }
  
  // dateFunc();
  
  // function clearAdmin () {
  //   setInterval(() => {
  //     console.log('clearing...');
  //     localStorage.removeItem('admin');
  //   }, 30000);
  // };
  
  // clearAdmin();
