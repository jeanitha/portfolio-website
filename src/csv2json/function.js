document.addEventListener('DOMContentLoaded', function () {
    const fileSelector = document.getElementById('file-selector');
    fileSelector.addEventListener('change', (event) => {
        const fileList = event.target.files;
        if (fileList.length > 0) {
            const file = fileList[0];
            readFile(file);
        }
    });

    function readFile(file) {
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            const result = event.target.result;
            const csv = result;
            document.getElementById('csv').value = csv;
        });

        reader.addEventListener('progress', (event) => {
            if (event.loaded && event.total) {
                const percent = (event.loaded / event.total) * 100;
                console.log(`Progress: ${Math.round(percent)}`);
            }
        });

        reader.readAsText(file);
    }

    document.getElementById("file-selector").addEventListener("change", function () {
        var fileInput = document.getElementById("file-selector");
        var fileName = document.getElementById("file-name");

        if (fileInput.files.length > 0) {
            fileName.textContent = fileInput.files[0].name;
        } else {
            fileName.textContent = "";
        }
    });


    // This will parse a delimited string into an array of arrays. The default delimiter is the comma, but this can be overriden in the second argument.

    function CSVToArray(strData, strDelimiter) {
        // Check to see if the delimiter is defined. If not, then default to comma.
        strDelimiter = (strDelimiter || ",");
        // Create a regular expression to parse the CSV values.
        var objPattern = new RegExp((
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
        // Create an array to hold our data. Give the array a default empty first row.
        var arrData = [[]];
        // Create an array to hold our individual pattern matching groups.
        var arrMatches = null;
        // Keep looping over the regular expression matches until we can no longer find a match.
        while (arrMatches = objPattern.exec(strData)) {
            // Get the delimiter that was found.
            var strMatchedDelimiter = arrMatches[1];
            // Check to see if the given delimiter has a length (is not the start of string) and if it matches field delimiter. If id does not, then we know that this delimiter is a row delimiter.
            if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
                // Since we have reached a new row of data, add an empty row to our data array.
                arrData.push([]);
            }
            // Now that we have our delimiter out of the way, let's check to see which kind of value we captured (quoted or unquoted).
            if (arrMatches[2]) {
                // We found a quoted value. When we capture this value, unescape any double quotes.
                var strMatchedValue = arrMatches[2].replace(
                    new RegExp("\"\"", "g"), "\"");
            } else {
                // We found a non-quoted value.
                var strMatchedValue = arrMatches[3];
            }
            // Now that we have our value string, let's add it to the data array.
            arrData[arrData.length - 1].push(strMatchedValue);
        }
        // Return the parsed data.
        return (arrData);
    }

    function CSV2JSON(csv) {
        var array = CSVToArray(csv);
        var objArray = [];
        for (var i = 1; i < array.length; i++) {
            objArray[i - 1] = {};
            for (var k = 0; k < array[0].length && k < array[i].length; k++) {
                var key = array[0][k];
                objArray[i - 1][key] = array[i][k];
            }
        }

        var json = JSON.stringify(objArray, null, 2);
        return json;
    }

    $(document).ready(function () {
        $("#convert").click(function () {
            var csv = $("#csv").val();
            // Show warning message if CSV text box is empty
            if (csv.trim() === "") {
                alert("Please enter CSV data.");
                return;
            }

            var json = CSV2JSON(csv);
            $("#json").val(json);
        });

        $("#download").click(function () {
            var csv = $("#csv").val();
            // Show warning message if CSV text box is empty
            if (csv.trim() === "") {
                alert("Please enter CSV data.");
                return;
            }

            var json = CSV2JSON(csv);

            var blob = new Blob([json], { type: "application/json;charset=utf-8" });
            var url = URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = url;
            a.download = "json-data.json";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });

        $("#saveCsv").click(function () {
            var csv = $("#csv").val();
            if (csv.trim() === "") {
                // Show warning message if CSV text box is empty
                alert("Please enter CSV data.");
                return;
            }

            var filename = "csv-data";

            var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
            if (navigator.msSaveBlob) {
                // For Microsoft Edge and Internet Explorer
                navigator.msSaveBlob(blob, filename);
            } else {
                // For other browsers
                var link = document.createElement("a");
                if (link.download !== undefined) {
                    // Set the download attribute if supported
                    link.href = URL.createObjectURL(blob);
                    link.download = filename;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    // Fallback for browsers that do not support the download attribute
                    window.open(link.href, "_blank");
                }
            }
        });
    });

    function adjustTextareaHeight() {
        var textarea = document.getElementById("json");
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";

        if (textarea.scrollHeight > window.innerHeight * 0.7) {
            textarea.style.height = "500px";
            textarea.style.overflowY = "scroll";
        }
    }

    window.addEventListener("resize", adjustTextareaHeight);
    document.getElementById("json").addEventListener("input", adjustTextareaHeight);
});