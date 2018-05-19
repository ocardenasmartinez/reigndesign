function deleteDocument(id) {
  var result = confirm("Want to delete?");
  if (result) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {};
    xhttp.open("DELETE", "nodejsnews?created_at_i=" + id, true);
    xhttp.send();
    window.location.reload(1);
  }
}
