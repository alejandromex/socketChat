const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utilities/utilidades');



const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entraChat',(data,callback)=>{


        if(!data.nombre || !data.sala)
        {
            return callback({
                error: true,
                mensaje: "El nombre/sala es necesario"
            });
        }

        client.join(data.sala);

        let personas = usuarios.agregarPersona(client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit('listaPersona',usuarios.getPersonasPorSala(data.sala));

        callback(usuarios.getPersonasPorSala(data.sala));
    })

    client.on('disconnect',()=>{
        let persona = usuarios.getPersona(client.id);
        usuarios.borrarPersona(client.id);

        client.broadcast.to(persona.sala).emit('crearMensaje',crearMensaje("Administrador", `${persona.nombre} Abandono`));
        client.broadcast.to(persona.sala).emit('listaPersona',usuarios.getPersonasPorSala(persona.sala));

    })


    client.on('crearMensaje',(data)=>{
        let persona = usuario.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
    });

    client.on('mensajePrivado',(data)=>{
        
        let persona = usuarios.getPersona(client.id);

        client.broadcast.to(data.para).emit('mensajePrivado',crearMensaje(persona.nombre, data.mensaje));
    })
    
});

