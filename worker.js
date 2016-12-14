
var cluster = require('cluster');  
var kafkaesque = require('kafkaesque');

var message_count = 0;
var start_time = Date.now() / 1000;
var the_time = Date.now() / 1000;

var consumer = kafkaesque({
            brokers: [
                {host: 'localhost', port: 9092}
            ],
            clientId: "nodeConsumer" + Math.floor(Math.random()*10000),
            group: 'NodeConsumerGroup',
            maxBytes: 1024*1024
        });

var self = module.exports = {
    start: function() {
        console.log('Worker ' + process.pid + ' has started.');

        consumer.subscribe('NodeTest1');

        consumer.connect(self.connect);

        setInterval(self.interval, 10000);
    },

    connect: function(err, kafka) {
        if (err) return console.log('ERROR CONNECTING:', err)

        kafka.on('message', self.message);

        kafka.on('electedLeader', self.electedLeader)

        kafka.on('rebalance.start', self.rebalanceStart);

        kafka.on('rebalance.end', self.rebalanceEnd);

        kafka.on('error', self.error);

        kafka.on('connect', self.connectSucceeded);
    },

    message: function(message, commit) {
        message_count++;

        commit();
    },

    electedLeader: function () {
        console.log('now the leader');
    },

    rebalanceStart: function () {
        console.log('rebalance started!');
    },

    rebalanceEnd: function () {
        console.log('rebalance ended!');
    },

    error: function (err) {
        console.log('error causing disconnect', err)
        consumer.disconnect();
    },

    connectSucceeded: function () {
        console.log('connected!');
    },

    interval: function(){
        var the_time = Date.now() / 1000;
        var msg = { 
            id: cluster.worker.id,
            msg: message_count,
            time: (the_time - start_time),
            mps: (message_count / (the_time - start_time))
        }

        process.send(msg);

        console.log("Worker " + msg.id + ": Processed " + msg.msg + " in " + msg.time + " or " + msg.mps + " mps")
    }
}