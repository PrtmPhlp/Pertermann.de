#!/usr/bin/env python
# ------------------------------------------------
# Erweitertes Programm zur Berechnung von Wechselgeld
# ---
# In diesem Beispiel habe ich besonders darauf geachtet den Code PEP(8) (https://peps.python.org/) konform zu gestalten.
# Ein persönlicher Leitfaden: PEP20 (https://peps.python.org/pep-0020/)
# Folgende Funktionalität habe ich hinzugefügt:
# - Berechnung ist in Funktion berechne_wechselgeld() verschoben.
# - Mithilfe der Datei "Unittest" werden folgende Tests an dieser Datei ausgeführt
#   - Genauigkeit, Negative Zahlen, Große Zahlen, Kleine Zahlen, Kommas als Trennzeichen, Mehrere Nachkommastellen
# - Abfrage von Werten erfolgt nur, wenn Programm direkt ausgeführt wird. Folgend kann das Programm als Modul genutzt werden, wie in "Modul-Beispiel.py" demonstriert
# - Im Falle eines ValueErrors, wie bei einer Eingabe von "123,45,67", wird der Fehler in der Variable "Error" gespeichert, anstatt dass das gesamte Programm crasht
# ------------------------------------------------
__author__ = "Philipp Pertermann"
__Contact__ = "philipp@pertermann.de"
__date__ = "2024/01/01"
# ------------------------------------------------


# Eine Funktion zur Berechnung des Wechselgelds erstellen
def berechne_wechselgeld(betrag_in_euro):
    # Umwandlung des Betrags in Cent
    betrag_in_cent = float(betrag_in_euro.replace(',', '.')) * 100

    # Verfügbare Scheine und Münzen in Euro
    einheiten_in_euro = [100, 50, 20, 10, 5, 2, 1, 0.50, 0.20, 0.10, 0.05, 0.02, 0.01]

    # Variable festlegen, damit wir sie später verwenden können
    ergebnis = {}

    # Berechnung des Wechselgelds für jede Einheit
    for einheit in einheiten_in_euro:
        anzahl = 0
        # Solange der Betrag in Cent größer oder gleich der aktuellen Einheit ist
        while betrag_in_cent >= int(einheit * 100):
            # ...wird der Wert der aktuellen Einheit von betrag_in_cent abgezogen
            betrag_in_cent -= int(einheit * 100)
            anzahl += 1
        # Solange ein oder mehr Scheine benötigt werden, fügen wir sie zum Ergebnis hinzu
        if anzahl > 0:
            # Hinzufügen der Einheit und des Euro-Betrags zum Ergebnis
            ergebnis[f"{anzahl} x {einheit} Euro"] = (anzahl * einheit, betrag_in_cent / 100)

    return ergebnis


# Falls die Datei direkt ausgeführt wird, den Wechselgeldcode ausführen und das Ergebnis ausgeben
if __name__ == '__main__':
    # Eingabe des Betrags in Euro
    betrag_in_euro = input("Bitte Betrag in Euro eingeben: ")

    if not betrag_in_euro:
        print("Keine Eingabe, das Programm wird beendet.")
        exit()

    try:
        # Basis Programm ausführen
        wechselgeld_ergebnis = berechne_wechselgeld(betrag_in_euro)

        # Ausgabe des Wechselgelds
        output = "Wechselgeld:\n"
        for einheit, (euro_betrag, rest) in wechselgeld_ergebnis.items():
            output += f"{einheit}: {euro_betrag}€ (Rest: {rest:.2f}€)\n"

        # Ausgabe des gesamten Ergebnisses
        print(output)
    except ValueError as Error:
        print(f"Fehler: {Error}")
