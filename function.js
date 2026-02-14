const ipPermitida = "38.41.22.97";
const Button = document.getElementById('adminBtn');
const noBtn = document.getElementById('noBtn');

let yesScale = 1;


fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            console.log("Visitante desde:", data.ip);
            if (data.ip === ipPermitida) {
                document.getElementById('adminBtn').style.display = 'block';

            }
        })

        .catch(error => console.error('Error verificando IP:', error));


function changeAdminPanel() { 
    window.location.href = 'secure/answers.html';
}


// Botón de si
document.getElementById('yesBtn').addEventListener('click', function() {
    const respuestas = {
        answered: true,
        fecha: new Date().toLocaleString(),
        recuerdo: document.getElementById('recuerdo').value,
        amor: document.getElementById('amor').value,
        observacion: document.getElementById('observacion').value,
        san_valentin: "yes"
    };


    fetch('secure/controller_answers.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        
        body: JSON.stringify(respuestas)
    })

    .then(response => response.json())
    .then(data => {
        alert('¡Gracias por responder ;)! Eliese revisará esto más tarde');
        console.log('Guardado:', data);
    
        const messageDiv = document.getElementById('message');
        messageDiv.style.display = 'block';
        
        document.querySelector('.buttons').style.display = 'none';
    })

    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error en guardar las respuestas');
    });
});


noBtn.addEventListener('click', e => {
    e.preventDefault();
    yesScale += 0.3;
    yesBtn.style.transform = `scale(${yesScale})`;
  });