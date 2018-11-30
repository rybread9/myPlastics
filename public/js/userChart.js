// console.log("you are connected to chart.js");

let w;
let h;
let margin = {};
let width;
let height;
let svg = {};
let maxHeight;
let maxColor;
let minColor;
let chart = {};


const drawGraph = function(arr){

  // set parameters and pass them into d3
  w = 500;
  h = 400;
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
                // append an svg element to the userchart div
                .append("svg")
                // give the svg a height and width
                .attr("width", w)
                .attr("height", h)
                // give the svg a white background
                .style("background-color", "white");
  // add a group element for group everything inside the svg together. we can use this to apply margins, and transformations to the svg content
  chart = svg.append("g")
              .classed("display", true)
              .attr("width", w)
              .attr("height", h)
              .attr("transform", "translate(0,150)");

  // add the bars to the g element instead of the svg element
  chart.selectAll("rect")
    // pass in our data to our rectangular bars
      .data(arr)
      // enter phase is the first time the data is bound. it means to bind the data to everything that follows(ie- the rectangles)
      .enter()
      // d3 has special elements that know what shape they are
      .append("rect")
      // evenly spaced bars: divide the width of the svg by the length of the array, then subtract the bar padding. then multiply by i which will input the index of the piece of data being processed.
      .attr("x", function(d,i){
        return i * ( w / arr.length);
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

        return "rgb(0,"+(Math.round(d * maxColor))+"," + (Math.round(d * maxColor)) + ")";
      });



};

// when the page loads, run this function
document.addEventListener("DOMContentLoaded", function() {

  const userId = document.querySelector("#userId")

    getUserData = (id) => {
      // Grab results from ejs page where they are called
      const results = document.querySelectorAll('.results')
      // console.log(results);
      const resultsArr = [];
      // push the innertext of the results into the results array
      for( let i=0; i<results.length; i++){
        resultsArr.push(results[i].innerText);
      }
      console.log(resultsArr);
      return resultsArr;
    }


  const userData = getUserData(userId);
  // pass results from getUserData above into the draw graph function
  drawGraph(userData);
});







// d3.json('/myPlastics/:id').then(function(plastics){
//   console.log(plastics[0])
// })
