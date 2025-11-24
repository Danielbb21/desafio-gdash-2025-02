from dataColector import colect_data
import json
import pika


def sender(lat, lng):
  data = colect_data(lat, lng)
  json_data = json.dumps(data)
  print(json_data)
  connection = pika.BlockingConnection(
    pika.ConnectionParameters("rabbitmq", 5672, "/", pika.PlainCredentials("guest", "guest"))
)
  channel = connection.channel()
  channel.queue_declare(queue='weather')
  channel.basic_publish(exchange='',
                      routing_key='weather',
                      body=json_data)
  print(" [x] Sent 'weather Info'")
  connection.close()

