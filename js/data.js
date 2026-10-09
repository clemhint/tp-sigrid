// Trainingsplan Sigrid
// wochentage: JS-Wochentage (0 = Sonntag), an denen der Tag automatisch geöffnet wird.
// key (optional): Schlüssel für den Gewichtsverlauf, damit Einträge aus der
// vorherigen Planversion erhalten bleiben. Ohne key gilt der Übungsname;
// Übungen mit gleichem Namen teilen sich den Verlauf.
const TRAININGSPLAN = [
  {
    id: "dienstag",
    tag: "Dienstag",
    kurz: "Di.",
    titel: "Beine A",
    fokus: "Squat, Quadrizeps",
    wochentage: [2],
    uebungen: [
      { name: "Squat", geraet: "Langhantel", saetze: 3, wdh: "6 bis 8" },
      { name: "Split Squat", geraet: "Langhantel", saetze: 3, wdh: "8 bis 10 je Seite" },
      { name: "Leg Extension", geraet: "Maschine", saetze: 3, wdh: "10 bis 15", key: "beinstrecker, sitzend" },
      { name: "Adduktoren", geraet: "Maschine", saetze: 3, wdh: "12 bis 15" },
      { name: "Seitheben", geraet: "Kurzhantel", saetze: 3, wdh: "12 bis 15" },
      {
        name: "Beinheben liegend",
        geraet: "Schrägbank",
        saetze: 3,
        wdh: "10 bis 15",
        hinweis: "Lendenwirbelsäule am Polster halten, bei Hohlkreuz die Beine leicht anwinkeln."
      }
    ]
  },
  {
    id: "donnerstag",
    tag: "Donnerstag",
    kurz: "Do.",
    titel: "Oberkörper",
    fokus: "",
    wochentage: [4],
    uebungen: [
      { name: "Brustpresse", geraet: "Hantel oder Gerät", saetze: 3, wdh: "8 bis 12", hinweis: "RIR 1 bis 2" },
      { name: "Latzug breit", geraet: "", saetze: 3, wdh: "8 bis 12", hinweis: "RIR 1 bis 2", key: "latzug, breit" },
      { name: "Schulterpresse", geraet: "Kurzhantel, sitzend", saetze: 3, wdh: "8 bis 10", hinweis: "RIR 1 bis 2", key: "schulterdrücken, sitzend" },
      { name: "Low Rows einseitig", geraet: "", saetze: 3, wdh: "10 bis 12 je Seite" },
      { name: "Seitheben", geraet: "Kurzhantel", saetze: 3, wdh: "12 bis 15", hinweis: "letzter Satz RIR 0" },
      { name: "Triceps Pushdown", geraet: "Kabelzug, gerade Stange", saetze: 3, wdh: "10 bis 12", key: "trizeps pushdowns" },
      { name: "Bizeps Curls", geraet: "Kurzhantel", saetze: 3, wdh: "10 bis 12" }
    ]
  },
  {
    id: "freitag",
    tag: "Freitag",
    kurz: "Fr.",
    titel: "Beine B",
    fokus: "Hinge, Gesäß",
    wochentage: [5],
    uebungen: [
      { name: "Romanian Deadlift", geraet: "Langhantel", saetze: 3, wdh: "6 bis 8" },
      { name: "Hip Thrust", geraet: "Langhantel", saetze: 3, wdh: "8 bis 12", key: "hip thrusts" },
      { name: "Beinbeuger sitzend", geraet: "Maschine", saetze: 3, wdh: "10 bis 12", key: "beinbeuger, sitzend" },
      { name: "Hyper Extensions", geraet: "Po-Fokus", saetze: 3, wdh: "10 bis 15" },
      { name: "Abduktoren", geraet: "Maschine", saetze: 3, wdh: "12 bis 15" },
      { name: "Calf Raises", geraet: "Langhantel", saetze: 3, wdh: "12 bis 20" },
      { name: "Wood Choppers horizontal", geraet: "Kabelzug", saetze: 3, wdh: "10 bis 12 je Seite" }
    ]
  },
  {
    id: "wochenende",
    tag: "Sa. oder So.",
    kurz: "Sa./So.",
    titel: "Oberkörper B",
    fokus: "",
    optional: true,
    wochentage: [6, 0],
    uebungen: [
      { name: "Butterfly", geraet: "Pec Deck", saetze: 3, wdh: "10 bis 15" },
      { name: "Lat Pullover", geraet: "Kabelzug, Stange, stehend", saetze: 3, wdh: "10 bis 12" },
      { name: "Face Pulls", geraet: "", saetze: 3, wdh: "12 bis 15" },
      { name: "Triceps Overhead", geraet: "Kabelzug", saetze: 3, wdh: "10 bis 12" },
      { name: "Hammer Curls", geraet: "Kurzhantel", saetze: 3, wdh: "10 bis 12", key: "hammercurls, stehend" },
      { name: "Crunches", geraet: "", saetze: 3, wdh: "10 bis 15" }
    ]
  }
];
