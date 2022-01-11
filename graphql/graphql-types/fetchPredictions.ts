/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: fetchPredictions
// ====================================================

export interface fetchPredictions_fetchPredictions_match_teammatchSet_team {
  __typename: "TeamType";
  name: string;
}

export interface fetchPredictions_fetchPredictions_match_teammatchSet {
  __typename: "TeamMatchType";
  atHome: boolean;
  team: fetchPredictions_fetchPredictions_match_teammatchSet_team;
  score: number;
}

export interface fetchPredictions_fetchPredictions_match {
  __typename: "MatchType";
  startDateTime: any;
  roundNumber: number;
  year: number;
  teammatchSet: fetchPredictions_fetchPredictions_match_teammatchSet[];
}

export interface fetchPredictions_fetchPredictions_mlModel {
  __typename: "MLModelType";
  name: string;
}

export interface fetchPredictions_fetchPredictions_predictedWinner {
  __typename: "TeamType";
  name: string;
}

export interface fetchPredictions_fetchPredictions {
  __typename: "PredictionType";
  id: string;
  match: fetchPredictions_fetchPredictions_match;
  mlModel: fetchPredictions_fetchPredictions_mlModel;
  predictedWinner: fetchPredictions_fetchPredictions_predictedWinner;
  predictedMargin: number | null;
  isCorrect: boolean | null;
}

export interface fetchPredictions {
  fetchPredictions: fetchPredictions_fetchPredictions[];
}

export interface fetchPredictionsVariables {
  year?: number | null;
}
