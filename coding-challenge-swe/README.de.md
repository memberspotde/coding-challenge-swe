# Coding Challenge [SWE] @ Memberspot

## Hintergrund

Diese Aufgabe deckt einige Kernkonzepte ab, auf die du bei der Arbeit an einem TypeScript-Projekt bei Memberspot stoßen wirst.

## Herausforderung

Schreibe eine kleine Anwendung, die Daten von einer API abruft (wir empfehlen [diese hier](https://www.swapi.tech/documentation)) und sie in einer paginierten Liste anzeigt.

### Anforderungen

1. Zeige eine Liste von Daten mit mindestens 4 Feldern an.
   1. Die Liste sollte mindestens 1 aggregierten Wert enthalten.
   2. Bei der [Beispiel-API](https://www.swapi.tech/documentation) zeige den _Name_, das _Geburtsjahr_, die _Heimatwelt_ und das _Terrain der Heimatwelt_ einer Person an.
2. Implementiere ein Eingabefeld oberhalb der Liste, um die Daten **case-insensitiv** zu filtern.
3. Die Liste sollte paginiert sein, mit einer Seitengröße von 10. (_Lazy Loading_ wird gegenüber traditioneller Paginierung bevorzugt).
4. Hab Spaß und sei kreativ!

### Hinweise und Tipps

0. Du kannst jede beliebige Technologie wählen, aber...
1. Unser Unternehmen hat einen festen Tech-Stack:
   1. Angular für Client-seitige Apps.
   2. NestJS für Server-seitige Apps.
   3. Tailwind CSS.
2. Verwende eine API.
   1. Wenn sie öffentlich ist, versuche die Daten zu **cachen** und **so wenige Anfragen** wie möglich zu stellen.
   2. Du kannst auch deine eigene API erstellen.
3. Wenn du eine Datenbank simulieren möchtest, verwende eine JSON-Datei und lade sie in den Speicher.
4. Bitte verwende `strict` Mode in deiner tsconfig.

### Einreichen

1. Forke dieses Repository und sende uns deine Lösung.
2. Benachrichtige Memberspot.

## Alternativen

Wenn du keine Zeit für das Assignment hast, lass es uns wissen! In diesem Fall würden wir versuchen, Teile davon live in einem technischen Interview zu implementieren.

Wenn du ein Projekt hast, zu dem du regelmäßig beiträgst, können wir auch darüber sprechen. Wir sind an deiner Arbeit interessiert.
