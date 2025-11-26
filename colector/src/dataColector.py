import requests
from datetime import datetime
import pytz

WEATHER_CODES = {
    0: "Céu limpo",
    1: "Predominantemente claro",
    2: "Parcialmente nublado",
    3: "Nublado",
    45: "Neblina",
    48: "Neblina densa",
    51: "Garoa fraca",
    53: "Garoa moderada",
    55: "Garoa forte",
    61: "Chuva fraca",
    63: "Chuva moderada",
    65: "Chuva forte",
    80: "Aguaceiros fracos",
    81: "Aguaceiros",
    82: "Aguaceiros fortes",
    95: "Tempestade",
    96: "Tempestade com granizo",
    99: "Tempestade forte com granizo",
}



def colect_data(lat, lng):
  url = "https://api.open-meteo.com/v1/forecast"
  LAT = lat
  LON = lng
  TIMEZONE = "America/Sao_Paulo"
  
  params = {
        "latitude": LAT,
        "longitude": LON,
        "hourly": ",".join([
            "temperature_2m",
            "relative_humidity_2m",
            "wind_speed_10m",
            "weathercode",
            "precipitation_probability"
        ]),
        "daily": "temperature_2m_max",
        "timezone": TIMEZONE
    }

  try:
    
    response = requests.get(url, params=params)
    data = response.json()
  except:
    print('Algo deu errado')
    
  tz = pytz.timezone(TIMEZONE)
  agora = datetime.now(tz).strftime("%Y-%m-%dT%H:00")
  times = data["hourly"]["time"]

  try:
      h = times.index(agora)
  except ValueError:
      h = 0    
  temp = data["hourly"]["temperature_2m"][h]
  umid = data["hourly"]["relative_humidity_2m"][h]
  vento = data["hourly"]["wind_speed_10m"][h]
  codigo = data["hourly"]["weathercode"][h]
  prob = data["hourly"]["precipitation_probability"][h]

  condicao = WEATHER_CODES.get(codigo, "Desconhecido")
  agora = agora.split('T')
  hora = agora[1]
  dia = agora[0]
  object_data = {
    "lat": lat,
    "lng":lng,
    "dia": dia,
    "hora": hora,
    "vento": vento,
    "temp": temp,
    "umid": umid,
    "condicao": condicao,
    "prob": prob 
  }
  return object_data