// Global Variables
let demographicInfo;
let samples;
let slicedData;
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
//​
// Fetch and process the data
d3.json(url).then(function(data) {
    demographicInfo = data.metadata;
    samples = data.samples;
    // Sort the data by sample_values descending
   sortedsamples = samples.sort((a,b) => b.sample_values - a.sample_values);
   console.log("sorted samples:", sortedsamples);
   // Slice the first 10 objects for plotting
   slicedData = sortedsamples.slice(0,10);
   console.log("slicedData:", slicedData);
//​
    // Initialize the dashboard
    init();
});
​///
// Initializes the dashboard
function init() {
    populateDropdown();
    updateDemographicInfo(samples[0].id);
    updateBarCharts(samples[0].id);
    updateBubbleCharts(samples[0].id);
}
​//
// Populates the dropdown with sample IDs
function populateDropdown() {
    let selectElement = document.getElementById("selDataset");
    samples.forEach((sample) => {
        let option = document.createElement("option");
        option.value = sample.id;
        option.text = sample.id;
        selectElement.appendChild(option);
    });
}
​//
// Updates demographic information based on the selected sample
function updateDemographicInfo(selectedValue) {
     // Get the panel body elemenv
    var panelBody = document.getElementById('sample-metadata');
     // Clear existing content
    panelBody.innerHTML = '';
    // Get demographic info based on the selected value
    let demographicData = demographicInfo.find(item => item.id === selectedValue);
    // Loop through the demographic info and add it to the panel body
    for (let key in demographicData) {
        if (demographicInfo.hasOwnProperty(key)) {
            var pElement = document.createElement('p');
            pElement.innerHTML = `<strong>${key}:</strong> ${demographicInfo[key]}`;
            panelBody.appendChild(pElement);
        }
    }
}

​
// Updates the charts based on the selected sample
function updateBarCharts(selectedValue) {
   //bar charts data based on selected value
   let bar_data = slicedData.find(item => item.id === selectedValue);
   slicedData.forEach((slicedData) => {
    if 
   let trace1= {
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
    
}
function updateBubbleCharts(selectedValue) {
    let bubble_data = samples.find(item => item.id === selectedValue);
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
    

    


}

​
// Handles selection changes in the dropdown
function optionChanged(selectedValue) {
    updateDemographicInfo(selectedValue);
    updateBarCharts(selectedValue);
    updateBubbleCharts(selectedValue);
};