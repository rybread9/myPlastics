// console.log("you are connected to chart.js");



// arr = [5,4,10,3,7,9,2,8,6,1,13,1,17];

const w = 400;
const h = 300;
const barPadding = 1;
//  scale the height of the bars based on the height of our SVG and the maximum value from our data



const svg = d3.select(".userChart")
              .append("svg")
              .attr("width", w)
              .attr("height", h)
              .style("background-color", "white");





const drawGraph = function(arr){

  const maxHeight = h/Math.max(...arr);
  const maxColor = 255/Math.max(...arr);
  const minColor = 255/Math.min(...arr);

  console.log("I am making a graph :) ");

  svg.selectAll("rect")
      .data(arr)
      .enter()
      .append("rect")
      // evenly spaced bars: divide the width of the svg by the length of the array, then subtract the bar padding. then multiply by i which will input the index of the piece of data being processed.
      .attr("x", function(d,i){
        return i * ( w / arr.length - barPadding );
      })
      // height of bars... depends on data
      .attr("y", function(d){
        return h-d*maxHeight;
      })
      .attr("width", 20)
      // height of bars... depends on data
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
