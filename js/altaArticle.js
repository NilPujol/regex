//#region carrega
window.onload =
    function start() {
        valorsDesplegable();
        assignarTriggers();
    }



function valorsDesplegable() {
    var opcionsFamilia = ["Transparent", "BlancNegre", "Color", "Patata"];
    opcionsFamilia.sort();
    var desplegable = document.getElementById("desplegable-familia");

    for (var i = 0; i < opcionsFamilia.length; i++) {
        var opt = document.createElement("option");
        opt.value = opcionsFamilia[i];
        opt.innerHTML = opcionsFamilia[i];
        desplegable.appendChild(opt);
    }
}
//#endregion

//#region triggers
function assignarTriggers() {
    document.getElementById("desplegable-familia").onchange = comprovarCodi;
    document.getElementById("Codi").onchange = comprovarCodi;
    document.getElementsByName("dimensions").forEach(item => item.onchange = comprovarDimensions);
    (document.getElementsByTagName("input")[5]).onchange = comprovarPassadis;
    (document.getElementsByTagName("input")[6]).onchange = comprovarEstanteria;
    (document.getElementsByTagName("input")[7]).onchange = comprovarForat;
    document.getElementById("alta").onclick = comprovacioGeneral;
}
//#endregion

//#region comprovacions
function comprovarCodi() {
    var splitCodi = document.getElementById("Codi").value.split("-");
    var splitdesplegable = document.getElementById("desplegable-familia").value.substring(0, 3);
    if (splitCodi.length == 3 && splitCodi[0].toLowerCase() == splitdesplegable.toLowerCase() && new RegExp(/^[0-9]{7}$/).test(splitCodi[1])) {
        var codiNum = Number(sumStrNum(splitCodi[1]) % 10);
        var lletres = ["A", "X", "M", "T", "B", "C", "S", "O", "P", "Z"];
        if (lletres[codiNum] == splitCodi[2]) {
            document.getElementsByTagName('img')[0].src = "recursos/tick.png";
            return true;
        }
    }
    document.getElementsByTagName('img')[0].src = "recursos/cross.png";
    return false;
}
function comprovarDimensions() {
    var dimensions = document.getElementsByName("dimensions");
    var resultat = true;
    dimensions.forEach(dimensio => {
        if (Number(dimensio.value) <= 0 || isNaN(dimensio.value) || dimensio.value == "") {
            document.getElementsByClassName("calcul")[0].innerHTML = "";
            resultat = false;
        }
    });
    if (resultat) {
        document.getElementsByClassName("calcul")[0].innerHTML = dimensions[0].value + " x " + dimensions[1].value + " x " + dimensions[2].value;
    }
    return resultat;
}
function comprovarPassadis() {
    var regex = new RegExp(/^P-[0-9]{2}-(E|D)$/);
    if (regex.test(document.getElementsByTagName("input")[5].value)) {
        document.getElementsByTagName('img')[1].src = "recursos/tick.png";
        return true;
    }
    document.getElementsByTagName('img')[1].src = "recursos/cross.png";
    return false;
}
function comprovarEstanteria() {
    var regex = new RegExp(/^EST\+[0-9]{2}.[0-9]{2}$/);
    if (regex.test(document.getElementsByTagName("input")[6].value)) {
        document.getElementsByTagName('img')[2].src = "recursos/tick.png";
        return true;
    }
    document.getElementsByTagName('img')[2].src = "recursos/cross.png";
    return false;
}
function comprovarForat() {
    var regex = new RegExp(/^[0-9]{2}[A-z]{3}[0-9]{2}\\[0-9]{2}$/);
    if (regex.test(document.getElementsByTagName("input")[7].value)) {
        document.getElementsByTagName('img')[3].src = "recursos/tick.png";
        return true;
    }
    document.getElementsByTagName('img')[3].src = "recursos/cross.png";
    return false;
}
function comprovacioGeneral() {
    if (comprovarForat() && comprovarEstanteria() && comprovarPassadis() && comprovarDimensions() && comprovarCodi()) {
        document.getElementById('resultat').innerHTML =
            "Familia: " +
            document.getElementById("desplegable-familia").value + "<br>Codi:" +
            document.getElementById("Codi").value + "<br>Nom: " +
            document.getElementsByTagName("input")[1].value + "<br> Caracteristiques: " +
            document.getElementsByClassName("calcul")[0].innerHTML + "<br> Ubicació: " +
            document.getElementsByTagName("input")[5].value + "<br>       " +
            document.getElementsByTagName("input")[6].value + "<br>       " +
            document.getElementsByTagName("input")[7].value;

    }
    else {
        document.getElementById('resultat').innerHTML = " ";
    }
}
//#endregion

//#region utils
function sumStrNum(str) {
    var resultat = 0;
    (str.split("")).forEach(n => resultat += Number(n));
    return resultat;
}
//#endregion