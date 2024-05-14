import { connectToRabbitMQ } from 'amqplib-retry-wrapper-dls';

const channel = await connectToRabbitMQ(process.env.AMQP_HOST);
const exchange = 'user'

async function publishUserEvent(user, userStatus) {
    if (!user || !userStatus) {
        throw new Error('Invalid parameters: need to have both user and userstatus arguments');
    }

    await channel.assertExchange(exchange, 'fanout', {
        durable: true
    });

    const message = { 
        status: userStatus,
        user: user
    }
    
    console.log(message);
    channel.publish(exchange, '', Buffer.from(JSON.stringify(message)));
}

export {
    publishUserEvent
}
