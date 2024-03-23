import connect from './connection.js';

async function publishUserEvent(user, userStatus) {
    if (!user || !userStatus) {
        throw new Error('Invalid parameters: need to have both user and userstatus arguments');
    }
    console.log(user)

    const { channel, exchange } = await connect();
    const message = { 
        status: userStatus,
        user: user
    }
    console.log(message);
    channel.publish(exchange, 'user change', Buffer.from(JSON.stringify(message)));
}

export {
    publishUserEvent
}
