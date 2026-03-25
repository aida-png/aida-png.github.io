function search() {
    var start = document.getElementById("start").value;
    var end = document.getElementById("end").value;
    var mag = document.getElementById("mag").value;
    var error = document.getElementById("error");
    var results = document.getElementById("results");

    // validation
    if (!start || !end) {
        error.textContent = "Please enter both dates";
        return;
    }
    if (start > end) {
        error.textContent = "Start date must be before end date.";
        return;
    }

    error.textContent = "";
    results.innerHTML = "Loading...";

    var url = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=" + start + "&endtime=" + end + "&minmagnitude=" + mag + "&orderby=magnitude&limit=50";

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            results.innerHTML = "";
            if (data.features.length === 0) {
                results.innerHTML = "No earthquakes found.";
                return;
            }
            var table = "<table><tr><th>Magnitude</th><th>Location</th><th>Time</th></tr>";
            data.features.forEach(function(quake) {
                var mag = quake.properties.mag;
                var place = quake.properties.place;
                var time = new Date(quake.properties.time).toLocaleString();
                table += "<tr><td>" + mag + "</td><td>" + place + "</td><td>" + time + "</td></tr>";
            });
            table += "</table>";
            results.innerHTML = table;
        });

}