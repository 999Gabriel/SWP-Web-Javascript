// Klasse Person (vn, nn, alter) def!
class Person 
{
    constructor(vn, nn, alter) 
    {
        this.vn = vn;
        this.nn = nn;
        this.alter = alter;
    }

    // set Name methode mit fixem namen
    setName(vn, nn) 
    {
        this.vn = vn;
        this.nn = nn;
    }

    getName() 
    {
        return `Die Person heißt: $
        {this.vn} $
        {this.nn}`;
    }

    // name() methode
    name() 
    {
        return `$
        {this.vn} $
        {this.nn}`;
    }
}

function printObject(obj) 
{
    let result = [];
    for (let key in obj) 
    {
        if (obj.hasOwnProperty(key)) 
            {
            result.push(`$
                {key} = $
                {obj[key]}`);
            console.log(`$
                {key}: $
                {obj[key]}`);
        }
    }
    return result;
}

// Objekt erstellen
const person = new Person("Gabriel", "Winkler", 18);

// Objekt mit console.log ausgeben
console.log(person);
console.log("Name:", person.name());
console.log("Name Methode (ohne Klammern):", person.name);
console.log("Vollständige Info:", person.getName());
console.log("Alter:", person.alter);

// printObject aufrufen
const objectProperties = printObject(person);
console.log("PrintObject Ausgabe:", objectProperties);

// Array:
let farben = ["rot", "gelb", "grün", "blau"];
farben.push("lila");
console.log("Farben Array:", farben);
console.log("Array Länge:", farben.length);

// For-of Schleife
console.log("For-of Schleife:");
for (let f of farben) 
{
    console.log(f);
}

// forEach Methode
console.log("ForEach Methode:");
farben.forEach(function(f, index) 
{
    console.log(`$
        {index}: $
        {f}`);

farben.length = 1;
console.log(farben);

farben.length = 5;
console.log(farben);
});