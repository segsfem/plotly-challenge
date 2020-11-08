// Using d3 library to read samples json
function getOtu() {
    d3.json("/samples.json", function(data) {
        // console.log(data);
        var sample_values = unpack(data.samples.sample_values);
        var otu_ids = unpack(data.samples.otu_ids);
        var otu_labels = unpack(data.samples.otu_labels);
        console.log(sample_values);
});
}
//Build horizintal bar for top 10 OTUs in each individual
