import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();
const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: "http://localhost:4222"
})

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  stan.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  })
  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName('account-service');

  const subscription = stan.subscribe(
    'ticket:created',
    'orders-service-queue-group',
    options
  );
  subscription.on('message', (msg: Message) => {
    const data = msg.getData();
    if (typeof data === 'string') {
      console.log(`Received event number #${msg.getSequence()},with data : ${data}`);
    }
    msg.ack();

  })
})

process.on('SIGINT', () => { console.log('sigint'); stan.close() });
/**
 * The below lines do not work on windows
 */

process.on('SIGTERM', () => { console.log('sigterm'); stan.close() });
process.on('SIGUSR2', () => { console.log('sigusr2'); stan.close() })

