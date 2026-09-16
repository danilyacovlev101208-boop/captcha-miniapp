const tg = window.Telegram.WebApp;

tg.expand();



document
.getElementById("verify")
.onclick = function(){


    const token = turnstile.getResponse();



    if(!token){

        document.getElementById("status").innerHTML =
        "❌ Пройдите проверку Cloudflare";

        return;

    }



    document.getElementById("status").innerHTML =
    "⏳ Проверяем...";



    const user = tg.initDataUnsafe.user;



    fetch(
        "https://captcha-server-tjjx.onrender.com/verify",
        {

            method:"POST",


            headers:{

                "Content-Type":
                "application/json"

            },


            body:JSON.stringify({

                id:
                user ? user.id : 0,


                username:
                user ? user.username : "unknown",


                turnstile_token:
                token

            })


        }
    )


    .then(response => response.json())


    .then(data => {


        if(data.success){


            document.getElementById("status").innerHTML =
            "✅ Проверка пройдена";


        }


        else{


            document.getElementById("status").innerHTML =
            "❌ Ошибка проверки";


        }


    })


    .catch(()=>{


        document.getElementById("status").innerHTML =
        "❌ Ошибка соединения";


    });



};
