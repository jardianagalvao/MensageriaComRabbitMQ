const amqp = require('amqplib');
const dotenv = require('dotenv').config();

async function sendMessage() {
    let queue = 'transactions'; // Fila correta
    let amountToDeduct = 50; // Quantia a ser deduzida
    let url = process.env.AMQP;

    try {
        const connection = await amqp.connect(url);
        const channel = await connection.createChannel();
        await channel.assertQueue(queue, { durable: false });

        // Envia a quantia a ser deduzida
        const message = JSON.stringify({ amount: amountToDeduct });
        channel.sendToQueue(queue, Buffer.from(message));
        console.log(`Mensagem enviada: ${message}`);

        setTimeout(() => {
            connection.close();
            process.exit(0);
        }, 500);
    } catch (error) {
        console.error(error);
    }
}

sendMessage();
