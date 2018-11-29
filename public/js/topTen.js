
    let chart = {};
    let xAxis = {};
    let yAxis = {};
    let yGridlines = {};
    let x = {};
    let y = {};
    let ordinalColorScale = {};
    let svg = {};
    let height;
    let width;
    let margin;


      const drawChart = (topTen) => {
        // parameters of chart dimension
        const w = 500;
        const h = 350;
        const margin = {
          top: 30,
          bottom: 120,
          left: 60,
          right: 20
        }
        // height and width of "g" element which holds bars
        width = w - margin.left - margin.right;
        height = h - margin.top - margin.bottom;


        x = d3.scaleBand()
                    .domain(topTen.map(function(entry){
                      return entry.item;
                    }))
                    // rangebands will create distinct values according to the distinct values in the domain
                    .range([0,width]);
        y = d3.scaleLinear()
                    .domain([0, d3.max(topTen, function(d){
                      return d.amount
                    })])
                    .range([height, 0]);

        // color the chart bars
        ordinalColorScale = d3.scaleOrdinal(d3.schemeCategory10);

        // create axis for chart
        xAxis = d3.axisBottom()
                        .scale(x);
        yAxis = d3.axisLeft()
                        .scale(y);
        yGridlines = d3.axisLeft()
                              .scale(y)
                              .tickSize(-width, 0,0)
                              .tickFormat("");
        // console.log(y("Food Wrappers"));
        // create chart with <svg> element
        svg = d3.select(".topTen").append("svg")
          .attr("id", "chart")
          .attr("width", w)
          .attr("height", h);

        // "g" element is sort of like a div. you can't see it. it holds other elements inside of it and allows you to manipulate these children elements.

        chart = svg.append("g")
                          .classed("display", true)
                          .attr("transform", "translate("+margin.left+","+margin.top+")");
      }



      function plot(params){
        // console.log(this);
        this.append("g")
            .call(yGridlines)
            .classed("gridline", true)
            .attr("transform", "translate(0,0)");
        // DRAW THE BARS
        this.selectAll(".bar")
            .data(params.topTen)
            // enter phase: first time the topTen is bound. bind topTen to everything that follows
            .enter()
              // append a rectangle element for each piece of topTen- this will be the bar
              .append("rect")
              .classed("bar", true)
              .attr("x", function(d,i){
                return x(d.item);
              })
              .attr("y", function(d,i){
                return y(d.amount);
              })
              .attr("width", function(d,i){
                // return x(d.item);
                return x.bandwidth();
              })
              .attr("height", function(d,i){
                // return y.bandwidth()-1;
                return height - y(d.amount)
              })
              .style("fill", function(d,i){
                return ordinalColorScale(i);
              });
        // LABEL THE BARS
        this.selectAll(".bar-label")
            .data(params.topTen)
            .enter()
              .append("text")
              .classed("bar-label", true)
              .attr("x", function(d,i){
                return x(d.item) + (x.bandwidth()/2);
              })
              .attr("y", function(d,i){
                return y(d.amount);
              })
              // dy allows us to "nudge" the label
              .attr("dy", -6)
              .attr("dx", 0)
              .text(function(d,i){
                return d.amount;
              });

        this.append("g")
            .classed("x axis", true)
            .attr("transform", "translate("+ 0 +","+ height +")")
            .call(xAxis)
                .selectAll("text")
                    .style("text-anchor", "end")
                    .attr("dx", -8)
                    .attr("dy", 8)
                    .attr("transform", "translate(0,0) rotate(-45)");

        this.append("g")
            .classed("y axis", true)
            .attr("transform", "translate(0,0)")
            .call(yAxis);

        this.select(".y.axis")
            .append("text")
            .attr("x", 0)
            .attr("y", 0)
            .style("text-anchor", "middle")
            .attr("transform", "translate(-50,"+ height/2 +") rotate(-90)")
            .text("Units Consumed");

        this.select(".x.axis")
            .append("text")
            .attr("x", 0)
            .attr("y", 0)
            .style("text-anchor", "middle")
            .attr("transform", "translate(" + width/2 + ",80)")
            .text("Items Consumed")
      }

      getTopTenData = () => {
        fetch('/topTen')
          .then( response => response.json())
          .then( topTen => {
            // console.log(topTen);
            // debugger;
            drawChart(topTen);
            return topTen;

          }).then( topTen => {
            plot.call(chart, {
              topTen: topTen
            })
          }).catch(error => console.log(error))
      }
      getTopTenData();
