import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { scaleLinear } from 'd3-scale';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { renderToString } from 'react-dom/server';

import Flagicon from '../flagicon';

import Data from '../../assets/maps/world.json';

import '../tooltip.css';

const regionCenter = {
  World: [0, 20],
  Africa: [17, 3],
  Asia: [80, 25],
  Europe: [20, 56],
  'North America': [-102, 45],
  Oceania: [140, -26],
  'South America': [-58, -23],
};

const regionScale = {
  World: 205,
  Africa: 450,
  Asia: 450,
  Europe: 450,
  'North America': 420,
  Oceania: 450,
  'South America': 450,
};

type HoverMapProps = {
  countries: any;
  interactive: any;
  region: any;
};

const renderFlag = (countrycode) => {
  if (countrycode === '-99') return '';
  return renderToString(<Flagicon code={countrycode} size="lg" className="country-table-flag" />);
};

const HoverMap: React.FC<HoverMapProps> = (props) => {
  const { countries, interactive, region } = props;

  const navigate = useNavigate();

  const handleMapClick = (geography: any): void => {
    if (interactive) {
      navigate(geography.properties.iso_a2);
    }
  };

  const popScale = scaleLinear().domain([0, 10, 200]).range(['#CFD8DC', '#607D8B', '#37474F']);

  const countriesMap = {};

  countries.forEach((country) => {
    countriesMap[country.code.toUpperCase()] = country.count;
  });

  return (
    <>
      <ComposableMap
        projectionConfig={{
          scale: regionScale[region],
          rotation: [-11, 0, 0],
        }}
        width={980}
        height={551}
        style={{
          width: '100%',
          height: 'auto',
        }}
      >
        <ZoomableGroup center={regionCenter[region]} disablePanning>
          <Geographies geography={Data} disableOptimization>
            {(geographies, projection): Array<ReactElement> =>
              geographies
                .filter((geography: any) => region === 'World' || geography.properties.continent === region)
                .map((geography: any) => (
                  <Geography
                    key={geography.properties.name}
                    data-tip={`
                    <div class="tooltip-container">
                        <div class="tooltip-image">
                          ${renderFlag(geography.properties.iso_a2.toLowerCase())}
                        </div>
                        <div class="tooltip-text">
                          <p>${geography.properties.name}</p>
                          <p>${
                            countriesMap[geography.properties.iso_a2.toUpperCase()]
                              ? countriesMap[geography.properties.iso_a2.toUpperCase()]
                              : '0'
                          } unique</p>
                        </div>
                    </div>`}
                    geography={geography}
                    projection={projection}
                    onClick={handleMapClick}
                    style={{
                      default: {
                        cursor: 'pointer',
                        fill: countriesMap[geography.properties.iso_a2.toUpperCase()]
                          ? popScale(countriesMap[geography.properties.iso_a2.toUpperCase()])
                          : '#ffffff',
                        stroke: '#607D8B',
                        strokeWidth: 0.75,
                        outline: 'none',
                      },
                      hover: {
                        cursor: 'pointer',
                        fill: '#263238',
                        stroke: '#607D8B',
                        strokeWidth: 0.75,
                        outline: 'none',
                      },
                      pressed: {
                        cursor: 'pointer',
                        fill: '#263238',
                        stroke: '#607D8B',
                        strokeWidth: 0.75,
                        outline: 'none',
                      },
                    }}
                  />
                ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <ReactTooltip html={true} />
    </>
  );
};

export default HoverMap;
