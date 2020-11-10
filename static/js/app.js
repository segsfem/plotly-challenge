// Using d3 library to read samples json
function unpack(rows, index) {
    return rows.map(function(row) {
        return row[index];
      });
}

// Submit Button handler
function handleSubmit() {
    // Prevent the page from refreshing
    Plotly.d3.event.preventDefault();

    // Select the input value from the form
  var member_id = Plotly.d3.select("#selDataset").node().value;

function getOtu() {
    var queryJson = `data/samples.json`
    d3.json(queryJson).then(function(data) {
        // console.log(data);
        var sample_values = unpack(data.samples.sample_values);
        var otu_ids = unpack(data.samples.otu_ids);
        var otu_labels = unpack(data.samples.otu_labels);
        console.log(sample_values);
});
}
//Build horizintal bar for top 10 OTUs in each individual

var trace1 = {
    type: "bar",
    name: otu_labels,
    x: otu_ids,
    y: sample_values
};

var data = [trace1];
var layout = {
    title: `Belly Button Biodiversity OTUs`,
    xaxis: {
        range: [otu_ids],
        type: "name"
    },
    yaxis: {
        type: "bar"
    },
    showlegend: false

};
Plotly.newPlot("plot", data, layout);
getOtu();