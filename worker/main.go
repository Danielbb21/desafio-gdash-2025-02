package main

import (
	"log"

	amqp "github.com/rabbitmq/amqp091-go"
)

func failOnError(err error, msg string) {
	if err != nil {
		log.Panicf("%s: %s", msg, err)
	}
}

func connectRabbitMQ(url string) (*amqp.Connection, *amqp.Channel) {
	conn, err := amqp.Dial(url)
	failOnError(err, "Failed to connect to RabbitMQ")

	ch, err := conn.Channel()
	failOnError(err, "Failed to open a channel")

	return conn, ch
}

func consumeQueue(ch *amqp.Channel, queueName string) <-chan amqp.Delivery {
	q, err := ch.QueueDeclare(
		queueName, false, false, false, false, nil,
	)
	failOnError(err, "Failed to declare a queue")

	msgs, err := ch.Consume(
		q.Name, "", true, false, false, false, nil,
	)
	failOnError(err, "Failed to register a consumer")

	return msgs
}

func main() {
	conn, ch := connectRabbitMQ("amqp://guest:guest@rabbitmq:5672/")
	defer conn.Close()
	defer ch.Close()

	msgs := consumeQueue(ch, "weather")

	log.Println(" [*] Waiting for messages. To exit press CTRL+C")

	// Processa mensagens
	for d := range msgs {
		log.Printf("Received a message: %s", d.Body)
	}
}
