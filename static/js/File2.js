
let ID;
let DemographicInfo;
let slicedData;
let samples;
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
 // Fetch the JSON file
 d3.json(url).then(function(data) {
    console.log(data);
    ID = data.metadata.map(function(item){
    return item.id;
    });
   // Create an array of metadata objects and log it
    DemographicInfo = data.metadata.map(function(item){
      return item;
    });
   // Create an array of sample objects and log it
   samples = data.samples.map(function(item){
      return item;
   });
   console.log("id:", ID);
   console.log("metadata:", DemographicInfo );
   console.log("samples:", samples);
   // Sort the data by sample_values descending
   let sortedsamples = samples.sort((a,b) => b.sample_values - a.sample_values);
   console.log("sorted samples:", sortedsamples);
   // Slice the first 10 objects for plotting
   slicedData = sortedsamples.slice(0,10);
   console.log("slicedData:", slicedData);
   // Populate drop-down menu by ID
  var selectElement = document.getElementById("selDataset");
  // Loop through the data.sample[i].ID and create options
  for (var i = 0; i < data.samples.length; i++) {
   var option = document.createElement("option");
   option.value = data.samples[i].id;
   option.text = data.samples[i].id;
   // Append the <option> element to the <select> element
   selectElement.appendChild(option);
 }
init ();
});
function init(){
   // Display default panel by first ID
   updateDemographicInfo(ID[0]); // to display demographic info for the first ID by default
   // To crete the bar chart
   let trace1 = {
      x: slicedData.map(object => object.otu_ids),
      y: slicedData.map(object => object.sample_values),
      text: slicedData.map(object => object.otu_labels),
      name: "OTUs",
      type: "bar",
      orientation: "h"
   };
    // Apply a title to the layout
   let layout = {
      title: "Top 10 OTUs per Individuals",
      margin: {
        l: 150,
        r: 100,
        t: 100,
        b: 100}};
   Plotly.newPlot("bar", trace1, layout);
   // To create the bubble chart
   let trace2 = {
      x: samples.map(object => object.otu_ids),
      y: samples.map(object => object.sample_values),
      mode: 'markers',
      marker: {
         size: samples.map(object => object.sample_values),
         color: samples.map(object => object.otu_ids),
         colorscale: samples.map(object => object.otu_ids),
      },
      text: samples.map(object => object.otu_labels),
      type: 'scatter'
  };
   let layout2 = {
      showlegend: true,
      height: 700,
      width: 700,
  };
  Plotly.newPlot('bubble', trace2, layout2);

// to update demographic info
   function updateDemographicInfo(selectedValue) {
      // Get the panel body element
      var panelBody = document.getElementById('sample-metadata');
      // Clear existing content
      panelBody.innerHTML = '';
      // Get demographic info based on the selected value
      let demographicInfo = DemographicInfo.find(item => item.id === selectedValue);
      // Loop through the demographic info and add it to the panel body
      for (let key in demographicInfo) {
          if (demographicInfo.hasOwnProperty(key)) {
              var pElement = document.createElement('p');
              pElement.innerHTML = `<strong>${key}:</strong> ${demographicInfo[key]}`;
              panelBody.appendChild(pElement);
          }
      }
  }
 // to update the plot
// Function to handle the change event of the select element
function optionChanged(selectedValue) {
   // Get the updated demographic info
   let updatedDemographicInfo = DemographicInfo.find(item => item.id === selectedValue);
 
   // Update the demographic info panel
   updateDemographicInfo(updatedDemographicInfo);
 
   // Filter the samples data based on the selected ID
   let filteredSamples = samples.filter(sample => sample.id === selectedValue);
 
   // Sort the filtered data
   let sortedFilteredSamples = filteredSamples.sort((a, b) => b.sample_values - a.sample_values);
 
   // Slice the first 10 objects for plotting
   let updatedSlicedData = sortedFilteredSamples.slice(0, 10);
 
   // Update the bar chart data and redraw
   let updatedTrace1 = {
     x: updatedSlicedData.map(object => object.otu_ids),
     y: updatedSlicedData.map(object => object.sample_values),
     text: updatedSlicedData.map(object => object.otu_labels),
   };
 
   Plotly.restyle("bar", [updatedTrace1]);
 
   // Update the bubble chart data and redraw
   let updatedTrace2 = {
     x: updatedSlicedData.map(object => object.otu_ids),
     y: updatedSlicedData.map(object => object.sample_values),
     marker: {
       size: updatedSlicedData.map(object => object.sample_values),
     },
   };
 
   Plotly.restyle("bubble", [updatedTrace2]);
    }

   //console.log("Selected option:", selectedValue);
   // You might want to call updateDemographicInfo or perform other actions here

// Attach the event listener with the new parameter
//d3.selectAll("#selDataset").on("change", function(optionChanged) {
   //var selectElement = document.getElementById("selDataset");
   //var selectedOption = d3.select(this).property("value");
   //optionChanged(selectedOption);
   //let 
//});








 // On change to the DOM, call getData()
//d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
//function getData() {
  //let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a letiable
  //let dataset = dropdownMenu.property("value");



