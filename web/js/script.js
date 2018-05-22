function deleteDocument(id) {
  var result = confirm("Want to delete?");
  if (result) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
    	window.location.reload(1);
    };
    xhttp.open("DELETE", "nodejsnews?created_at_i=" + id, true);
    xhttp.send();
  }
}

function openLink(link) {
	if(link) {
		this.document.location.href = link;	
	}else{
		alert("No link");
	}
}

function threeSecond() {
	setInterval(function(){ location.reload(true); }, 3000);
}