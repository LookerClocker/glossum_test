'use strict';

document.addEventListener('DOMContentLoaded', () => {
    /**
     * Gathering and sending data from login form to server
     */

    let loginForm = document.getElementById('loginForm'),
        message = document.getElementById('blockM'),
        login = document.getElementById('login'),
        loginValue = '',
        password = document.getElementById('pass'),
        passValue = '',
        okButton = document.getElementById('okButt'),
        loginInfo = document.getElementById('title');

    /**
     * Getting credentials from "login" field
     * @param e
     */
    login.onkeyup = (e)=> {
        loginValue = e.target.value;
    };

    /**
     * Getting credentials from "password" field
     * @param e
     */
    password.onkeyup = (e)=> {
        passValue = e.target.value;
    };

    /**
     * Handling form submit. I have "test.json" which contains credentials for successful login.
     * I emulated login with this file. I made request for fetching data (correct login and password)
     * and after i have fetched them i compare if user typed correct data or nor.
     * Depend of it the message with dynamically text appearing.
     */
    loginForm.addEventListener('submit', (e)=> {
        e.preventDefault();
        fetch('test', {method: 'GET'})
            .then((r)=> {
                if (r.status == 200) return r.json()
            })
            .then(r=> {
                r.login === loginValue && r.pass === passValue
                    ? loginInfo.innerHTML = 'You have successfully registered!'
                    : loginInfo.innerHTML = 'You have typed incorrect password or login!' + '<br/>' +
                    'Use <strong>"Admin"</strong> for both login and password.';

                message.classList.remove('hidden');
                message.classList.add("show");
            })
            .catch((error)=> {
                console.log('Request failed', error);
            });

    });

    /**
     * Handling 'OK' button on message block
     */
    okButton.onclick = ()=> {
        location.reload();
    }

});
