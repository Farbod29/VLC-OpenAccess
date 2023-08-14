/*
const stopwords = require('remove-stopwords');


const oldString = 'du hast der shife gelinf die mich'.split(' ');
const newString = stopwords(oldString, 'de');

console.log(newString.toString());
*/
const sw = require('remove-stopwords');
//sw = require('stopword');
//const stopwords = require('remove-stopwords');
//let temp22 = temp1.replace(",", " ");
let string1 = "der,die,corona,und,das,sind,ist,den,auf,zu,werden,sich,von,mit,m,f,r,im,landkreis,bautzen,es,wieder,bei,hat,eine,wie,sie,dem,ein,einer,auch,menschen,personen,aktuell,des,als,noch,wurden,jetzt,vor,nicht,haben,damit,nach,um,der,corona,neuinfektionen,bis,derzeit,erkrankt,zwei,zum,nur,seit,die,zahl,der,ab,patienten,zur,aus,liegt,ber,insgesamt,montag,mehr,davon,infektion,das,gesundheitsamt,das,landratsamt,m,ssen,keine,einem,weitere,dass,ihre,oder,gelten,k,nnen,e,einen,alle,dieser,kamenz,wird,h,nkungen,gemeldet,einer,klinik,behandelt,f,lle,corona,infektionen,bautzener,freitag,bisher,bereits,aber,genesen,quarant,ne,donnerstag,neue,mittwoch,unter,tagen,waren,dienstag,getestet,drei,eines,dabei,konnten,tests,gro,bislang,uhr,sch,neuen,virus,wurde,b,positiv,getestete,daf,r,informiert,besucher,t,aufgehoben,worden,mai,sowie,angeordneten,quarant,nen,aktuell,angeordneten,quarant,m,glich,mund,nasen,bischofswerda,viele,schon,war,der,corona,pandemie,gibt,es,mit,dem,weiter,diese,nun';"
let temp22 = string1.replace(/,/g, " ");
console.log("temp22 : ");
console.log(temp22);
const oldString = temp22.split(' ');
// sw.sv contains swedish stopwords
const newString = sw.removeStopwords(oldString, 'de');
console.log(newString.toString());
// newString is now [ 'Trädgårdsägare', 'beredda', 'pröva', 'helst', 'hatade', 'mördarsniglarna', 'åäö' ]
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              ""
