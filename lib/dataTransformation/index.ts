import type {
  fetchSeasonModelMetrics_fetchSeasonModelMetrics_roundModelMetrics
  as RoundType,
} from '../../graphql/graphql-types/fetchSeasonModelMetrics';
import sortBy from 'lodash/sortBy';
import type {
  fetchLatestRoundPredictions_fetchLatestRoundPredictions_matchPredictions as MatchPredictionType,
} from '../../graphql/graphql-types/fetchLatestRoundPredictions';
import icons from '../../icons';

const { iconCheck, iconCross, iconQuestion } = icons;

type MatchPredictionsType = Array<MatchPredictionType>;
type SvgIcon = { svg: boolean, text: string, path: string }
type RowType = Array<string | SvgIcon>;
type DataTableType = Array<RowType>;
type NewDataItem = {
  roundNumber: number,
  [key: string]: number
}
type NewDataSet = Array<NewDataItem>
export type MetricName = 'cumulativeAccuracy' | 'cumulativeBits' | 'cumulativeMeanAbsoluteError' | 'cumulativeCorrectCount' | 'cumulativeMarginDifference'
interface Metric {
  name: MetricName,
  label: string
}

export const dataTransformerLineChart = (
  roundModelMetrics: Array<RoundType>,
  metric: Metric,
): NewDataSet => {
  const newDataSet = roundModelMetrics.reduce((acc: NewDataSet, currentItem, currentIndex) => {
    const { roundNumber, modelMetrics } = currentItem;
    acc[currentIndex] = acc[currentIndex] || {};
    acc[currentIndex].roundNumber = roundNumber;
    modelMetrics.forEach((item) => {
      if (!item) return;
      const { mlModel: { name } } = item;
      // cumulativeAccuracy: %
      if (metric.name === 'cumulativeAccuracy') {
        const metricPercentage = (item[metric.name] * 100);
        acc[currentIndex][name] = parseFloat(metricPercentage.toFixed(2));
      } else {
        // bits and MAE: decimal
        acc[currentIndex][name] = parseFloat(item[metric.name].toFixed(2));
      }
    });
    return acc;
  }, []);

  return newDataSet;
};

const determineResultIcon = (isCorrect: boolean | null) => {
  if (isCorrect) {
    return { svg: true, text: 'prediction was correct', path: iconCheck.src };
  }

  return isCorrect === false
    ? { svg: true, text: 'prediction was incorrect', path: iconCross.src }
    : { svg: true, text: 'result is unknown', path: iconQuestion.src };
};

export const dataTransformerTable = (
  matchPredictions: MatchPredictionsType,
): DataTableType => {
  const newDataSet = sortBy(matchPredictions, ['startDateTime']).reduce((acc: DataTableType, {
    startDateTime, predictedWinner, predictedMargin, predictedWinProbability, isCorrect,
  }, currentIndex) => {
    acc[currentIndex] = acc[currentIndex] || [];

    const [date] = startDateTime.split('T');
    const formattedpredictedMargin = (Math.round(predictedMargin * 10) / 10).toString();
    const formattedWinProbability = `
      ${(Math.round(predictedWinProbability * 1000) / 10).toString()}%
    `;
    const resultIcon = determineResultIcon(isCorrect);

    acc[currentIndex] = [
      date,
      predictedWinner,
      formattedpredictedMargin,
      formattedWinProbability,
      resultIcon,
    ];

    return acc;
  }, []);
  return newDataSet;
};
