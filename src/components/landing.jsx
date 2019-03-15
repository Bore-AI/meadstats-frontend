import React from 'react';

import { Button, Jumbotron } from 'reactstrap';
import MockMap from './mockmap';
import { Bar, Line } from 'react-chartjs-2';

const barData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      backgroundColor: '#343a40',
      borderColor: '#01070D',
      borderWidth: 2,
      data: [50, 62, 102, 40, 80, 90, 80]
    }
  ]
};

const ratingBarData = {
  labels: [2015, 2016, 2017, 2018, 2019],
  datasets: [
    {
      borderColor: '#01070D',
      borderWidth: 2,
      data: [3.5, 3.2, 3.8, 4.1, 4.6]
    }
  ]
};

export default function Landing(props) {
  return (
    <>
      <Jumbotron className="bg-dark text-white">
        <h1 className="display-3">Meadstats</h1>
        <p className="lead">Discover deeper insights about your beers</p>
      </Jumbotron>

      <div class="card-deck">
        <div class="card">
          <div class="card-img-top p-3">
            <Bar
              data={barData}
              legend={{ display: false }}
              options={{
                scales: {
                  yAxes: [
                    {
                      ticks: { display: false, beginAtZero: true },
                      gridLines: {
                        display: false,
                        drawBorder: false
                      }
                    }
                  ],
                  xAxes: [
                    {
                      gridLines: {
                        display: false,
                        drawBorder: false
                      }
                    }
                  ]
                },
                title: { display: true, text: 'Count by day of week' }
              }}
            />
          </div>
          <div class="card-body">
            <h5 class="card-title">Patterns</h5>
            <p class="card-text">
              When and on which day do you consume the most beer? Which year did
              you consume the most?
            </p>
          </div>
        </div>
        <div class="card">
          <div class="card-img-top p-3">
            <MockMap username="boren" />
          </div>
          <div class="card-body">
            <h5 class="card-title">Interactive map</h5>
            <p class="card-text">
              See where you have been and discover your favorite countries.
            </p>
          </div>
        </div>
        <div class="card">
          <div class="card-img-top p-3">
            <Line
              data={ratingBarData}
              legend={{ display: false }}
              options={{
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        display: false
                      },
                      gridLines: {
                        display: false,
                        drawBorder: false
                      }
                    }
                  ],
                  xAxes: [
                    {
                      gridLines: {
                        display: false,
                        drawBorder: false
                      }
                    }
                  ]
                },
                title: { display: true, text: 'Average rating by year' }
              }}
            />
          </div>
          <div class="card-body">
            <h5 class="card-title">Trends</h5>
            <p class="card-text">
              Are you getting more skeptical or are you choosing better bers?
              Watch how your rating changes over time.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mt-4 mb-4">
        <Button
          size="lg"
          href="https://untappd.com/oauth/authenticate/?client_id=AD153FB3121F3B72DF627FE5AB27140E32C12BDA&response_type=code&redirect_url=https://api.meadstats.com/auth_callback"
        >
          Sign in with Untappd
        </Button>
      </div>
    </>
  );
}
