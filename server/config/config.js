/* ======== 
PUERTO
========*/
process.env.PORT = process.env.PORT || 3000;


/* ======== 
ENTORNO
========*/
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/* ======== 
VENCIMIENTO DEL TOKEN
60s
60m
24h 
30d
========*/
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


/* ======== 
SEED DE AUTENTICACION
========*/
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

/* ======== 
GOOGLE CLIENT ID
========*/
process.env.CLIENT_ID = process.env.CLIENT_ID || '219347723222-domvvfvsu8uk4falkqi3ki8i4vmn4d0p.apps.googleusercontent.com';


/* ======== 
BASE DE DATOS
========*/
let urlDB
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;