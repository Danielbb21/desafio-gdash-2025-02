import geocoder
from dataColector import colect_data
from datetime import datetime
from croniter import croniter
import time

expressao_cron = "0 * * * *"  # roda todo minuto

def executar_tarefa():
    g = geocoder.ip('me')
    print("Localização:", g.latlng)
    colect_data(g.lat, g.lng)

if __name__ == "__main__":
    print("🔥 O cron está rodando dentro do container!")

    cron = croniter(expressao_cron, datetime.now())

    while True:
        proximo = cron.get_next(datetime)
        agora = datetime.now()

        espera = (proximo - agora).total_seconds()
        if espera > 0:
            time.sleep(espera)

        print("⏰ Executando tarefa do cron:", datetime.now())
        executar_tarefa()
