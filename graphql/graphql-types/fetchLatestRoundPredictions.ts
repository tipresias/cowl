/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: fetchLatestRoundPredictions
// ====================================================

export interface fetchLatestRoundPredictions_fetchLatestRoundPredictions_matchPredictions {
  __typename: "MatchPredictionType";
  startDateTime: any;
  predictedWinner: string;
  predictedMargin: number;
  predictedWinProbability: number;
  isCorrect: boolean | null;
}

export interface fetchLatestRoundPredictions_fetchLatestRoundPredictions {
  __typename: "RoundPredictionType";
  roundNumber: number;
  matchPredictions: fetchLatestRoundPredictions_fetchLatestRoundPredictions_matchPredictions[];
}

export interface fetchLatestRoundPredictions {
  /**
   * Official Tipresias predictions for the latest round for which data is available
   */
  fetchLatestRoundPredictions: fetchLatestRoundPredictions_fetchLatestRoundPredictions;
}
