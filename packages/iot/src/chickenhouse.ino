#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <DHT.h>
#include <ArduinoJson.h>
//#include <FirebaseArduino.h>

#define DHTTYPE   DHT22       // DHT type (DHT11, DHT22)
#define DHTPIN    D4          // Broche du DHT / DHT Pin

const char* ssid     = #wifissid#;
const char* password = #wifipassword#;
const char* host = "10.0.0.9";
const int   port = 3001;
const int   watchdog = 60000;
unsigned long previousMillis = millis();

DHT dht(DHTPIN, DHTTYPE);
HTTPClient http;

void setup() {
  Serial.begin(115200);
  delay(10);

  // Serial.setDebugOutput(true);
  Serial.println("Connecting Wifi...");

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.print(WiFi.localIP());
}

int value = 0;

void loop() {
  unsigned long currentMillis = millis();

  if ( currentMillis - previousMillis > watchdog ) {
    previousMillis = currentMillis;

    if (WiFi.status() != WL_CONNECTED) {
      Serial.println("WiFi not connected !");
    } else {
      float t = dht.readTemperature();
      float h = dht.readHumidity();
      StaticJsonBuffer<200> jsonBuffer;
      JsonObject& root = jsonBuffer.createObject();
      if (!isnan(t)) {
        root["t"] = t;
        Serial.print("Temperature: ");
        Serial.println(t);
      } else {
        root["te"] = true;
      }
      if (!isnan(h)) {
        root["h"] = h;
        Serial.print("Humidity: ");
        Serial.println(h);
      } else {
        root["he"] = true;
      }
      char buffer[256];
      root.printTo(buffer, sizeof(buffer));
      post(buffer);
    }
  }
}

void post(String json) {
  String url = "/measurements";
  http.begin(host, port, url);
  http.addHeader("Content-Type", "application/json");
  int httpCode = http.POST(json);
  if (httpCode > 0) {
    Serial.printf("[HTTP] GET... code: %d\n", httpCode);
  } else {
    Serial.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
  }
  http.end();
}
