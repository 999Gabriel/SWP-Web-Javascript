/**
 * =====================================================================================
 * 📋 DATENSTRUKTUREN UND GLOBALE VARIABLEN
 * =====================================================================================
 */

// Standard-Personen-Array (wird nur verwendet, wenn keine gespeicherten Daten vorhanden sind)
// Diese Daten werden geladen, wenn der Browser zum ersten Mal besucht wird
const standardPersonen = [
    {
        id: 1,                          // Eindeutige Identifikationsnummer
        vorname: "Anna",                // Vorname der Person
        nachname: "Müller",             // Nachname der Person
        geburtsdatum: "15.03.1995",     // Geburtsdatum im Format DD.MM.YYYY
        bild: "👩‍💻"                      // Emoji als Avatar
    },
    {
        id: 2,
        vorname: "Max",
        nachname: "Schmidt",
        geburtsdatum: "22.07.1988",
        bild: "👨‍💻"
    },
    {
        id: 3,
        vorname: "Lisa",
        nachname: "Weber",
        geburtsdatum: "08.11.1992",
        bild: "👩‍💻"
    },
    {
        id: 4,
        vorname: "Tom",
        nachname: "Fischer",
        geburtsdatum: "03.05.1990",
        bild: "👨‍💻"
    },
    {
        id: 5,
        vorname: "Sarah",
        nachname: "Bauer",
        geburtsdatum: "19.09.1987",
        bild: "👩‍💻"
    }
];

// Personen-Array (wird beim Laden der Seite initialisiert)
// 'let' statt 'const', weil wir das Array später ändern können (hinzufügen, löschen, bearbeiten)
let personen = [];

/**
 * =====================================================================================
 * 💾 LOCALSTORAGE-FUNKTIONEN (PERSISTENTE DATENSPEICHERUNG)
 * =====================================================================================
 */

/**
 * Speichert das aktuelle Personen-Array im Browser-Speicher (localStorage)
 * localStorage ist ein Browser-Feature, das Daten auch nach dem Schließen des Browsers behält
 */
function speicherePersonen() {
    // JSON.stringify() wandelt das JavaScript-Array in einen String um
    // localStorage kann nur Strings speichern, keine Objekte
    localStorage.setItem('personen', JSON.stringify(personen));
    console.log('Personen wurden gespeichert:', personen);
}

/**
 * Lädt die gespeicherten Personen aus dem Browser-Speicher
 * Falls keine Daten vorhanden sind, werden die Standard-Personen geladen
 */
function ladePersonen() {
    // Versuche, gespeicherte Daten aus localStorage zu holen
    const gespeichertePersonen = localStorage.getItem('personen');
    
    if (gespeichertePersonen) {
        // Daten gefunden! JSON.parse() wandelt den String zurück in ein JavaScript-Array
        personen = JSON.parse(gespeichertePersonen);
        console.log('Personen wurden geladen:', personen);
    } else {
        // Keine Daten gefunden - verwende Standard-Personen
        // [...standardPersonen] erstellt eine Kopie des Arrays (Spread-Operator)
        personen = [...standardPersonen];
        speicherePersonen(); // Speichere die Standard-Personen für das nächste Mal
        console.log('Standard-Personen wurden geladen und gespeichert');
    }
}

/**
 * =====================================================================================
 * 🎯 DOM-ELEMENTE UND BENACHRICHTIGUNGSSYSTEM
 * =====================================================================================
 */

// DOM-Elemente referenzieren (Verbindung zu den HTML-Elementen)
const aufbauenBtn = document.getElementById('aufbauenBtn');        // Der "Aufbauen" Button
const personenText = document.getElementById('personenText');      // Text der Personenzahl anzeigt
const personenContainer = document.getElementById('personenContainer'); // Container für die Tabelle

/**
 * Zeigt eine Benachrichtigung am oberen rechten Bildschirmrand an
 * @param {string} nachricht - Der Text der angezeigt werden soll
 * @param {string} typ - Art der Benachrichtigung: 'success', 'error', oder 'info'
 */
function zeigeBenachrichtigung(nachricht, typ = 'success') {
    // Bestehende Benachrichtigung entfernen (nur eine zur Zeit anzeigen)
    const bestehendeBenachrichtigung = document.querySelector('.benachrichtigung');
    if (bestehendeBenachrichtigung) {
        bestehendeBenachrichtigung.remove();
    }
    
    // Neue Benachrichtigung als HTML-Element erstellen
    const benachrichtigung = document.createElement('div');
    benachrichtigung.className = `benachrichtigung benachrichtigung-${typ}`;
    
    // HTML-Inhalt mit Template-String erstellen
    // Template-Strings verwenden Backticks (`) und ${} für Variablen
    benachrichtigung.innerHTML = `
        <div class="benachrichtigung-inhalt">
            <span class="benachrichtigung-icon">${typ === 'success' ? '✅' : typ === 'error' ? '❌' : 'ℹ️'}</span>
            <span class="benachrichtigung-text">${nachricht}</span>
            <button class="benachrichtigung-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Benachrichtigung zum Body hinzufügen (wird sichtbar)
    document.body.appendChild(benachrichtigung);
    
    // Auto-remove nach 4 Sekunden (setTimeout führt Code nach Verzögerung aus)
    setTimeout(() => {
        // Prüfen ob Element noch existiert, bevor es entfernt wird
        if (benachrichtigung.parentElement) {
            benachrichtigung.remove();
        }
    }, 4000);
}

/**
 * =====================================================================================
 * 🪟 MODAL-DIALOG SYSTEM
 * =====================================================================================
 */

/**
 * Zeigt einen Modal-Dialog zum Bearbeiten oder Hinzufügen einer Person an
 * @param {Object|null} person - Person-Objekt zum Bearbeiten oder null für neue Person
 */
function zeigePersonModal(person = null) {
    // Prüfen ob wir eine Person bearbeiten oder eine neue hinzufügen
    const istBearbeitung = person !== null;
    
    // Modal-Overlay (Hintergrund) erstellen
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    
    // Modal-Inhalt als HTML-String erstellen
    // Template-Strings erlauben mehrzeilige Strings und Variablen-Einbettung
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${istBearbeitung ? 'Person bearbeiten' : 'Neue Person hinzufügen'}</h2>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
            </div>
            <form class="person-form" onsubmit="return false;">
                <div class="form-group">
                    <label for="vorname">Vorname:</label>
                    <input type="text" id="vorname" value="${person ? person.vorname : ''}" required>
                </div>
                <div class="form-group">
                    <label for="nachname">Nachname:</label>
                    <input type="text" id="nachname" value="${person ? person.nachname : ''}" required>
                </div>
                <div class="form-group">
                    <label for="geburtsdatum">Geburtsdatum:</label>
                    <input type="text" id="geburtsdatum" value="${person ? person.geburtsdatum : ''}" 
                           placeholder="DD.MM.YYYY" required>
                </div>
                <div class="form-group">
                    <label for="bild">Bild (Emoji):</label>
                    <select id="bild">
                        <option value="👤" ${person && person.bild === '👤' ? 'selected' : ''}>👤 Standard</option>
                        <option value="👩‍💻" ${person && person.bild === '👩‍💻' ? 'selected' : ''}>👩‍💻 Frau</option>
                        <option value="👨‍💻" ${person && person.bild === '👨‍💻' ? 'selected' : ''}>👨‍💻 Mann</option>
                        <option value="👨‍🎓" ${person && person.bild === '👨‍🎓' ? 'selected' : ''}>👨‍🎓 Student</option>
                        <option value="👩‍🎓" ${person && person.bild === '👩‍🎓' ? 'selected' : ''}>👩‍🎓 Studentin</option>
                        <option value="👨‍🏫" ${person && person.bild === '👨‍🏫' ? 'selected' : ''}>👨‍🏫 Lehrer</option>
                        <option value="👩‍🏫" ${person && person.bild === '👩‍🏫' ? 'selected' : ''}>👩‍🏫 Lehrerin</option>
                    </select>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">Abbrechen</button>
                    <button type="submit" class="btn-primary">${istBearbeitung ? 'Aktualisieren' : 'Hinzufügen'}</button>
                </div>
            </form>
        </div>
    `;
    
    // Modal zum Body hinzufügen (wird sichtbar)
    document.body.appendChild(modal);
    
    // Event Listener für das Formular hinzufügen
    const form = modal.querySelector('.person-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Verhindert das normale Form-Submit-Verhalten
        
        // Werte aus den Eingabefeldern holen
        const vorname = document.getElementById('vorname').value.trim();     // .trim() entfernt Leerzeichen
        const nachname = document.getElementById('nachname').value.trim();
        const geburtsdatum = document.getElementById('geburtsdatum').value.trim();
        const bild = document.getElementById('bild').value;
        
        // Validierung: Alle Felder müssen ausgefüllt sein
        if (!vorname || !nachname || !geburtsdatum) {
            zeigeBenachrichtigung('Bitte füllen Sie alle Felder aus!', 'error');
            return; // Funktion beenden, wenn Validierung fehlschlägt
        }
        
        if (istBearbeitung) {
            // ===== PERSON BEARBEITEN =====
            person.vorname = vorname;
            person.nachname = nachname;
            person.geburtsdatum = geburtsdatum;
            person.bild = bild;
            
            speicherePersonen();           // Änderungen speichern
            aktualisiereTabelle();         // Tabelle neu zeichnen
            zeigeBenachrichtigung(`Person "${vorname} ${nachname}" wurde erfolgreich aktualisiert!`, 'success');
        } else {
            // ===== NEUE PERSON HINZUFÜGEN =====
            // Neue ID generieren: Höchste vorhandene ID + 1
            const neueId = personen.length > 0 ? Math.max(...personen.map(p => p.id)) + 1 : 1;
            
            // Neues Person-Objekt erstellen
            const neuePerson = {
                id: neueId,
                vorname: vorname,
                nachname: nachname,
                geburtsdatum: geburtsdatum,
                bild: bild
            };
            
            personen.push(neuePerson);     // Person zum Array hinzufügen
            speicherePersonen();           // Array speichern
            aktualisiereTabelle();         // Tabelle neu zeichnen
            personenText.textContent = `Personen: ${personen.length} gefunden`; // Zähler aktualisieren
            zeigeBenachrichtigung(`Person "${vorname} ${nachname}" wurde erfolgreich hinzugefügt!`, 'success');
        }
        
        modal.remove(); // Modal schließen
    });
    
    // Fokus auf erstes Eingabefeld setzen (bessere Benutzerfreundlichkeit)
    document.getElementById('vorname').focus();
}

/**
 * =====================================================================================
 * 🎮 EVENT LISTENER UND HAUPTFUNKTIONEN
 * =====================================================================================
 */

// Event Listener für den "Aufbauen" Button
// Wird ausgeführt, wenn der Benutzer auf den Button klickt
aufbauenBtn.addEventListener('click', function() {
    // ===== LOADING-ANIMATION STARTEN =====
    aufbauenBtn.innerHTML = 'Lade...';        // Button-Text ändern
    aufbauenBtn.disabled = true;              // Button deaktivieren (verhindert mehrfaches Klicken)
    
    // Simuliere kurze Ladezeit für bessere Benutzererfahrung
    // setTimeout führt Code nach einer bestimmten Zeit aus (800ms = 0.8 Sekunden)
    setTimeout(() => {
        // ===== TABELLE ERSTELLEN =====
        aufbauenBtn.remove();                 // Button aus dem DOM entfernen
        
        personenText.textContent = `Personen: ${personen.length} gefunden`; // Zähler anzeigen
        personenContainer.style.display = 'block';  // Container sichtbar machen
        
        erstellePersonenTabelle();            // Tabelle erstellen und anzeigen
        
        // Erfolgs-Benachrichtigung anzeigen
        zeigeBenachrichtigung(`Tabelle mit ${personen.length} Personen erfolgreich geladen!`, 'success');
    }, 800);
});

/**
 * =====================================================================================
 * 📊 TABELLEN-ERSTELLUNG
 * =====================================================================================
 */

/**
 * Erstellt die HTML-Tabelle mit allen Personen und fügt sie in den Container ein
 * Verwendet innerHTML für bessere Performance als createElement
 */
function erstellePersonenTabelle() {
    // ===== TABELLEN-HEADER ERSTELLEN =====
    // Template-String für die komplette Tabelle
    let tabelleHTML = `
        <table class="personen-tabelle">
            <thead>
                <tr>
                    <th>Bild</th>
                    <th>ID</th>
                    <th>Vorname</th>
                    <th>Nachname</th>
                    <th>Geburtsdatum</th>
                    <th>Bearbeiten</th>
                    <th>Löschen</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    // ===== FÜR JEDE PERSON EINE ZEILE HINZUFÜGEN =====
    // forEach durchläuft jedes Element im personen-Array
    personen.forEach(function(person) {
        // HTML für eine Tabellenzeile erstellen
        // data-person-id wird für CSS-Selektoren und JavaScript verwendet
        tabelleHTML += `
            <tr data-person-id="${person.id}">
                <td class="bild-cell">${person.bild}</td>
                <td class="id-cell">${person.id}</td>
                <td class="vorname-cell">${person.vorname}</td>
                <td class="nachname-cell">${person.nachname}</td>
                <td class="geburtsdatum-cell">${person.geburtsdatum}</td>
                <td class="bearbeiten-cell">
                    <button class="icon-btn bearbeiten-icon-btn" id="edit-btn-${person.id}" onclick="bearbeitePerson(${person.id})" title="Person bearbeiten">
                        <img src="https://cdn-icons-png.flaticon.com/512/1828/1828270.png" alt="Bearbeiten" class="action-icon">
                    </button>
                </td>
                <td class="loeschen-cell">
                    <button class="icon-btn loeschen-icon-btn" id="delete-btn-${person.id}" onclick="loeschePerson(${person.id})" title="Person löschen">
                        <img src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" alt="Löschen" class="action-icon">
                    </button>
                </td>
            </tr>
        `;
    });
    
    // ===== TABELLEN-ENDE UND BUTTON HINZUFÜGEN =====
    tabelleHTML += `
            </tbody>
        </table>
        <button class="neue-person-btn" onclick="fuegeNeuePersonHinzu()">Neue Person hinzufügen</button>
    `;
    
    // HTML in den Container einfügen (innerHTML ist schneller als createElement)
    personenContainer.innerHTML = tabelleHTML;
}

/**
 * =====================================================================================
 * 🔧 CRUD-FUNKTIONEN (CREATE, READ, UPDATE, DELETE)
 * =====================================================================================
 */

/**
 * Öffnet den Modal-Dialog zum Bearbeiten einer Person
 * @param {number} personId - ID der zu bearbeitenden Person
 */
function bearbeitePerson(personId) {
    // Person im Array finden (find() gibt das erste passende Element zurück)
    const person = personen.find(p => p.id === personId);
    
    if (person) {
        // Modal mit der gefundenen Person öffnen
        zeigePersonModal(person);
    }
}

/**
 * Löscht eine Person aus dem Array nach Bestätigung
 * @param {number} personId - ID der zu löschenden Person
 */
function loeschePerson(personId) {
    // Person im Array finden
    const person = personen.find(p => p.id === personId);
    
    if (person) {
        // Bestätigungsdialog mit Personennamen anzeigen
        if (confirm(`Möchten Sie "${person.vorname} ${person.nachname}" wirklich löschen?`)) {
            // Index der Person im Array finden
            const index = personen.findIndex(p => p.id === personId);
            
            if (index > -1) {
                // Person aus Array entfernen (splice() entfernt Element und gibt es zurück)
                const geloeschtePerson = personen.splice(index, 1)[0];
                
                // ===== NACH DEM LÖSCHEN =====
                speicherePersonen();           // Änderungen speichern
                aktualisiereTabelle();         // Tabelle neu zeichnen
                personenText.textContent = `Personen: ${personen.length} gefunden`; // Zähler aktualisieren
                
                // Erfolgs-Benachrichtigung mit Namen der gelöschten Person
                zeigeBenachrichtigung(`Person "${geloeschtePerson.vorname} ${geloeschtePerson.nachname}" wurde erfolgreich gelöscht!`, 'success');
            }
        }
    }
}

/**
 * Öffnet den Modal-Dialog zum Hinzufügen einer neuen Person
 */
function fuegeNeuePersonHinzu() {
    // Modal ohne Person-Parameter öffnen (null = neue Person)
    zeigePersonModal();
}

/**
 * =====================================================================================
 * 🔄 HILFSFUNKTIONEN
 * =====================================================================================
 */

/**
 * Aktualisiert die Tabelle mit einer sanften Fade-Animation
 * Wird nach Änderungen am Personen-Array aufgerufen
 */
function aktualisiereTabelle() {
    // ===== FADE-OUT ANIMATION =====
    personenContainer.style.opacity = '0.5';              // Container halbtransparent machen
    personenContainer.style.transition = 'opacity 0.3s ease'; // Sanfte Übergangsanimation
    
    // Nach kurzer Verzögerung (150ms) Tabelle neu erstellen
    setTimeout(() => {
        // Container komplett leeren
        personenContainer.innerHTML = '';
        
        // Tabelle mit aktuellen Daten neu erstellen
        erstellePersonenTabelle();
        
        // ===== FADE-IN ANIMATION =====
        personenContainer.style.opacity = '1'; // Container wieder vollständig sichtbar machen
    }, 150);
}

/**
 * =====================================================================================
 * 📚 ALTERNATIVE FUNKTIONEN (FÜR REFERENZ BEHALTEN)
 * =====================================================================================
 */

/**
 * Erstellt Personen-Karten mit createElement (Alternative zu innerHTML)
 * Diese Funktion wird nicht mehr verwendet, aber als Referenz behalten
 * Zeigt, wie man DOM-Elemente manuell erstellt
 */
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

/**
 * Erstellt eine Person-Karte mit setAttribute (Alternative Methode)
 * Zeigt verschiedene Wege, DOM-Elemente zu erstellen
 * @param {Object} person - Person-Objekt
 * @returns {HTMLElement} - Erstellte Karte
 */
function erstellePersonMitAttributes(person) {
    // Karten-Container mit Attributen erstellen
    const card = document.createElement('div');
    card.setAttribute('class', 'person-card');
    card.setAttribute('data-person-id', person.id);
    
    // Bild-Element mit createTextNode
    const image = document.createElement('div');
    image.setAttribute('class', 'person-image');
    const imageText = document.createTextNode(person.bild);
    image.appendChild(imageText);
    
    // Name-Element
    const name = document.createElement('div');
    name.setAttribute('class', 'person-name');
    const nameText = document.createTextNode(`${person.vorname} ${person.nachname}`);
    name.appendChild(nameText);
    
    // ID-Element
    const id = document.createElement('div');
    id.setAttribute('class', 'person-id');
    const idText = document.createTextNode(`ID: ${person.id}`);
    id.appendChild(idText);
    
    // Geburtsdatum-Element
    const birth = document.createElement('div');
    birth.setAttribute('class', 'person-birth');
    const birthText = document.createTextNode(`Geboren: ${person.geburtsdatum}`);
    birth.appendChild(birthText);
    
    // Alle Elemente zur Karte hinzufügen
    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(id);
    card.appendChild(birth);
    
    return card; // Karte zurückgeben
}

/**
 * =====================================================================================
 * 🚀 INITIALISIERUNG
 * =====================================================================================
 */

// DOM Content Loaded Event - wird ausgeführt, wenn die HTML-Seite vollständig geladen ist
// Dies ist sicherer als Code direkt auszuführen, da alle DOM-Elemente verfügbar sind
document.addEventListener('DOMContentLoaded', function() {
    // Personen aus localStorage laden (oder Standard-Personen verwenden)
    ladePersonen();
    
    // Debug-Informationen in der Konsole ausgeben
    console.log('DOM vollständig geladen');
    console.log(`${personen.length} Personen im Array verfügbar`);
});