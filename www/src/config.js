var printService = "http://raspberrypi:8082/api/print/"

var config = [
  {
    "name": "Adress",
    "width": 252,
    "height": 118,
    "elements": [
      {
        "type": "text",
        "content": "label",
        "x": .5,
        "y": 0.5,
        "w": 7,
        "fontSize" : 0.5
      }
    ]
  },
  {
    "name": "QR Code",
    "width": 252,
    "height": 118,
    "elements": [
      {
        "type": "qrcode",
        "content": "qr",
        "x": 0.5,
        "y": .5,
        "h":2,
        "w":2
      },
      {
        "type": "text",
        "content": "qr",
        "x": 0.5,
        "y": 3,
        "w": 3,
        "fontSize" : "0.25"
      }
    ]
  }
]
