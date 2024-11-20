# Mensageria com RabbitMQ na Nuvem

Este projeto, desenvolvido na disciplina **Técnicas de Integração de Sistemas** do Curso de Análise e Desenvolvimento de Sistemas da Unifor, implementa uma solução de mensageria utilizando RabbitMQ hospedado na nuvem, permitindo comunicação assíncrona e eficiente entre sistemas distribuídos . O RabbitMQ é configurado para ser acessado remotamente, facilitando a integração de diferentes serviços ou aplicações em ambientes de nuvem.

## Tecnologias Utilizadas

- **RabbitMQ (na Nuvem)**: Broker de mensagens que permite o envio de mensagens de maneira assíncrona entre aplicações. A configuração do RabbitMQ está hospedada na nuvem para maior escalabilidade e disponibilidade.
- **Node.js**: Ambiente de execução para JavaScript no lado do servidor.
- **dotenv**: Carregamento de variáveis de ambiente a partir de arquivos .env para configuração de credenciais e parâmetros do RabbitMQ.

## Explicação do Projeto: Produtor/Consumidor

Este projeto é uma implementação clássica de um padrão de comunicação entre dois processos assíncronos, onde o **produtor** gera dados ou realiza tarefas e os **consumidores** processam essas tarefas. Ele é amplamente utilizado em sistemas distribuídos e em ambientes onde a comunicação assíncrona é necessária, como filas de mensagens (neste caso, usando **RabbitMQ**).

### Produtor
O **produtor** é a parte que envia ou cria as mensagens, colocando-as na fila do RabbitMQ. Nesse tipo de cenário, o produtor pode representar um serviço que gera valores, realiza cálculos ou outros tipos de tarefas assíncronas.

### Consumidor
O **consumidor**, por sua vez, é o processo que pega as mensagens da fila do RabbitMQ e as processa. No cenário da atividade, o consumidor tem uma quantidade inicial (quantia) e deve ser capaz de manipular essa quantidade com base nas mensagens recebidas.

## Como Funciona

1. **Consumidor** inicializa uma variável `quantia` com um valor específico.

   Por exemplo, a `quantia` inicial pode ser 100, representando o valor disponível no consumidor.

2. O **Produtor** envia para o **Consumidor** uma quantidade a ser retirada (por exemplo, 50). O produtor não sabe o valor exato da `quantia` no consumidor, mas a regra é que ele pode solicitar a retirada de um valor, desde que a `quantia` do consumidor seja suficiente para isso.

3. O **Consumidor**, ao receber a mensagem do **Produtor**, verifica se a `quantia` dele é suficiente para subtrair o valor solicitado.
   - Se a `quantia` no consumidor for maior ou igual ao valor recebido, a dedução ocorre.
   - Se a `quantia` for menor que o valor enviado, a dedução não pode ser realizada e o consumidor deve, talvez, enviar uma mensagem de erro ou de "quantia insuficiente".
  
## Resumo

Este tipo de projeto é utilizado para implementar sistemas de comunicação assíncrona entre diferentes componentes de um sistema, como diferentes serviços, usando uma fila de mensagens. Com a implementação de produtor/consumidor, você pode controlar a comunicação de forma que um serviço (o produtor) gere ou envie dados e outro serviço (o consumidor) os processa de maneira independente.

O cenário proposto, com a dedução de valores, é um exemplo de aplicação onde a lógica de negócios do Consumidor interage diretamente com as mensagens recebidas, e o sistema deve garantir que a operação seja realizada somente quando possível, ou seja, se a quantia do consumidor for suficiente para o valor a ser retirado.
