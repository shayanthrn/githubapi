submitbtn = document.getElementById("submit")
submitbtn.onclick = function () {
    if (localStorage.getItem(document.getElementById("username").value) == null) {
        fetch('https://api.github.com/users/' + document.getElementById("username").value).then(response => {
            response.json().then(data => {
                fetch('https://api.github.com/users/' + document.getElementById("username").value + "/repos?sort=pushed").then(res => res.json().then(data2 => {
                    if (document.getElementById("maindiv") != null) {
                        document.getElementById("maindiv").remove();
                    }
                    if (data.message == "Not Found") {
                        var div = document.createElement("div");
                        div.className = "infobox";
                        div.id = "maindiv"
                        div.innerHTML = "User not Found"
                        document.getElementById("maincontainer").prepend(div);
                    }
                    else {
                        var planguages = []
                        for (let i = 0; i < data2.length; i++) {
                            planguages.push(data2[i].language)
                        }
                        data.favlang = getMaxOccurrence(planguages);
                        localStorage.setItem(document.getElementById("username").value, JSON.stringify(data));
                        var div = document.createElement("div");
                        div.className = "infobox";
                        div.id = "maindiv"
                        var div2 = document.createElement("div");
                        div2.className = "mybox";
                        var image = document.createElement("img");
                        image.className = "image";
                        if (data.avatar_url == null || data.avatar_url == "") {
                            image.src = "/notfound.png";
                        } else {
                            image.src = data.avatar_url;
                        }
                        image.alt = "Not Found";
                        div2.appendChild(image);
                        var bio = document.createElement("p");
                        bio.className = "bio";
                        if (data.bio == "" || data.bio == null) {
                            bio.innerHTML = "This user has not set Bio";
                        }
                        else {
                            bio.innerHTML = data.bio.replace(/(?:\r\n|\r|\n)/g, '<br>');
                        }
                        div2.appendChild(bio);
                        var fav = document.createElement("p");
                        fav.innerHTML ="<br>favorite language:" + data.favlang
                        div2.appendChild(fav);
                        div.appendChild(div2);
                        var name = document.createElement("h1");
                        if (data.name == "" || data.name == null) {
                            name.innerHTML = "This user has not set Name";
                        }
                        else {
                            name.innerHTML = data.name;
                        }
                        div.appendChild(name);
                        var blog = document.createElement("a");
                        if (data.blog == "" || data.blog == null) {
                            blog.href = "";
                            blog.innerHTML = "This user has not set Blog";
                        }
                        else {
                            blog.href = data.blog;
                            blog.innerHTML = data.blog;
                        }
                        div.appendChild(blog)
                        var loc = document.createElement("p");
                        if (data.location == "" || data.location == null) {
                            loc.innerHTML = "This user has not set Location";
                        }
                        else {
                            loc.innerHTML = data.location;
                        }
                        div.appendChild(loc);
                        document.getElementById("maincontainer").prepend(div);
                    }
                }))
            })
        }).catch(err => {
            if (document.getElementById("maindiv") != null) {
                document.getElementById("maindiv").remove();
            }
            var div = document.createElement("div");
            div.className = "infobox";
            div.id = "maindiv"
            div.innerHTML = "Connection Problem"
            document.getElementById("maincontainer").prepend(div);
        })

    }
    else {
        var data = localStorage.getItem(document.getElementById("username").value)
        data = JSON.parse(data);
        if (document.getElementById("maindiv") != null) {
            document.getElementById("maindiv").remove();
        }
        if (data.message == "Not Found") {
            var div = document.createElement("div");
            div.className = "infobox";
            div.id = "maindiv"
            div.innerHTML = "User not Found"
            document.getElementById("maincontainer").prepend(div);
        }
        else {
            var div = document.createElement("div");
            div.className = "infobox";
            div.id = "maindiv"
            var div2 = document.createElement("div");
            div2.className = "mybox";
            var image = document.createElement("img");
            image.className = "image";
            if (data.avatar_url == null || data.avatar_url == "") {
                image.src = "/notfound.png";
            } else {
                image.src = data.avatar_url;
            }
            image.alt = "Not Found";
            div2.appendChild(image);
            var bio = document.createElement("p");
            bio.className = "bio";
            if (data.bio == "" || data.bio == null) {
                bio.innerHTML = "This user has not set Bio";
            }
            else {
                bio.innerHTML = data.bio.replace(/(?:\r\n|\r|\n)/g, '<br>') + "<br><p class='cache'> This is a Cached version of information using local storage</p>";
            }
            div2.appendChild(bio);
            var fav = document.createElement("p");
            fav.innerHTML = "<br>favorite language:" + data.favlang
            div2.appendChild(fav);
            div.appendChild(div2);
            var name = document.createElement("h1");
            if (data.name == "" || data.name == null) {
                name.innerHTML = "This user has not set Name";
            }
            else {
                name.innerHTML = data.name;
            }
            div.appendChild(name);
            var blog = document.createElement("a");
            if (data.blog == "" || data.blog == null) {
                blog.href = "";
                blog.innerHTML = "This user has not set Blog";
            }
            else {
                blog.href = data.blog;
                blog.innerHTML = data.blog;
            }
            div.appendChild(blog)
            var loc = document.createElement("p");
            if (data.location == "" || data.location == null) {
                loc.innerHTML = "This user has not set Location";
            }
            else {
                loc.innerHTML = data.location;
            }
            div.appendChild(loc);
            document.getElementById("maincontainer").prepend(div);
        }
    }
}


function getMaxOccurrence(a) {
    var o = {}, mC = 0, mV, m;
    for (var i = 0, iL = a.length; i < iL; i++) {
        m = a[i];
        o.hasOwnProperty(m) ? ++o[m] : o[m] = 1;
        if (o[m] > mC) mC = o[m], mV = m;
    }
    return mV;
}