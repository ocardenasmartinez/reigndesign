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
