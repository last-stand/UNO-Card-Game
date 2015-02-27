var numberOfPlayers;
var generateCards = function(cardArray,divID,classNo) {
	var mDiv = document.getElementById(divID);
	var string = "";
	cardArray.forEach(function(card){
		string += "<img id= '"+card+"' src='./Unocard PIcs/"+card+".jpg' class='cardImg"+classNo+"'>";
	});
	mDiv.innerHTML = "<center>"+string+"</center>";
};

var printPlayers = function(array){
	var num = 0;
	var playerDiv = document.getElementById("playerInfo");
	var playerString = "";
	numberOfPlayers = 0;
	for (var i = 0; i < array.length; i++) {
		num = i+1;
		if(array[i][Object.keys(array[i])[0]]){
			playerString += "<h4>Player"+num+" : "+array[i][Object.keys(array[i])[0]]+"</h4><br>";
			numberOfPlayers++;
		}
		if(numberOfPlayers < 4)
			playerDiv.innerHTML = playerString + "<span> Wait till 4th player joins.</span>";
		else{
			playerDiv.innerHTML = playerString;
			document.getElementById("play").style.visibility = "hidden";
		}
	}
}
// var  loadComments = function(){
// 	$.ajax("/getComments/"+getId())
// 		.done(function(data){
// 			console.log(data);
// 			var listed_data =getLists(data);
// 			$("#allComments").html(listed_data);
// 		});
// }
// var getLists = function(comments){
// 	return comments.map(list).join("\r\n");
// }
// var list =function(comment){
// 		return '<li><div><b>'+comment.name+":</b> "+comment.content+"<br>"+comment.time+"</div></li><br>";
// }
// var getId = function(){
// 	var location = window.location.href.split('/');
// 	var id = location[location.length-1];
// 	return id;
// }
var onPageLoad =function(){
	var socket = io.connect(window.location.hostname);

	var numUsers = 0;
	// socket.on('close',function(data){
	//  	window.location.reload() 		
	// });
	
	socket.on('new_content',function(data){
		printPlayers(data.joined_players);
		if(numberOfPlayers == 4){
			generateCards(data.content[0].p1,"mDiv",1);
			generateCards(data.content[1].p2,"mDiv2",2);
			generateCards(data.content[2].p3,"mDiv3",3);
			generateCards(data.content[3].p4,"mDiv4",4);
		}
	 	// var comment=$("#mDiv").html();
	 	// comment += list(data.comment);
	 	// $("#mDiv").html(comment); 		
	});

	// $("#btn_comment").click(function(){
	// 	var id = getId();
	// 	var content =$("#cmt_box").val();
	// 	$("#cmt_box").val('');
	// 	$.ajax({url:"/newComment/"+id,type:"POST", dataType: "json",data:{content:content}});
	// });
	
	// $("#btn_loadComplete").click(loadComments)

	// $("#cmt_box").keypress(function(e){
	// 	e.keyCode == 13 && $("#btn_comment").click();
	// })
}

$(onPageLoad);