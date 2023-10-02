<script src="https://d3js.org/d3.v5.min.js"></script>
<div id="chart"></div>
<script>
    // Define a function to load and process the JSON data
    function loadJSONData() {
      // Define the URL of the JSON file
      const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
  
      // Use D3.js to fetch the JSON data
      d3.json(url)
        .then(function(data) {
          // Once the data is loaded, you can work with it here
          console.log(data);
  
          // Now, you can create your visualizations or perform any other tasks with the data
          // For this example, we are just logging the data to the console
        })
        .catch(function(error) {
          // Handle any errors that occur during the fetch
          console.error("Error loading JSON data:", error);
        });
    }
  
    // Call the function to load and process the JSON data
    loadJSONData();
  </script>
  