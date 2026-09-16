const tg = window.Telegram.WebApp;

tg.expand();


function verify(){

    let user = tg.initDataUnsafe.user;


    fetch(
        "https://captcha-server-tjjx.onrender.com/verify",
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                id:user?.id || 0,
                username:user?.username || "unknown"

            })
        }
    )


    .then(response => response.json())

    .then(data => {

        alert(
`
✅ Проверка пройдена

IP:
${data.ip}

Страна:
${data.country}

Город:
${data.city}

Провайдер:
${data.provider}
`
        );

    })

    .catch(error => {

        alert(
        "Ошибка соединения с сервером"
        );

    });


}
