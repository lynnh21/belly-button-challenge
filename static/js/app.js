
d3.json('./static/resources/samples.json').then(({ names }) => {
  names.forEach(name => {
    d3.select('select').append('option').text(name);
  });
  optionChanged();
});

const optionChanged = () => {
  let option = d3.select('select').node().value;
  console.log(option);
};