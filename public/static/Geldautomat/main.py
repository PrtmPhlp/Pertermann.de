#!/usr/bin/env python
# ------------------------------------------------
# Wechselgeld für einen Geldbetrag in Euro und Cent umwandeln und in Scheinen und Münzen ausgeben
# ---
# In diesem Beispiel wird nur if und while verwendet.
# Im Ordner "Erweitert" befinden sich zwei weitere Dateien. Die Datei Geldautomat verwendet erweiterte Funktionen, hat aber auch erweiterte Funktionalität.
# Zusätzliche Features von diesem Programm:
# - Rest Angabe, um die Berechnung leichter zu kontrollieren.
# - Umwandlung von Kommas auf Punkte, um Verwirrung in der Eingabe zu vermeiden
# - Es wird auf zwei Nachkommastellen gerundet um Floating Point Fehler zu vermeiden (https://docs.python.org/3/tutorial/floatingpoint)
# ------------------------------------------------
__author__ = "Philipp Pertermann"
__Contact__ = "philipp@pertermann.de"
__date__ = "2024/01/01"
# ------------------------------------------------

# Eingabe des Betrags in Euro
betrag_in_euro = input("Bitte Betrag in Euro eingeben: ")

# Umwandlung des Betrags in Cent. Ausserdem werden Kommas in Punkte umgewandelt
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

# Ausgabe des Wechselgelds
output = "Wechselgeld:\n"
for einheit, (euro_betrag, rest) in ergebnis.items():
    output += f"{einheit}: {euro_betrag}€ (Rest: {rest:.2f}€)\n"

# Ausgabe des gesamten Ergebnisses
print(output)
