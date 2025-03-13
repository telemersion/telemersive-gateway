// Define the inlet and outlet
inlets = 1;
outlets = 1;

// Function to process the incoming symbol
function anything() {
    // Retrieve the incoming symbol as a string
    var input = arrayfromargs(messagename, arguments).join(" ");
    
    // Split the input string by the '|' character to get individual items
    var items = input.split("|");
    
    // Initialize an array to hold the parsed elements
    var parsedArray = [];
    
    // Iterate over each item
    for (var i = 0; i < items.length; i++) {
        // Split each item by whitespace to separate the number and the string
        var parts = items[i].trim().split(/\s+(.+)/);
        if (parts.length >= 2) {
            // Parse the number and retrieve the string
            var number = parseFloat(parts[0]);
            var text = parts[1];
            // Add the parsed element to the array
            parsedArray.push({ number: number, text: text });
        }
    }
    
    // Natural sorting function (without arrow functions)
    function naturalSort(a, b) {
        function padNumbers(text) {
            return text.replace(/(\d+)/g, function(match) {
                return ("0000000000" + match).slice(-10);
            });
        }
        return padNumbers(a.text).localeCompare(padNumbers(b.text));
    }

    // Sort the array using natural sorting
    parsedArray.sort(naturalSort);
   
    // Output each element as a list containing the number and the text
    for (var j = 0; j < parsedArray.length; j++) {
        outlet(0, [parsedArray[j].number, parsedArray[j].text]);
    }
}