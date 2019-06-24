// @flow
import React, { Component } from 'react';
import type { Node } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components/macro';
import {
  FETCH_PREDICTION_YEARS_QUERY,
  FETCH_YEARLY_PREDICTIONS_QUERY,
  FETCH_LATEST_ROUND_PREDICTIONS_QUERY,
} from '../../graphql';
import PageHeader from '../../components/PageHeader';
import PageFooter from '../../components/PageFooter';
import BarChartMain from '../../components/BarChartMain';
import Select from '../../components/Select';
import BarChartLoading from '../../components/BarChartLoading';
import StatusBar from '../../components/StatusBar';
import DefinitionList from '../../components/DefinitionList';
import Table from '../../components/Table';
import {
  AppContainer, WidgetStyles, WidgetHeading, WidgetFooter,
} from './style';


type State = {
  year: number
};
type Props = {};

const Widget = styled.div`${WidgetStyles}`;

class App extends Component<Props, State> {
  state = {
    year: 2018,
  };

  onChangeYear = (event: SyntheticEvent<HTMLSelectElement>): void => {
    this.setState({ year: parseInt(event.currentTarget.value, 10) });
  };

  render() {
    const { year } = this.state;
    return (
      <AppContainer>
        <PageHeader />
        <Widget gridColumn="2 / -2">
          <WidgetHeading>Cumulative points per round</WidgetHeading>
          <Query query={FETCH_YEARLY_PREDICTIONS_QUERY} variables={{ year }}>
            {(response: any): Node => {
              const { loading, error, data } = response;
              if (loading) return <BarChartLoading text="Loading predictions..." />;
              if (error) return <StatusBar text={error.message} error />;
              if (data.fetchYearlyPredictions.predictionsByRound.length === 0) return <StatusBar text="No data found" empty />;
              return <BarChartMain data={data.fetchYearlyPredictions.predictionsByRound} />;
            }}
          </Query>
          <WidgetFooter>
            <Query query={FETCH_PREDICTION_YEARS_QUERY}>
              {(response: any): Node => {
                const { loading, error, data } = response;
                if (loading) return <p>Loading predictions...</p>;
                if (error) return <StatusBar text={error.message} error />;
                return (
                  <Select
                    name="year"
                    value={year}
                    onChange={this.onChangeYear}
                    options={data.fetchPredictionYears}
                  />
                );
              }}
            </Query>
          </WidgetFooter>
        </Widget>

        <Widget gridColumn="2 / -2">
          <Query query={FETCH_LATEST_ROUND_PREDICTIONS_QUERY}>
            {(response: any): Node => {
              const { loading, error, data } = response;
              if (loading) return <p>Loading predictions...</p>;
              if (error) return <StatusBar text={error.message} error />;
              if (data.fetchLatestRoundPredictions.matches.length === 0) return <StatusBar text="No data found" empty />;

              const seasonYear = data.fetchLatestRoundPredictions.matches[0].year;
              const { roundNumber } = data.fetchLatestRoundPredictions;

              return (
                <Table
                  caption={`Tipresias predictions for matches of round ${roundNumber}, season ${seasonYear}`}
                  headers={['Date', 'Predicted Winner', 'Predicted margin', 'Predicted Loser', 'is Correct?']}
                  rows={data.fetchLatestRoundPredictions.matches}
                />
              );
            }}
          </Query>
        </Widget>

        <Widget gridColumn="2 / -4">
          <WidgetHeading>
            Tipresias performance metrics for last round in current season (year: 2019)
          </WidgetHeading>
          <DefinitionList items={[
            {
              id: 1,
              key: 'Total Points',
              value: 'wip',
            },
            {
              id: 2,
              key: 'Total Margin',
              value: 'wip',
            },
            {
              id: 3,
              key: 'MAE',
              value: 'wip',
            },
          ]}
          />
        </Widget>

        <PageFooter />
      </AppContainer>
    );
  }
}

export default App;
