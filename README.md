# myPlastics
![myPlastics logo](/images/myplastics_logo_screenshot.png)
myPlastics was built for our planet. It is meant to encourage users to make conscious decisions regarding their consumption of plastic materials.

## Technology Used
* Mongoose
* Express
* EJS
* Node.js
* D3
* jQuery

![myPlastics chart](/images/myPlastics_topTen_sh.png)

## User Stories
* Users can input their own plastic usage.
* Users can view their plastic usage results for one year on a chart.
* Users can view other users' waste totals.

This was my very first attempt at learning D3, a language popular for creating dynamic, interactive, data visualizations using svg elements. D3's syntax has the familiarity of jQuery throughout which made picking up the basics of building a graph not as difficult as one might think! DOM nodes are selected and then manipulated with methods similar to jQuery.

The aspect of this project that I struggled the most with was accessing the user plastics database. Karolin Rafalski was kind enough to help me in implementing a function which selected data from the innerText of the EJS document. I was happy to have come to a solution but then learned through trial and error that this was not a dynamic way to access my data. Thus, I was not able to label the bars of the user's results graph.

## Issues I was not able to solve yet:
* Accessing data dynamically from the database
* Labeling the axis of a graph
