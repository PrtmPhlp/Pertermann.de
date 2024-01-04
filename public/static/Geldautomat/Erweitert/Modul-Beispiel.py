#!/usr/bin/env python
# ------------------------------------------------
# Beispiel zur Nutzung von "Geldautomat.py" als Modul
# Use Cases:
# - Einfache Integrierung in andere Programme durch "leise" Ausgabe
# - Bessere Lesbarkeit durch Auslagerung
# ------------------------------------------------
__author__ = "Philipp Pertermann"
__Contact__ = "philipp@pertermann.de"
__date__ = "2024/01/01"
# ------------------------------------------------

import Geldautomat
from time import sleep

# Einfache Abfrage des Nutzers:
eingabe = str(input("Welcher Betrag soll berechnet werden? "))
print(Geldautomat.berechne_wechselgeld(eingabe))

sleep(2)

# Repetitive Nutzung:
for i in range(100):
    i = str(i)
    print(Geldautomat.berechne_wechselgeld(i))
