var socket = io();

var params = new URLSearchParams(window.location.search);

if(!params.has('nombre') || !params.has("sala"))
{
    window.location = 'index.html';
    throw new Error("El nombre y sala es necesario");
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entraChat',usuario, function(resp){
        console.log(resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});

//Escuchar cuando un usuario entra o sale del chat
socket.on('crearMensaje',function(data){
    console.log(data.mensaje);
});



socket.on('listaPersona',function(data){
    console.log(data);
})

socket.on('enviarMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

//Mensajes privados
socket.on('mensajePrivado',function(mensaje){
    console.log('Mensaje privado: ',mensaje);
})