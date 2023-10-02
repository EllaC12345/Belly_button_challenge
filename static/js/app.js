// Define the URL of the JSON data
const url =  https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json

// Select the necessary elements from the DOM
const select = d3.select("#individual-select");
const svg = d3.select("#bar-chart");
const chartContainer = d3.select("#chart-container");

// Function to create the bar chart
function createBarChart(data) {
    // Sort the data by OTU IDs and select the top 10
    const top10OTUs = data.otu_ids.slice(0, 10).map(id => `OTU ${id}`);;
    const top10Values = data.sample_values.slice(0, 10);
    const top10Labels = data.otu_labels.slice(0, 10);

    // Create scales for the x and y axes
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(top10Values)])
        .range([0, chartContainer.node().clientWidth]);

    const yScale = d3.scaleBand()
        .domain(top10OTUs.map(String))
        .range([0, chartContainer.node().clientHeight])
        .padding(0.1);

    // Create and append the bars to the SVG
    const bars = svg.selectAll("rect")
        .data(top10OTUs)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", (d, i) => yScale(top10OTUs[i]))
        .attr("width", d => xScale(d))
        .attr("height", yScale.bandwidth())
        .attr("fill", "green");

    // Create and append the labels to the bars
    svg.selectAll("text")
        .data(top10Labels)
        .enter()
        .append("text")
        .text((d, i) => d)
        .attr("x", 5)
        .attr("y", (d, i) => yScale(top10OTUs[i]) + yScale.bandwidth() / 2)
        .attr("dy", "0.35em")
        .attr("fill", "white");

    // Create x and y axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Append axes to the SVG
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${chartContainer.node().clientHeight})`)
        .call(xAxis);

    svg.append("g")
        .attr("class", "y-axis")
        .call(yAxis);
}

// Function to update the chart based on the selected individual
function updateChart(individualId) {
    // Filter data for the selected individual
    const individualData = data.samples.find(sample => sample.id === individualId);

    // Clear the existing chart
    svg.selectAll("*").remove();

    // Create a new chart
    createBarChart(individualData);

    // Update the chart title
    svg.append("text")
        .attr("x", chartContainer.node().clientWidth / 2)
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .text(`Top 10 OTUs for Individual ${individualId}`);
}

// Function to populate the dropdown with individual IDs
function populateDropdown(data) {
    const individualIds = data.names;
    select.selectAll("option")
        .data(individualIds)
        .enter()
        .append("option")
        .attr("value", d => d)
        .text(d => d);
}

// Load the data and initialize the chart
d3.json(url)
    .then(data => {
        // Store the data for later use
        window.data = data;

        // Populate the dropdown
        populateDropdown(data);

        // Initialize the chart with the first individual
        updateChart(data.names[0]);

        // Listen for changes in the dropdown selection
        select.on("change", function () {
            const selectedValue = this.value;
            updateChart(selectedValue);
        });
    })
    .catch(error => {
        console.error("Error loading JSON data:", error);
    });
