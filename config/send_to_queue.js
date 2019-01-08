var Channel = require('./rabbitmq');
var utility = require('./utility');

function sendToQueue(queue,data)
{
    Channel(queue, function(err, channel, conn) 
    {
        if (err) 
        {
            console.error(err.stack);
        }
        else 
        {
            channel.sendToQueue(queue, utility.encode(data), {persistent: true});
            setImmediate(function() 
            {
                channel.close();
                conn.close();
            });
          }
    });
}


exports.sendToQueue = function(queue,data)
{
   sendToQueue(queue,data);
}