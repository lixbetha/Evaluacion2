const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
var expressLayouts = require("express-ejs-layouts");

const app = express();

app.set("port", process.env.PORT || 3000);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressLayouts);
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("pages/home");
});

app.get("/about", (req, res) => {
    res.render("pages/about")
});

app.get("/contact", (req, res) => {
    res.render("pages/contact")
});

app.post('/contact', (req, res) =>{
    var name = req.body.name;
    var email = req.body.email;
    
    console.log('Nombre :' + req.body.name);
    console.log('Email :' + req.body.email);

    res.render('pages/contact_resp',{name, email});
});

app.get("/generator", (req, res) => {
    res.render("pages/generator")
});

app.post('/generator', (req, res) => {
    
    var name = req.body.name;
    var apat = req.body.apat;
    var amat = req.body.amat;
    var month = req.body.month;
    var day = req.body.day;
    var year = req.body.year;
    var gender = req.body.gender;
    var ent = req.body.ent;

    name = name.toUpperCase();
    apat = apat.toUpperCase();
    amat = amat.toUpperCase();

    
    const vocales = ["A", "E", "I", "O", "U"];

    function EX1 (nom) {
        quitar= new RegExp(/^(DA |DAS |DER |DI |DIE |DD |EL |LOS |LE |LES |MAC |MC |VAN |VON |Y |DE |DEL |LO |LOS |LA |LAS )+/);
        nombres=new RegExp(/^(MARIA |JOSE |MA |MA. |J |J.)/);
        nom=nom.replace(quitar,'');
        nom=nom.replace(nombres,'');
        nom=nom.replace(quitar,'');

        return nom;
    }

    name = EX1(name);

    function EX2 (apellido) {
        quitar= new RegExp(/^(DA |DAS |DER |DI |DIE |DD |EL |LOS |LE |LES |MAC |MC |VAN |VON |Y |DE |DEL |LO |LOS |LA |LAS )+/);
        apellido=apellido.replace(quitar,'');

        return apellido;
    }

    amat = EX2(amat);
    apat = EX2(apat);

    function EX3 (apellido) {
        if (apellido == '') {
            apellido = 'X';
        }
        return apellido;
    }

    amat = EX3(amat);

    function vocalPat(apat) {
        let counter = 0;
        for (let letra of apat) {
            if (vocales.includes(letra)) {
                apat = letra;
                break;
            }
        }
        return apat;
    }

    function months (month) {
        if (month < 10) {
            month = '0'+ month;
        }
        return month;
    }

    function days (day) {
        if (day < 10) {
            day = '0'+ day;
        }
        return day;
    }

    function makeHomo(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

    function makeDifer(year) {
        var result = '';
        var numbers =  '1234567890';
        var characters = 'ABCDEFGHIJ';
        
        if (year <= 1999) {
            result = numbers.charAt(Math.floor(Math.random())); 
        } else {
            result = characters.charAt(Math.floor(Math.random()));
        }

        return result;
    }

    function consonants(str) { 
        var consonant = ''; 
        for (var i = 0; i < str.length; i++) {
            if (str.charAt(i) !== "A" && str.charAt(i) !== "E" && str.charAt(i) !== "I" && str.charAt(i) !== "O" && str.charAt(i) !== "U" && str.charAt(i) !== " ") { 
                consonant = str.charAt(i);
                break;
            }

        } return consonant;
    } 
        


    var nameI = name[0];
    var apatI = apat[0];
    var amatI = amat[0];
    
    var curp = apatI + vocalPat(apat) + amatI + nameI + year[2] + year[3] + months(month) + days(day) + gender + ent + consonants(apat) + consonants(amat) + consonants(nameI) + makeDifer(year) + makeHomo(1);
    
    res.render('pages/mi_curp', {name, apat, amat, month, day, year, curp});
});

app.get('/mi_curp', (req, res) => {
    res.render('pages/mi_curp')
});

app.listen(app.get("port"), () => {
    console.log(`servidor en puerto ${app.get("port")}`)
});