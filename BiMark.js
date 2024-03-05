//Jeg laver en funktion for beefield med parameterne m og n
function beefield(m, n) {
    //Tilføjer en tom array line
    let field = [];

    //Jeg lave en for løkke som kører for 0 til mindre end n med iteratoren i
    for (let i = 0; i < n; i++) {
        //Tilføjer en tom array line
        let line = [];
        //Jeg laver en indre for løkke som kører for 0 til mindre end m med iteratoren j
        for (let j = 0; j < m; j++) {
            //Her benytter jeg metoden push for at tilføje hvert element ind i min tomme array
            line.push('🌱 🌱');
        };
        //Jeg benytter igen push metoden til at tilføje line til field array 
        field.push(line);
    };

    return field;
}

//console.log(beefield(5, 5)); //returner et array som er 5x5 af '🌱 🌱'

//Jeg laver en ny funktion print_field som skal visulisere marken i konsolen med parameteren field
function print_field(field) {
    let result = [];
    for (let i = 0; i < field.length; i++) {
        //Her benytter jeg metoderne push og join for at samle field arrayen inde i result arrayen
        result.push(field[i].join('')) 
    };
    console.log(result);
}

function flowerbed(n, m) {
    //Jeg laver variablen bed_x som er et tilfældigt tal mellem 0 og m-3
    let bed_x = Math.floor(Math.random() * (m-3));
    //Jeg laver variablen bed_y som er et tilfældigt tal mellem 0 og n-3
    let bed_y = Math.floor(Math.random() * (n-3));
    return [bed_y, bed_x];
}

//Her laver jeg en funktion som skal generer flowerbeds i field arrayen
function insert_bed(field, bed) { 
    for (let i = bed[0]; i < bed[0] + 3; i++) {
        for (let j = bed[1]; j < bed[1] + 3; j++) {
            field[i][j] = '🌱 🌻';
        }
    }
}

//Her laver jeg en funktion som tjekker om indexet har blomster og retunere true hvis det har, det bliver vigtigt senere
function has_flower(field, y, x) {
    if (field[y][x] === '🌱 🌻' || field[y][x] === '🐝 🌻') {
        return true;
    }
}

//Jeg laver en funktion som generer bierne
function bees(m, n, k) {
    //Jeg starter ud med at definere to tomme arrays som variablerne bi x og y (de skal vise biens x og y koordinat)
    let bees_x = [];
    let bees_y = [];

    //Jeg benytter en for løkke som fra 0 til mindre end k som er antallet af bier (det går fra 0 til < k da index i arrays går fra 0 og op)
    for (let i = 0; i < k; i++) {
        
        //Her skubbes de tilfældig genererede x og y koordinater for biernes position ind i arraysne
        bees_x.push(Math.floor(Math.random() * m));
        bees_y.push(Math.floor(Math.random() * n));
    }
    //Biernes position samles under et array
    return [bees_y, bees_x];
}

//Her laver jeg en funktion som vil sætter bier ind i arrayet
function put_bees(field, bees_y, bees_x) {
    //Jeg laver en for løkke som kørre fra 0 til array længden af bees_y (kan også udskiftes med bees_x)
    for (let i = 0; i < bees_y.length; i++) {
        let y = bees_y[i];
        let x = bees_x[i];
        
        //Her benytter jeg et if...else statement som tjekker om forrige function has_flower er true eller false og handler på det
        if (has_flower(field, y, x)) {
            field[y][x] = '🐝 🌻';
        } else {
            field[y][x] = '🐝 🌱';
        }
    }
}

//Her laver jeg en function for at fjerne bierne den minder opholder samme princip som put_bees men bliver called i en anden kontekst
function remove_bees(field, bees_y, bees_x) {
    for (let i = 0; i < bees_y.length; i++) {
        let y = bees_y[i];
        let x = bees_x[i];

        if (has_flower(field, y, x)) {
            field[y][x] = '🌱 🌻';
        } else {
            field[y][x] = '🌱 🌱';
        }
    }
}

//Her laver jeg en function som måler når bierne 'høster' en blomst
function bees_harvest(field, bees_y, bees_x) {
    //Vi stater med at definere variablen harvestload som er 0 da der ikke er høstet noget
    let harvestload = 0;
    //Jeg benytter derefter en for løkke til som kørre igennem fra 0 til længden af bees_y arrayet (kan også ændres til bees_x)
    for (let i = 0; i < bees_y.length; i++) {
        let y = bees_y[i];
        let x = bees_x[i];

        //Jeg benytter et if statement som tjekker om det er sandt at der er en blomst hvor bien er
        if (has_flower(field, y, x)) {
            field[y][x] = '🐝 🌱';
            harvestload++;
        } //Hvis condition er true tilføjes 1 til harvest load og array indexets string ændres fra '🐝 🌻' til '🐝 🌱'
    }
    //Her returner den totale harvestload når for løkken er kørt igennem
    return harvestload;
}

//Her laver jeg en funktion som skal flytte bierne i arrayet
function move_bees (field, old_bees_y, old_bees_x) {
    //Jeg caller den forrige funktion remove_bees
    remove_bees(field, old_bees_y, old_bees_x);

    let m = field[0].length;
    let n = field.length;
    //Her definerer jeg variablen new_bees som caller forrige funktion bees(m, n, k)
    let new_bees = bees(m, n, old_bees_y.length); //længden af old_bees_y bruges her som en indikator af antallet af bier
    return new_bees;
}

//Her laver jeg funktionen simulation som skal opsummere det hele
function simulation (m, n, num_bees) {
    let blomster = 9; //Antallet af blomster
    let field = beefield(m, n); //Caller beefield funktionen til field variablen
    let bed = flowerbed(n, m); //Caller flowerbed funktionen til bed variablen
    let iterationer = 0; //Definere en variable som skal måle iterationer, den starter med værdien 0
    let [bees_y, bees_x] = bees(m, n, num_bees); //Caller funktionen som skal give en ny bi position

    insert_bed(field, bed); //Indsætter bedet på marken
    put_bees(field, bees_y, bees_x); //Indsætter bierne på marken
    print_field(field); //Udskriver marken

    //Laver en while løkke som igennem indtil antallet af blomster > 0
    while (blomster > 0){
        iterationer++; //Tilføjer 1 for hver gnag løkken køres igennem så vi kan se hvor mange iterationer løkken kørrer før den når sit mål
        let harvestload = bees_harvest(field, bees_y, bees_x); //Måller harvest load bierne høster
        blomster -= harvestload;
        [bees_y, bees_x] = move_bees (field, bees_y, bees_x); //Bierne flyyter sig
        put_bees(field, bees_y, bees_x); //Put bierne på marken
        console.log(`${iterationer} iterationer : ${blomster} blomster`);
        print_field(field); //printer hver af simulation af marken for hver gang løkken kører
    }

}

simulation(5, 5, 3);