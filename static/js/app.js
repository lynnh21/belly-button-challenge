d3.json("static/resources/samples.json").then(({ names }) => {
  names.forEach((id) => {
    d3.select("select").append("option").text(id);
  });

  optionChanged();
});

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
  });
};
