package main

import (
	"log"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
)

func failOnError(err error, msg string) {
	if err != nil {
		log.Panicf("%s: %s", msg, err)
	}
}

func connectRabbitMQ(url string) *amqp.Connection {
	var conn *amqp.Connection
	var err error

	for i := 0; i < 10; i++ {
		conn, err = amqp.Dial(url)
		if err == nil {
			log.Println("conectado ao RabbitMQ com sucesso!")
			return conn
		}
		log.Println("Tentativa de conectar ao RabbitMQ falhou, retry em 2s...")
		time.Sleep(2 * time.Second)
	}

	failOnError(err, "Failed to connect to RabbitMQ after retries")
	return nil
}

func processMessage(body []byte) error {
	log.Printf("📩 Processando mensagem: %s", body)
	return nil
}

func processWithRetry(body []byte, maxRetries int) error {
	var err error
	for i := 1; i <= maxRetries; i++ {
		err = processMessage(body)
		if err == nil {
			log.Println("Mensagem processada com sucesso")
			return nil
		}
		log.Printf("Tentativa %d falhou: %v", i, err)
		time.Sleep(1 * time.Second)
	}
	log.Printf("Todas as %d tentativas falharam", maxRetries)
	return err
}

func consumeQueue(ch *amqp.Channel, queueName string) <-chan amqp.Delivery {
	q, err := ch.QueueDeclare(
		queueName, false, false, false, false, nil,
	)
	failOnError(err, "Failed to declare a queue")

	msgs, err := ch.Consume(
		q.Name, "", false, false, false, false, nil,
	)
	failOnError(err, "Failed to register a consumer")

	return msgs
}

func main() {
	conn := connectRabbitMQ("amqp://guest:guest@rabbitmq:5672/")
	defer conn.Close()
	ch, err := conn.Channel()
	failOnError(err, "Failed to open a channel")
	defer ch.Close()

	msgs := consumeQueue(ch, "weather")

	log.Println(" [*] Waiting for messages. To exit press CTRL+C")

	for d := range msgs {
		log.Printf("Mensagem Recebida: %s", d.Body)
		err := processWithRetry(d.Body, 3)
		if err != nil {
			log.Printf("Erro ao processar mensagem!! Reenfileirando")
			d.Nack(false, true)
			continue
		}
		d.Ack(false)
	}
}
