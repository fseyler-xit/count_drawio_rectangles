const fs = require('fs');
const { DOMParser } = require('xmldom');

function parseDrawioRectangles(xmlString) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

    const cells = xmlDoc.getElementsByTagName("mxCell");
    const rectangles = [];

    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        const style = cell.getAttribute("style");
        const geometry = cell.getElementsByTagName("mxGeometry")[0];

        if (style && style.includes("shape=rectangle") && geometry) {
            const x = geometry.getAttribute("x") || "0";
            const y = geometry.getAttribute("y") || "0";
            const width = geometry.getAttribute("width") || "0";
            const height = geometry.getAttribute("height") || "0";

            rectangles.push({
                id: cell.getAttribute("id"),
                x: parseFloat(x),
                y: parseFloat(y),
                width: parseFloat(width),
                height: parseFloat(height)
            });
        }
    }

    return rectangles;
}

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


// Datei einlesen
// const filePath = 'diagram.drawio'; // Pfad zur Datei
const filePath = 'C:\\Users\\FrankSeylerX-IT\\OneDrive - X-IT GmbH\\Organisation\\X-IT Organigramm.drawio';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error("Fehler beim Lesen der Datei:", err);
        return;
    }

    // const rectangles = parseDrawioRectangles(data);
    const rectangles = countRectangles(data);
    console.log(`Gefundene Rechtecke: ${rectangles}`);
});