const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pennding 
const dataPromise = d3.json(url);
console.log(" Data Promise:", dataPromise);

// initialize the array
let otu_ids = []
let otu_labels = []
let sample_values = []
let id = []

// Fetch the Json file and console log it
d3.json(url).then(function(data){
console.log(data)

let sortedbysamplevalue = data.samples.sort((a, b) => b.sample_values - a.sample_values);
    
    for (let i = 0; i < data.samples.length; i++) {
        //console.log(data.samples[i].id);
        id.push(data.samples[i].id);
        //console.log(data.samples[i].otu_ids);
        otu_ids.push(data.samples[i].otu_ids);
        //console.log(data.samples[i].sample_values);
        sample_values.push(data.samples[i].sample_values);
        //console.log(data.samples[i].otu_labels);
        otu_labels.push(data.samples[i].otu_labels);
    }
});

//console.log(sample_values);

//Taking the top OTU_IDs by sample_value 

let  sample_values_10 = sample_values.slice(0, 10);
let otu_ids_10 = otu_ids.slice(0, 10);
let otu_labels_10 = otu_labels.slice(0, 10);

// create a horizental bar chart

let trace1 = {
  type: 'bar',
  x: sample_values_10,
  y: otu_ids_10,
  orientation: 'h',
  text: otu_labels_10,
  marker: {
    color: 'rgb(142,124,195)'
  }
};
let traceData = [trace1];
let layout = {
  title: 'OTUs per Individual',
};
Plotly.newPlot('div', traceData, layout );