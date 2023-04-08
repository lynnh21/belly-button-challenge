//// Load the data
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
.then(function(data) {
  // Get the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
  // Populate the dropdown menu with the sample names
  data.names.forEach(function(name) {
    dropdownMenu.append("option")
      .attr("value", name)
      .text(name);
  });
  // Initialize the page with the first sample
  buildBarChart(data, data.names[0]);
})
.catch(function(error) {
  console.log(error);
});

// Function to build the bar chart
function buildBarChart(data, sample) {
// Filter the data to get the selected sample
var filteredData = data.samples.filter(function(d) {
  return d.id === sample;
})[0];
// Get the top 10 OTUs
var top10Values = filteredData.sample_values.slice(0, 10).reverse();
var top10Ids = filteredData.otu_ids.slice(0, 10).reverse();
var top10Labels = filteredData.otu_labels.slice(0, 10).reverse();
// Create the horizontal bar chart
var trace = {
  x: top10Values,
  y: top10Ids.map(function(id) {
    return "OTU " + id;
  }),
  text: top10Labels,
  type: "bar",
  orientation: "h"
};
var layout = {
  title: "Top 10 OTUs for Sample " + sample
};
Plotly.newPlot("bar", [trace], layout);
}

// Function to handle the change event of the dropdown menu
function optionChanged(sample) {
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
  .then(function(data) {
    buildBarChart(data, sample);
  })
  .catch(function(error) {
    console.log(error);
  });
}

// Attach the optionChanged function to the change event of the dropdown menu
d3.select("#selDataset").on("change", function() {
var sample = d3.select(this).property("value");
optionChanged(sample);
});