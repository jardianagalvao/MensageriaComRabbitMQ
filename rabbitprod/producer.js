const amqp = require('amqplib');
const dotenv = require('dotenv').config();

async function sendMessage() {
    let queue = 'transactions'; // Fila correta
    let amountToDeduct = 850; // Quantia a ser deduzida
    let url = process.env.AMQP;
    if (!url) {
        console.error("Erro: Variável de ambiente AMQP não configurada.");
        process.exit(1);
    }

    try {
        const connection = await amqp.connect(url);
        const channel = await connection.createChannel();
        await channel.assertQueue(queue, { durable: false });

        // Envia a quantia a ser deduzida
        const message = JSON.stringify({ amount: amountToDeduct });
        channel.sendToQueue(queue, Buffer.from(message));
        console.log(`Mensagem enviada: ${message}`);

        await channel.close();
        await connection.close();
        /*setTimeout(() => {
            connection.close();
            process.exit(0);
        }, 500);*/
    } catch (error) {
        console.error(error);
    }
}


sendMessage();
