submitbtn=document.getElementById("submit")
submitbtn.onclick = function(){
    var div = document.createElement("div");
    div.className="infobox"
    document.getElementById("maincontainer").prepend(div);
}