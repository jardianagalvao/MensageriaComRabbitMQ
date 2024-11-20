const dotenv =  require('dotenv').config();
const amqp = require('amqplib')

async function receiveMessage(){
    let queue = 'hello';
    let url = process.env.AMQP;

    try{
        const connection = await amqp.connect(url);
        const channel = await connection.createChannel();
        await channel.assertQueue(queue, {durable : false});

        console.log(`Aguardando mensagens na fila: ${queue}`);
        channel.consume(queue, (msg)=>{
            console.log(`A mensagem é: ${msg.content.toString()}`);
        },{
            noAck: true
        });
    }catch (error){
        console.error(error);
    }
}

receiveMessage();