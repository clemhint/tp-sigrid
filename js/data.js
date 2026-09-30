// Trainingsplan Sigrid (aus TP_Sigrid.docx)
// Übungen mit identischem Namen teilen sich den Gewichtsverlauf (key).
const TRAININGSPLAN = [
  {
    id: "tag1",
    tag: "Tag 1",
    wochentag: "Di.",
    wochentage: [2],
    uebungen: [
      { name: "Squat", geraet: "Langhantel", saetze: 3, wdh: "6 bis 8" },
      { name: "Schrägbankdrücken", geraet: "Kurzhantel", saetze: 3, wdh: "8 bis 10" },
      { name: "Seitheben, sitzend", geraet: "Kurzhantel", saetze: 3, wdh: "12 bis 15" },
      { name: "Latzug, breit", geraet: "Maschine", saetze: 3, wdh: "8 bis 10" },
      { name: "Beinbeuger, sitzend", geraet: "Maschine", saetze: 3, wdh: "10 bis 12" },
      { name: "Face Pulls oder Rudern breit", geraet: "Kabelzug od. Maschine", saetze: 3, wdh: "12 bis 15" },
      { name: "Kickbacks", geraet: "Kabelzug", saetze: 3, wdh: "10 bis 12 je Seite" },
      { name: "Pallof Press", geraet: "Kabelzug", saetze: 3, wdh: "10 bis 12 je Seite" }
    ]
  },
  {
    id: "tag2",
    tag: "Tag 2",
    wochentag: "Do.",
    wochentage: [4],
    uebungen: [
      { name: "Romanian Deadlift", geraet: "Langhantel", saetze: 3, wdh: "6 bis 8" },
      { name: "Bulgarian Split Squat oder Ausfallschritte", geraet: "Kurzhantel, Multipresse", saetze: 3, wdh: "8 bis 10 je Seite" },
      { name: "Kabelrudern, eng", geraet: "Kabelzug", saetze: 3, wdh: "8 bis 10" },
      { name: "Schulterdrücken, sitzend", geraet: "Kurzhantel", saetze: 3, wdh: "8 bis 10" },
      { name: "Bizepscurls, sitzend", geraet: "Kurzhantel", saetze: 3, wdh: "10 bis 12" },
      { name: "Trizeps Pushdowns", geraet: "Kabelzug", saetze: 3, wdh: "10 bis 12" },
      { name: "Beinheben liegend", geraet: "Schrägbank", saetze: 3, wdh: "10 bis 15" },
      { name: "Crunch", geraet: "Kabelzug oder Maschine", saetze: 3, wdh: "10 bis 12" }
    ]
  },
  {
    id: "tag3",
    tag: "Tag 3",
    wochentag: "Fr.",
    wochentage: [5],
    uebungen: [
      { name: "Hip Thrusts", geraet: "Langhantel", saetze: 3, wdh: "8 bis 12" },
      { name: "Beinpresse", geraet: "Maschine", saetze: 3, wdh: "10 bis 12" },
      { name: "Brustpresse od. Bankdrücken", geraet: "Maschine od. Gerät", saetze: 3, wdh: "8 bis 12" },
      { name: "Klimmzüge od. Latzug (eng)", geraet: "", saetze: 3, wdh: "8 bis 12" },
      { name: "Beinstrecker, sitzend", geraet: "Maschine", saetze: 3, wdh: "10 bis 12" },
      { name: "Seitheben stehend", geraet: "Kurzhantel", saetze: 3, wdh: "12 bis 15" },
      { name: "Abduktoren", geraet: "Maschine", saetze: 3, wdh: "12 bis 15" },
      { name: "Adduktoren", geraet: "Maschine", saetze: 3, wdh: "12 bis 15" },
      { name: "Wadenheben", geraet: "Multipresse", saetze: 3, wdh: "12 bis 20" }
    ]
  },
  {
    id: "tag4",
    tag: "Tag 4",
    wochentag: "Sa., So. oder Mo.",
    hinweis: "optional, zusätzlich zu Tage 1-3",
    wochentage: [6, 0, 1],
    uebungen: [
      { name: "Schulterdrücken", geraet: "Kurzhantel", saetze: 3, wdh: "8 bis 10" },
      { name: "Rudern eng", geraet: "Kabelzug od. Maschine", saetze: 3, wdh: "10 bis 12" },
      { name: "Face Pulls oder Rudern breit", geraet: "Kabelzug od. Maschine", saetze: 3, wdh: "12 bis 15" },
      { name: "Hammercurls, stehend", geraet: "Kurzhantel", saetze: 3, wdh: "10 bis 12" },
      { name: "Trizeps Pushdowns", geraet: "Kabelzug", saetze: 3, wdh: "10 bis 12" },
      { name: "Pallof Press oder Plank", geraet: "", saetze: 3, wdh: "je 10 bis 12" }
    ]
  },
  {
    id: "tag5",
    tag: "Tag 5",
    wochentag: "So. oder Mo.",
    hinweis: "optional kurz, zusätzlich zu Tage 1-4",
    wochentage: [0, 1],
    uebungen: [
      { name: "Abduktoren", geraet: "Maschine", saetze: 3, wdh: "12 bis 15" },
      { name: "Adduktoren", geraet: "Maschine", saetze: 3, wdh: "12 bis 15" },
      { name: "Wadenheben", geraet: "Multipresse", saetze: 3, wdh: "12 bis 20" },
      { name: "Beinheben liegend", geraet: "Schrägbank", saetze: 3, wdh: "10 bis 15" }
    ]
  }
];
