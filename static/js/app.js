//Use 3D library to read in samples.json
d3.json("static/resources/samples.json").then(({ names }) => {
  names.forEach((id) => {
    d3.select("select").append("option").text(id);
  });

  optionChanged();
});
//Creating dropdown menu
const optionChanged = () => {
  let choice = d3.select("select").node().value;

  d3.json("static/resources/samples.json").then(({ metadata, samples }) => {
    let meta = metadata.filter((obj) => obj.id == choice)[0];
    let sample = samples.filter((obj) => obj.id == choice)[0];
    console.log(sample);

    d3.select(".panel-body").html("");
    Object.entries(meta).forEach(([key, val]) => {
      d3.select(".panel-body")
        .append("h5")
        .text(`${key.toUpperCase()}: ${val}`);
    });
    //Creating a horizontal bar chart
    const { otu_ids, sample_values, otu_labels } = sample;
    var data = [
      {
        x: sample_values.slice(0, 10).reverse(),
        y: otu_ids
          .slice(0, 10)
          .reverse()
          .map((x) => `OTU ${x}`),
        orientation: "h",
        type: "bar",
      },
    ];

    Plotly.newPlot("bar", data);

    //Creating a bubble chart
    var trace1 = {
      x: sample.otu_ids,
      y: sample.sample_values,
      mode: "markers",
      marker: {
        size: sample.sample_values,
        color: sample.otu_ids,
      },
      text: sample.otu_labels,
    };

    var data = [trace1];

    var layout = {
      xaxis: { title: "OTU ID" },
      showlegend: false,
      height: 600,
      width: 1200,
    };

    Plotly.newPlot("bubble", data, layout);

    //Adding a gauge chart
    var data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: meta.wfreq,
        title: { text: "Belly Button Washing Frequency <br> Scrubs per Week" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: {
            range: [null, 9],
            tickwidth: 1,
            tickcolor: "darkblue",
          },
          steps: [
            { range: [0, 1], color: "#F8F3EC" },
            { range: [1, 2], color: "#F4F1E4" },
            { range: [2, 3], color: "#E9E6C9" },
            { range: [3, 4], color: "#E2E4B1" },
            { range: [4, 5], color: "#D5E49D" },
            { range: [5, 6], color: "#B7CC92" },
            { range: [6, 7], color: "#8CBF88" },
            { range: [7, 8], color: "#8ABB8F" },
            { range: [8, 9], color: "#85B48A" },
          ],
        },
      },
    ];

    Plotly.newPlot("gauge", data);
  });
};
