const amqp = require('amqplib');
const doenv = require('dotenv').config();

async function sendMessage() {
    let queue = 'hello';
    let message = 'Hello World!';

    let url = process.env.AMQP;
    
    try{
        const connection = await amqp.connect(url);
        const channel = await connection.createChannel();
        await channel.assertQueue(queue, {durable : false});

        channel.sendToQueue(queue, Buffer.from(message));
        console.log(`Mensagem enviada: ${message}`);

        setTimeout(()=>{
            connection.close();
            process.exit(0);
        }, 500);
    }catch(error){
        console.error(error);
    }
    
    
}

sendMessage();

// instalar o reptmqueue