// Using d3 library to read samples json
function buildMetadata(sample) {
    d3.json("data/samples.json").then((data) => {
        var sample_data = data.metadata;
        // Filter for patient number
        var resultArray = sample_data.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        var panel = d3.select("#sample-metadata");
        // clear  existing data
        panel.html("");
    // Add key and value pair to the panel
    Object.entries(result).forEach(([key, value]) => {
        panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
}
//     return rows.map(function(row) {
//         return row[index];
//       });
// }

// Build horizontal bar chart
function buildCharts(sample) {
    d3.json("data/samples.json").then((data) => {
        var samples = data.samples;
        var resultArray =samples.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        console.log(sample_values);
        var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
      var barData = [
        {
          y: yticks,
          x: sample_values.slice(0, 10).reverse(),
          text: otu_labels.slice(0, 10).reverse(),
          type: "bar",
          orientation: "h",
        }
      ];
  
      var barLayout = {
        title: "Top 10 OTUs in individual",
        margin: { t: 30, l: 150 }
      };
  
      Plotly.newPlot("bar", barData, barLayout);
      // build bubble chart
      var bubbleLayout = {
        title: "Bacteria Cultures sample for individual",
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "OTU ID" },
        margin: { t: 30}
      };
      var bubbleData = [
        {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: "markers",
          marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth"
          }
        }
      ];
  
      Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    });
  }
  // Build reference for dropdown menu
  function init() {
    
    var selector = d3.select("#selDataset");
  
    // Sample names to populate charts and table
    d3.json("samples.json").then((data) => {
      var sampleNames = data.names;
  
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Default sample on opening page
      var firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  
  init();
