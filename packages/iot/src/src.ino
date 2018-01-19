#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>
#include <DHT.h>
#include <Servo.h>
#include "config.h"

#define SERVO_PIN D3

#define DHTTYPE   DHT22
#define DHTPIN    D4    // D14/SDA/D4 on wemos D1
#define LED D6
const int   watchdog = 1000;
unsigned long previousMillis = millis();

int val = 0;
DHT dht(DHTPIN, DHTTYPE);
Servo servo;

void setup() {
  Serial.begin(9600);

  pinMode(LED, OUTPUT);
  // connect to wifi.
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  servo.attach(SERVO_PIN);
  Serial.println("did servo turn?");
}

int n = 0;
byte x = 0;
void loop() {
  bool opened = Firebase.getInt("opened");
  Serial.println(opened);
  if (Firebase.failed()) {
    Serial.print("reading /opened failed:");
    Serial.println(Firebase.error());
    return;
  } else {
    if (opened) {
      servo.write(1);
    } else {
      servo.write(179);
    }
  }

  bool ledStatus = Firebase.getBool("lightOn");
  if (Firebase.failed()) {
    Serial.print("reading /ledStatus failed:");
    Serial.println(Firebase.error());
    return;
  } else {
    digitalWrite(LED, ledStatus);
  }

  unsigned long currentMillis = millis();

  if ( currentMillis - previousMillis > watchdog ) {
    previousMillis = currentMillis;

    if (WiFi.status() != WL_CONNECTED) {
      Serial.println("WiFi not connected !");
    } else {
      float t = dht.readTemperature();
      float h = dht.readHumidity();

      if (!isnan(t) && !isnan(h)) {
        Serial.print("Temperature: ");
        Serial.println(t);
        Serial.print("humidity: ");
        Serial.println(h);
        Firebase.setFloat("temperature", t);
        if (Firebase.failed()) {
          Serial.print("setting /temperature failed:");
          Serial.println(Firebase.error());
          return;
        }
        Firebase.setFloat("humidity", h);
        if (Firebase.failed()) {
          Serial.print("setting /humidity failed:");
          Serial.println(Firebase.error());
          return;
        }
      } else {
        Serial.println("error in DHT22");
      }
    }
  } else {
    //    digitalWrite(LED, LOW);
  }
}
