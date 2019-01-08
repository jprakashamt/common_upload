var amqp = require('amqplib/callback_api');
var url =  'amqp://guest:guest@localhost:5672';

module.exports = createQueueChannel;
function createQueueChannel(queue, cb) 
{  
  amqp.connect(url, onceConnected);
  function onceConnected(err, conn) 
  {
    if (err) 
    {
      cb(err);
    }
    else 
    {
      conn.createConfirmChannel(onceChannelCreated);
    }
    function onceChannelCreated(err, ConfirmChannel) 
    {
        if (err) 
        {
          cb(err);
        }
        else 
        {
            ConfirmChannel.assertQueue(queue, {durable: true}, onceQueueCreated);
        }
        function onceQueueCreated(err) 
        {
            if (err) 
            {
              cb(err);
            }
            else 
            {
              cb(null, ConfirmChannel, conn);
            }
          }
      }
  }
}