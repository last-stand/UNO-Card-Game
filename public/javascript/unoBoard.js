
var generateCards = function(numberOfCards) {
	var mDiv = document.getElementById("mDiv");
	for(int i=0; i<numberOfCards;i++){
	    mDiv.innerHTML = "<img id= 'card"+i+"' src='./Unocard PIcs/m1.png' "+
	    "style='position:absolute;' height='6%' width='1.2%'>"
	}
}