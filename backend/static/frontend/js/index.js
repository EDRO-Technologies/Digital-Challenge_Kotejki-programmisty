async function postData(data = {}) {
    const response = await fetch("http://10.76.10.252:5000/users", {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data),
    })
    return response
};

document.getElementById('log-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const userData = {
        "phone": phone.value,
        "password": password.value
    }

    postData(userData).then((response) => {
        data = response.json()
        if(response.status != 200) {
            console.log(data)
        } else {}
    });
});