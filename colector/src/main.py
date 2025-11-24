import geocoder
from dataColector import colect_data


if __name__ == "__main__":
    g = geocoder.ip('me')
    print(g.latlng)
    colect_data(g.lat, g.lng)