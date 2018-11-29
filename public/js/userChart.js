// console.log("you are connected to chart.js");



// arr = [5,4,10,3,7,9,2,8,6,1,13,1,17];

let w;
let h;
let barPadding = 1;
let margin = {};
let width;
let height;
let svg = {};
let maxHeight;
let maxColor;
let minColor;





const drawGraph = function(arr){

  w = 500;
  h = 500;
  margin = {
    top: 30,
    bottom: 120,
    left: 60,
    right: 20
  }

  // height and width of "g" element which holds bars
  width = w - margin.left - margin.right;
  height = h - margin.top - margin.bottom;


  maxHeight = h/Math.max(...arr);
  maxColor = 255/Math.max(...arr);
  minColor = 255/Math.min(...arr);

  svg = d3.select(".userChart")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .style("background-color", "white")
                .append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");;



  svg.selectAll("rect")
      .data(arr)
      .enter()
      .append("rect")
      // evenly spaced bars: divide the width of the svg by the length of the array, then subtract the bar padding. then multiply by i which will input the index of the piece of data being processed.
      .attr("x", function(d,i){
        return i * ( width / arr.length - barPadding );
      })
      // height of bars... depends on data
      .attr("y", function(d){
        return height-d*maxHeight;
      })
      .attr("width", 20)
      // //  scale the height of the bars based on the height of our SVG and the maximum value from our data
      .attr("height", function(d){
        return d * maxHeight;
      })
      .attr("fill", function(d){

        return "rgb(0,0," + (Math.round(d * maxColor)) + ")";
      });

};


document.addEventListener("DOMContentLoaded", function() {
  const userId = document.querySelector("#userId")

    getUserData = (id) => {
      const results = document.querySelectorAll('.results')
      console.log(results);
      const resultsArr = [];
      for( let i=0; i<results.length; i++){
        resultsArr.push(results[i].innerText);
      }

      return resultsArr;
    }


  const userData = getUserData(userId);

  drawGraph(userData);
});





// d3.json('/myPlastics/:id').then(function(plastics){
//   console.log(plastics[0])
// })
