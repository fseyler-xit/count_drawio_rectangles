const { DOMParser } = require('xmldom');
const fs = require('fs');

function countRectangles(drawioXml) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(drawioXml, "text/xml");
    const cells = xmlDoc.getElementsByTagName("mxCell");

    let rectangleCount = 0;

    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        const style = cell.getAttribute("style");

        if (style && style.includes("whiteSpace=wrap") && (style.includes("rounded=0"))) {
        // if (style && style.includes("shape=rectangle")) {
            rectangleCount++;
        }
    }

    return rectangleCount;
}



// Datei-Pfad aus den Kommandozeilenargumenten lesen (2. Argument)
const filePath = process.argv[2];

if (!filePath) {
    console.error("Bitte geben Sie den Pfad zur Datei als Argument an.");
    console.error("Beispiel: node script.js 'C:\\Pfad\\zur\\Datei.drawio'");
    process.exit(1);
}

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error("Fehler beim Lesen der Datei:", err);
        return;
    }

    // Hier deine Funktion zum Verarbeiten der Datei
    const rectangles = countRectangles(data); // oder parseDrawioRectangles(data)
    console.log(`Gefundene Rechtecke: ${rectangles}`);
});
