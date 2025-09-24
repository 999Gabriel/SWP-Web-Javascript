// Personen-Array mit allen erforderlichen Daten
const personen = [
    {
        id: 1,
        vorname: "Anna",
        nachname: "Müller",
        geburtsdatum: "15.03.1995",
        bild: "A"
    },
    {
        id: 2,
        vorname: "Max",
        nachname: "Schmidt",
        geburtsdatum: "22.07.1988",
        bild: "M"
    },
    {
        id: 3,
        vorname: "Lisa",
        nachname: "Weber",
        geburtsdatum: "08.11.1992",
        bild: "L"
    },
    {
        id: 4,
        vorname: "Tom",
        nachname: "Fischer",
        geburtsdatum: "03.05.1990",
        bild: "T"
    },
    {
        id: 5,
        vorname: "Sarah",
        nachname: "Bauer",
        geburtsdatum: "19.09.1987",
        bild: "S"
    }
];

// DOM-Elemente referenzieren
const aufbauenBtn = document.getElementById('aufbauenBtn');
const personenText = document.getElementById('personenText');
const personenContainer = document.getElementById('personenContainer');

// Event Listener für den Aufbauen-Button
aufbauenBtn.addEventListener('click', function() {
    // Button entfernen
    aufbauenBtn.remove();
    
    // Personen-Text aktualisieren
    personenText.textContent = `Personen: ${personen.length} gefunden`;
    
    // Container sichtbar machen
    personenContainer.style.display = 'grid';
    
    // Personen erstellen und anzeigen
    erstellePersonenKarten();
});

// Funktion zum Erstellen der Personen-Karten ohne innerHTML
function erstellePersonenKarten() {
    personen.forEach(function(person) {
        // Hauptkarten-Container erstellen
        const personCard = document.createElement('div');
        personCard.className = 'person-card';
        
        // Bild-Container erstellen
        const personImage = document.createElement('div');
        personImage.className = 'person-image';
        personImage.textContent = person.bild;
        
        // Name erstellen
        const personName = document.createElement('div');
        personName.className = 'person-name';
        personName.textContent = `${person.vorname} ${person.nachname}`;
        
        // ID erstellen
        const personId = document.createElement('div');
        personId.className = 'person-id';
        personId.textContent = `ID: ${person.id}`;
        
        // Geburtsdatum erstellen
        const personBirth = document.createElement('div');
        personBirth.className = 'person-birth';
        personBirth.textContent = `Geboren: ${person.geburtsdatum}`;
        
        // Alle Elemente zur Karte hinzufügen
        personCard.appendChild(personImage);
        personCard.appendChild(personName);
        personCard.appendChild(personId);
        personCard.appendChild(personBirth);
        
        // Karte zum Container hinzufügen
        personenContainer.appendChild(personCard);
    });
}

// Alternative Funktion mit createElement und setAttribute für mehr DOM-Praxis
function erstellePersonMitAttributes(person) {
    const card = document.createElement('div');
    card.setAttribute('class', 'person-card');
    card.setAttribute('data-person-id', person.id);
    
    const image = document.createElement('div');
    image.setAttribute('class', 'person-image');
    const imageText = document.createTextNode(person.bild);
    image.appendChild(imageText);
    
    const name = document.createElement('div');
    name.setAttribute('class', 'person-name');
    const nameText = document.createTextNode(`${person.vorname} ${person.nachname}`);
    name.appendChild(nameText);
    
    const id = document.createElement('div');
    id.setAttribute('class', 'person-id');
    const idText = document.createTextNode(`ID: ${person.id}`);
    id.appendChild(idText);
    
    const birth = document.createElement('div');
    birth.setAttribute('class', 'person-birth');
    const birthText = document.createTextNode(`Geboren: ${person.geburtsdatum}`);
    birth.appendChild(birthText);
    
    // Elemente zusammenfügen
    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(id);
    card.appendChild(birth);
    
    return card;
}

// DOM Content Loaded Event für zusätzliche Sicherheit
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM vollständig geladen');
    console.log(`${personen.length} Personen im Array verfügbar`);
});