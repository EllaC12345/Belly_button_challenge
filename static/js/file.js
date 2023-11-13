const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Initialize arrays
let otu_ids = [];
let otu_labels = [];
let sample_values = [];
let id = [];




// Fetch the JSON file
d3.json(url).then(function(data) {
  console.log(data);

  // Sort samples by sample_values
  let sortedBySampleValue = data.samples.sort((a, b) => b.sample_values - a.sample_values);

  // Populate Data.samples arrays
  for (let i = 0; i < sortedBySampleValue.length; i++) {
    id.push(sortedBySampleValue[i].id);
    otu_ids.push(sortedBySampleValue[i].otu_ids);
    sample_values.push(sortedBySampleValue[i].sample_values);
    otu_labels.push(sortedBySampleValue[i].otu_labels);
  }
  
  


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

  // Initialize the default bar chart
  init();
  // Initialize the default bubble chart
  init2();
  // initialize the default demographic info
 //init3();


});

// Create the default Bar Chart
function init() {

  let trace1 = {
    x: sample_values.slice(0,10).reverse(),
    y: otu_ids.slice(0, 10).map(otu_ID => 10  `OTU ${otu_ID}`).reverse(),
    text: otu_labels,
    orientation: 'h',
    type: 'bar'
  };
  
  let layout = {
    title: 'Top OTUs per Individual',
    margin: {t:000,l:150},
  };

  Plotly.newPlot('bar', trace1, layout);
} init()

// Create the default Bubble Chart
function init2() {
  
  let trace2 = {
    x: otu_ids,
    y: sample_values,
    mode: 'markers',
    marker: {
      size: sample_values,
      color: otu_ids,
      colorscale: otu_ids,
      },
    text: otu_labels,
    type: 'scatter'
  };

  let traceData2 = [trace2];
  let layout = {
    showlegend: true,
    height: 700,
    width: 700,
  };

  Plotly.newPlot('bubble', traceData2, layout);
} init2()

function init3() {

}

//


//  Function called by DOM changes
function optionChanged(selectedOption) {
  //  Fetch the JSON file
  d3.json(url).then(function(data) {
  console.log(data)
  let otu_ids = [];
  let otu_labels = [];
  let sample_values = [];
  let id = [];

  //  Find the index of the selected option in the 'id' array
  let index = id.indexOf(selectedOption );

  //Extract data for the selected option
  let newSampleValues = sample_values[index];
  let newOtuIds = otu_ids[index];
  let newOtuLabels = otu_labels[index];

// Update the bar chart with new data
let updatedBarTrace = {
  x: [newOtuIds],
  y: [newSampleValues],
  text: [newOtuLabels],
  type: 'bar'
};
Plotly.newPlot('bar', [updatedBarTrace]);

// Update the bubble chart with new data
let updatedBubbleTrace = {
  x: newOtuIds,
  y: newSampleValues,
  mode: 'markers',
  marker: {
    size: newSampleValues,
    color: newOtuIds,
    colorscale: newOtuIds,
  },
  text: newOtuLabels,
  type: 'scatter'
};
Plotly.newPlot('bubble', [updatedBubbleTrace]);
}


// Attach the event listener with the new parameter
d3.selectAll("#selDataset").on("change", function() {
  // Get the value of the selected option
  var selectedOption = d3.select(this).property("value");
  
  // Call the optionChanged function with the selected option as a parameter
  optionChanged(selectedOption);
});

