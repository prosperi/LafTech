import React, { Component } from 'react'
import {Chart} from 'react-d3-core'
import {LineChart} from 'react-d3-basic'
import { Container, Image, Header, Icon, Dropdown, Divider } from 'semantic-ui-react'
export default class Visualization3 extends Component {
  constructor (props) {
    super(props);

    /*this.state = {
      data: [
        {schoolName: "Huntington", totalRevenue: 100000, satMath: 570.25,
                                   satReading:  640.00, satWriting: 584.10},
        {schoolName: "Huntington", totalRevenue: 200000, satMath: 590.20,
                                   satReading: 660.52, satWriting: 543.30},
        {schoolName: "Huntington", totalRevenue: 300000, satMath: 600.25,
                                   satReading: 610.00, satWriting: 575.10},
        ]

      }*/
  }

  render() {
  var schoolList = ["Huntington", "Mason", "Carter"];
  var satMath = [570.25, 640.00, 584.10];
  var satReading = [590.20, 660.52, 543.30];
  var satWriting = [600.25, 610.00, 575.10];
  /*var schoolData = [
    {schoolName: "Huntington", totalRevenue: 100000, satMath: 570.25,
                            satReading:  640.00, satWriting: 584.10 },
    {schoolName: "Mason", totalRevenue: 200000, satMath: 590.20,
                              satReading: 660.52, satWriting: 543.30},
    {schoolName: "Carter", totalRevenue: 300000, satMath: 600.25,
                              satReading: 610.00, satWriting: 575.10}
    ];*/

    var chartData = [
    {
        "name": "Darron Weissnat IV",
        "BMI": 20.72,
        "age": 39,
        "birthday": "2005-01-03T00:00:00.000Z",
        "city": "East Russel",
        "married": false,
        "index": 0
    },
    {
        "name": "Pablo Ondricka",
        "BMI": 19.32,
        "age": 38,
        "birthday": "1974-05-13T00:00:00.000Z",
        "city": "Lake Edytheville",
        "married": false,
        "index": 1
    },
    {
        "name": "Mr. Stella Kiehn Jr.",
        "BMI": 16.8,
        "age": 34,
        "birthday": "2003-07-25T00:00:00.000Z",
        "city": "Lake Veronicaburgh",
        "married": false,
        "index": 2
    },
    {
        "name": "Lavon Hilll I",
        "BMI": 20.57,
        "age": 12,
        "birthday": "1994-10-26T00:00:00.000Z",
        "city": "Annatown",
        "married": true,
        "index": 3
    },
    {
        "name": "Clovis Pagac",
        "BMI": 24.28,
        "age": 26,
        "birthday": "1995-11-10T00:00:00.000Z",
        "city": "South Eldredtown",
        "married": false,
        "index": 4
    },
    {
        "name": "Gaylord Paucek",
        "BMI": 24.41,
        "age": 30,
        "birthday": "1975-06-12T00:00:00.000Z",
        "city": "Koeppchester",
        "married": true,
        "index": 5
    },
    {
        "name": "Ashlynn Kuhn MD",
        "BMI": 23.77,
        "age": 32,
        "birthday": "1985-08-09T00:00:00.000Z",
        "city": "West Josiemouth",
        "married": false,
        "index": 6
    },
    {
        "name": "Fern Schmeler IV",
        "BMI": 27.33,
        "age": 26,
        "birthday": "2005-02-10T00:00:00.000Z",
        "city": "West Abigaleside",
        "married": true,
        "index": 7
    },
    {
        "name": "Enid Weber",
        "BMI": 18.72,
        "age": 17,
        "birthday": "1998-11-30T00:00:00.000Z",
        "city": "Zackton",
        "married": true,
        "index": 8
    },
    {
        "name": "Leatha O'Hara",
        "BMI": 17.68,
        "age": 42,
        "birthday": "2010-10-17T00:00:00.000Z",
        "city": "Lake Matilda",
        "married": false,
        "index": 9
    },
    {
        "name": "Korbin Steuber",
        "BMI": 16.35,
        "age": 39,
        "birthday": "1975-06-30T00:00:00.000Z",
        "city": "East Armandofort",
        "married": true,
        "index": 10
    },
    {
        "name": "Brennon Torphy",
        "BMI": 27.37,
        "age": 24,
        "birthday": "2003-10-21T00:00:00.000Z",
        "city": "Croninfort",
        "married": true,
        "index": 11
    },
    {
        "name": "Ms. Genoveva Bradtke",
        "BMI": 28.63,
        "age": 19,
        "birthday": "1983-01-10T00:00:00.000Z",
        "city": "Port Emanuel",
        "married": true,
        "index": 12
    },
    {
        "name": "Gregg Halvorson",
        "BMI": 15.45,
        "age": 15,
        "birthday": "2004-06-15T00:00:00.000Z",
        "city": "Lake Angelinastad",
        "married": false,
        "index": 13
    },
    {
        "name": "Mr. Sabina Schroeder III",
        "BMI": 24.27,
        "age": 26,
        "birthday": "1980-11-22T00:00:00.000Z",
        "city": "Toyview",
        "married": true,
        "index": 14
    },
    {
        "name": "Alanna Mitchell",
        "BMI": 29.25,
        "age": 37,
        "birthday": "1971-08-04T00:00:00.000Z",
        "city": "Lake Monserratmouth",
        "married": false,
        "index": 15
    },
    {
        "name": "Ronny Sanford",
        "BMI": 29.16,
        "age": 24,
        "birthday": "1994-11-24T00:00:00.000Z",
        "city": "New Claudhaven",
        "married": false,
        "index": 16
    },
    {
        "name": "Emmitt Pouros",
        "BMI": 27.95,
        "age": 14,
        "birthday": "1989-04-04T00:00:00.000Z",
        "city": "Moorefurt",
        "married": true,
        "index": 17
    },
    {
        "name": "Earl Purdy",
        "BMI": 18.34,
        "age": 38,
        "birthday": "2013-04-03T00:00:00.000Z",
        "city": "Lake Rowanberg",
        "married": true,
        "index": 18
    },
    {
        "name": "Cordelia Klocko",
        "BMI": 25.85,
        "age": 36,
        "birthday": "2011-01-17T00:00:00.000Z",
        "city": "Lakinchester",
        "married": true,
        "index": 19
    },
    {
        "name": "Guido Conroy",
        "BMI": 25.17,
        "age": 39,
        "birthday": "1977-04-20T00:00:00.000Z",
        "city": "Scarlettland",
        "married": true,
        "index": 20
    },
    {
        "name": "Miss Demond Weissnat V",
        "BMI": 21.44,
        "age": 19,
        "birthday": "2007-06-09T00:00:00.000Z",
        "city": "Savionberg",
        "married": false,
        "index": 21
    },
    {
        "name": "Easton Mante",
        "BMI": 20.61,
        "age": 43,
        "birthday": "2007-01-29T00:00:00.000Z",
        "city": "Kutchberg",
        "married": false,
        "index": 22
    },
    {
        "name": "Dayton Ebert",
        "BMI": 29.88,
        "age": 20,
        "birthday": "1978-04-27T00:00:00.000Z",
        "city": "West Wiley",
        "married": true,
        "index": 23
    }
]

  var width = 700, height = 300, margins = {left: 10, right: 100,
      top: 50, bottom: 50}, title = "Visualization 3",
      chartSeries = [
          {
            field: 'age',
            name: 'Age',
            color: '#ff7f0e',
            style: {
              "stroke-width": 2,
              "stroke-opacity": .2,
              "fill-opacity": .2
            }
          }
        ],
        x = function(d) {
          return d.index;
        }


  /*var scale = d3.scale.linear()
    .domain([0,schoolData.max(totalRevenue)])
    .ransge([0,2400]);

    console.log(scale(schoolData.max(totalRevenue)))
s*/
    return (
      <Container fluid>
        <Container className='district-section' fluid>
          <Header as='h1' className='hint'>Visualization 3</Header>
          <Chart
    title={title}
    width={width}
    height={height}
    margins= {margins}
    >
    <LineChart
      margins= {margins}
      title={title}
      data={chartData}
      width={width}
      height={height}
      chartSeries={chartSeries}
      x={x}
    />
  </Chart>
        </Container>
      </Container>
    )
  }
}
