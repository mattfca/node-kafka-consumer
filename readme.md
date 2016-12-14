# node-kafka-consumer

Uses kafkaesque library

creates a cluster with max CPU's then starts consuming

## Kafka Commands
1. Start zookeeper
> c:/kafka/bin/windows/zookeeper-server-start.bat c:/kafka/config/zookeeper.properties
2. Start Kafka
> c:/kafka/bin/windows/kafka-server-start.bat c:/kafka/config/server.properties
3. Create Topic
> c:/kafka/bin/windows/kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 10 --topic NodeTest1
4. Load Topic
> c:/kafka/bin/windows/kafka-run-class.bat org.apache.kafka.tools.ProducerPerformance --topic NodeTest1 --num-records 1000000 --record-size 2000 --throughput -1 --producer-props acks=1 bootstrap.servers=localhost:9092 buffer.memory=67108864 batch.size=8196

## How to use
> node index.js