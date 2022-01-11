/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: fetchSeasonModelMetrics
// ====================================================

export interface fetchSeasonModelMetrics_fetchSeasonModelMetrics_roundModelMetrics_modelMetrics_mlModel {
  __typename: "MLModelType";
  name: string;
}

export interface fetchSeasonModelMetrics_fetchSeasonModelMetrics_roundModelMetrics_modelMetrics {
  __typename: "ModelMetricsByRoundType";
  mlModel: fetchSeasonModelMetrics_fetchSeasonModelMetrics_roundModelMetrics_modelMetrics_mlModel;
  /**
   * Cumulative mean of correct tips (i.e. accuracy) made by the given model for the given season.
   */
  cumulativeAccuracy: number;
  /**
   * Cumulative bits metric for the given season.
   */
  cumulativeBits: number;
  /**
   * Cumulative mean absolute error for the given season
   */
  cumulativeMeanAbsoluteError: number;
  /**
   * Cumulative sum of correct tips made by the given model for the given season
   */
  cumulativeCorrectCount: number;
  /**
   * Cumulative difference between predicted margin and actual margin for the given season.
   */
  cumulativeMarginDifference: number;
}

export interface fetchSeasonModelMetrics_fetchSeasonModelMetrics_roundModelMetrics {
  __typename: "RoundType";
  roundNumber: number;
  /**
   * Performance metrics for predictions made by the given model through the given round
   */
  modelMetrics: fetchSeasonModelMetrics_fetchSeasonModelMetrics_roundModelMetrics_modelMetrics[];
}

export interface fetchSeasonModelMetrics_fetchSeasonModelMetrics {
  __typename: "SeasonType";
  season: number;
  /**
   * Model performance metrics grouped by round
   */
  roundModelMetrics: fetchSeasonModelMetrics_fetchSeasonModelMetrics_roundModelMetrics[];
}

export interface fetchSeasonModelMetrics {
  fetchSeasonModelMetrics: fetchSeasonModelMetrics_fetchSeasonModelMetrics;
}

export interface fetchSeasonModelMetricsVariables {
  season?: number | null;
  roundNumber?: number | null;
  forCompetitionOnly?: boolean | null;
}
