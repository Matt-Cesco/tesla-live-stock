import React from 'react';
import Plot from "react-plotly.js";

class Stock extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         stockChartXValues: [],
         stockChartYValues: []
      }
   }

   componentDidMount() {
      this.fetchStock();
   }

   fetchStock() {
      const pointerToThis = this;
      const API_KEY = 'CJSC1UANCF5PMEJS';
      let StockSymbol = 'TSLA';
      let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
      let stockChartXValuesFunction =[];
      let stockChartYValuesFunction = [];

      fetch(API_Call)
      .then(
         function(response) {
            return response.json();
         }
      )
      .then(
         function(data) {
            console.log(data);

            for (var key in data['Time Series (Daily)']) {
               stockChartXValuesFunction.push(key);
               stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
            }

            pointerToThis.setState({
              stockChartXValues: stockChartXValuesFunction,
              stockChartYValues: stockChartYValuesFunction,
            });
         }
      )
   }

 
   render() {
      return (
        <div>
          <h1>Tesla Stock API</h1>
          <Plot
            data={[
              {
                x: this.state.stockChartXValues,
                y: this.state.stockChartYValues,
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "red" },
              },
            ]}
            layout={{ width: 1440, height: 840, title: "Tesla stocks" }}
          />
        </div>
      );
   }
}

export default Stock;