// Read csv
d3.csv("./supermarket_sales.csv").then(function(data) {
    //Create options city
    const cities = Array.from(new Set(data.map(d => d["City"])));
    const select = document.querySelector('#city')
    cities.forEach(city => {
        const option_tag = document.createElement("option");
        option_tag.text = city;
        option_tag.value = city;
        select.add(option_tag);
    })

    function updateChart1(city) {
        // Handle data
        const revenues = d3.rollup(data, values => d3.sum(values, d => d["City"] === city ? d["Total"] : 0), d => d["Product line"]);
        var revenueData = Array.from(revenues, ([key, value]) => ({
            productLine: key,
            revenue: value
        }));

        var margin = { top: 20, right: 20, bottom: 200, left: 70 };
        var width = 420 - margin.left - margin.right;
        var height = 550 - margin.top - margin.bottom;

        // Set up scale
        var x = d3.scaleBand()
            .domain(revenueData.map(d => d.productLine))
            .range([0, width])
            .padding(0.4)

        var y = d3.scaleLinear()
            .domain([0, 25000])
            .range([height, 0])

        // Select hover
        const hover = d3.select("#chart-container-1 .hover")


        // Create bar
        const svg = d3.select("#chart-container-1 .chart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        svg.selectAll(".bar")
            .data(revenueData)
            .enter()
            .append("rect")
            .attr("x", d => x(d.productLine))
            .attr("y", d => y(d.revenue))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.revenue))
            .attr("class", "bar")
            .on("mouseover", function (event, d) {
                hover.transition().duration(500).style("opacity", 0.9)
                hover.html(`${d.productLine}<br>Revenue: ${d.revenue.toFixed(1)}`)
                    .style("left", event.pageX + "px")
                    .style("top", event.pageY + "px");
                svg.selectAll(".bar").attr("opacity", "0.1")
                d3.select(this).attr("opacity", "1")
            })
          .on("mouseout", function () {
            hover.transition().duration(500).style("opacity", 0);
            svg.selectAll(".bar").attr("opacity", "0.8")
          });
        
        // Create x axis
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -margin.left + 5)
            .attr("y", -margin.top + 15);

        // Create y axis
        svg.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(y));
        
        // Add Y axis label
        svg.append("text")
            .attr("class", "axis")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", -margin.left + 15)
            .attr("text-anchor", "middle")
            .attr("font-size", "16")
            .text("Revenue");
        }
    
    function updateChart2(city) {
        const quantities = d3.rollup(data, values => d3.sum(values, d => d["City"] === city ? d["Quantity"] : 0), d => d["Product line"]);
        var quantityData = Array.from(quantities, ([key, value]) => ({
            productLine: key,
            quantity: value
        }));

        var margin = { top: 20, right: 20, bottom: 200, left: 70 };
        var width = 420 - margin.left - margin.right;
        var height = 550 - margin.top - margin.bottom;

        // Set up scale
        var x = d3.scaleBand()
            .domain(quantityData.map(d => d.productLine))
            .range([0, width])
            .padding(0.4)

        var y = d3.scaleLinear()
            .domain([0, 400])
            .range([height, 0])

        // Select hover
        const hover = d3.select("#chart-container-2 .hover")


        // Create bar
        const svg = d3.select("#chart-container-2 .chart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        svg.selectAll(".bar")
            .data(quantityData)
            .enter()
            .append("rect")
            .attr("x", d => x(d.productLine))
            .attr("y", d => y(d.quantity))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.quantity))
            .attr("class", "bar")
            .on("mouseover", function (event, d) {
                hover.transition().duration(500).style("opacity", 0.9)
                hover.html(`${d.productLine}<br>Quantity: ${d.quantity.toFixed(0)}`)
                    .style("left", event.pageX + "px")
                    .style("top", event.pageY + "px");
                svg.selectAll(".bar").attr("opacity", "0.1")
                d3.select(this).attr("opacity", "1")
            })
          .on("mouseout", function () {
            hover.transition().duration(500).style("opacity", 0);
            svg.selectAll(".bar").attr("opacity", "0.8")
          });
        
        // Create x axis
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -margin.left + 5)
            .attr("y", -margin.top + 15);

        // Create y axis
        svg.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(y));
        
        // Add Y axis label
        svg.append("text")
            .attr("class", "axis")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", -margin.left + 20)
            .attr("text-anchor", "middle")
            .attr("font-size", "16")
            .text("Product Sales Quantity");
    }

    updateChart1("Yangon");
    updateChart2("Yangon");
    
    select.onchange = function() {
        const city = select.value;
        d3.selectAll(".chart").selectAll("*").remove();
        updateChart1(city);
        updateChart2(city);
    }
})