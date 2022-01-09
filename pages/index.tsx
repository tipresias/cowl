import React from "react";
import { useQuery } from "@apollo/client";
import { FETCH_CHART_PARAMETERS_QUERY } from "../graphql";
import { MetricName } from "../lib/dataTransformation";
import { log } from "../lib/logging";
import { fetchSeasonPerformanceChartParameters } from "../graphql/graphql-types/fetchSeasonPerformanceChartParameters";
import Dashboard from "../components/Dashboard";

export type ModelType = {
  name: string;
  usedInCompetitions: boolean;
  isPrincipal: boolean;
  predictionSeasons: Array<number>;
};

const METRIC_NAMES: MetricName[] = [
  "cumulativeAccuracy",
  "cumulativeBits",
  "cumulativeMeanAbsoluteError",
  "cumulativeCorrectCount",
];

const Home = () => {
  const { data, loading, error } =
    useQuery<fetchSeasonPerformanceChartParameters>(
      FETCH_CHART_PARAMETERS_QUERY
    );
  if (loading) return <div>Loading Tipresias....</div>;
  if (error) {
    log.error(error);
    return <div>Error: Something happened, try again later.</div>;
  }
  if (data === undefined) return <p>Error: Data not defined.</p>;

  const {
    fetchSeasonPerformanceChartParameters: {
      availableSeasons: years,
      availableMlModels: models,
    },
  } = data;

  return <Dashboard years={years} models={models} metrics={METRIC_NAMES} />;
};

export default Home;
