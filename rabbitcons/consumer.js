const dotenv = require('dotenv').config();
const amqp = require('amqplib');

let quantia = 1000; // Quantia inicial no consumidor

async function receiveMessage() {
    let queue = 'transactions'; // Fila correta
    let url = process.env.AMQP;
    if (!url) {
        console.error("Erro: Variável de ambiente AMQP não configurada.");
        process.exit(1);
    }

    try {
        const connection = await amqp.connect(url);
        const channel = await connection.createChannel();
        await channel.assertQueue(queue, { durable: false });

        console.log(`Aguardando mensagens na fila: ${queue}`);
        
        channel.consume(queue, (msg) => {
            const data = JSON.parse(msg.content.toString());
            const amount = data.amount;

            console.log(`Solicitação recebida para deduzir: ${amount}`);
            
            if (amount > quantia) {
                console.log(`Erro: Quantia solicitada (${amount}) excede o valor disponível (${quantia}).`);
            } else {
                quantia -= amount; 
                console.log(`Quantia atualizada com sucesso! Nova quantia: ${quantia}`);
            }
        }, {
            noAck: true
        });
    } catch (error) {
        console.error(error);
    }
}


receiveMessage();
