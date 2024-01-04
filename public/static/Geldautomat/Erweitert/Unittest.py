#!/usr/bin/env python
# ------------------------------------------------
# Test Abläufe für "Geldautomat.py"
# ---
# Hier sind einige Abläufe definiert, welche meiner Meinung nach für einen stabilen Geldautomat nötig sind
# Ich greife hier auf das testing framework unittest zurück, welches seit Python Version 2.1 in den Standart Bibliotheken integriert ist
# ------------------------------------------------
__author__ = "Philipp Pertermann"
__Contact__ = "philipp@pertermann.de"
__date__ = "2024/01/01"
# ------------------------------------------------

import unittest
import Geldautomat  # Importiere die Datei Geldautomat mit ihren Funktionen als Datei


class TestWechselgeldBerechnung(unittest.TestCase):

    def test_genauigkeit(self):
        # Testen, ob der Betrag genau in die kleinsten Einheiten aufgeteilt wird
        betrag = "1623.45"  # Beispielbetrag als Zeichenkette
        ergebnis = Geldautomat.berechne_wechselgeld(betrag)
        self.assertTrue(sum(euro for euro, _ in ergebnis.values()) == float(betrag), "Die Gesamtsumme stimmt nicht überein.")

    def test_negative_zahlen(self):
        # Testen, wie das Skript auf negative Zahlen reagiert
        betrag = "-50"  # Beispielbetrag als Zeichenkette
        ergebnis = Geldautomat.berechne_wechselgeld(betrag)
        self.assertEqual(len(ergebnis), 0, "Negative Beträge sollten keine Ergebnisse liefern.")

    def test_grosse_zahlen(self):
        # Testen mit einem sehr hohen Betrag
        betrag = "334598764.34"  # Beispielbetrag als Zeichenkette
        ergebnis = Geldautomat.berechne_wechselgeld(betrag)
        self.assertTrue(len(ergebnis) > 0, "Große Zahlen sollten verarbeitet werden können.")

    def test_kleine_zahlen(self):
        # Testen mit einem sehr kleinen Betrag
        betrag = "0.03"  # Beispielbetrag als Zeichenkette
        ergebnis = Geldautomat.berechne_wechselgeld(betrag)
        self.assertTrue(len(ergebnis) > 0, "Cents sollten verarbeitet werden können.")

    def test_komma_als_trennzeichen(self):
        # Testen, ob ein Betrag mit einem Komma anstatt eines Punktes als Trennzeichen funktioniert
        betrag = "1234,56"  # Beispielbetrag mit Punkt als Zeichenkette
        lösung = betrag.replace(',', '.')  # Da Python mit Punkten als Trennungszeichen rechnet, müssen wir das ganze hier modifizieren
        ergebnis = Geldautomat.berechne_wechselgeld(betrag)
        self.assertTrue(sum(euro for euro, _ in ergebnis.values()) == float(lösung), "Punkt als Trennzeichen sollte funktionieren.")

    def test_viele_nachkommastellen(self):
        # Testen, ob Eingaben mit vielen Nachkommastellen korrekt bearbeitet werden
        betrag = "456.56565567"  # Beispielbetrag mit vielen Nachkommastellen als Zeichenkette
        ergebnis = Geldautomat.berechne_wechselgeld(betrag)
        self.assertTrue(sum(euro for euro, _ in ergebnis.values()) == 456.56, "Eingaben mit vielen Nachkommastellen sollten bis zur zweiten Nachkommastelle abgeschnitten werden.")


if __name__ == '__main__':
    unittest.main(verbosity=2)
