/* Navigaatio responsiivisuudessa */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "header_navigaatio") {
        x.className += " responsive";
    } else {
        x.className = "header_navigaatio";
    }
}