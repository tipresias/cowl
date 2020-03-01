// @flow
import React from 'react';
import type { Node } from 'react';
import {
  BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { isEmpty } from 'lodash';
import type { BarChartDataType } from '../../types';

type PreviousDataSet = Array<BarChartDataType>;

type Props = {
  data: PreviousDataSet,
  models: Array<string>,
}

type NewDataItem = {
  roundNumber: number,
  [key: string]: number
}

type NewDataSet = Array<NewDataItem>

const dataTransformer = (previousDataSet: PreviousDataSet): NewDataSet => {
  const newDataSet = previousDataSet.reduce((acc, currentItem, currentIndex) => {
    acc[currentIndex] = acc[currentIndex] || {};
    acc[currentIndex].roundNumber = currentItem.roundNumber;
    currentItem.modelMetrics.forEach((item) => {
      const { modelName } = item;
      acc[currentIndex][modelName] = item.cumulativeCorrectCount;
    });
    return acc;
  }, []);
  return newDataSet;
};

const BarChartMain = ({ data, models }: Props): Node => {
  const dataTransformed = dataTransformer(data);
  const colorblindFriendlyPalette = ['#E69F00', '#56B4E9', '#009E73', '#CC79A7', '#0072B2', '#D55E00', '#F0E442'];

  return (
    <ResponsiveContainer width="100%" height={451}>
      <BarChart
        width={800}
        height={300}
        data={dataTransformed}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="roundNumber" />
        <YAxis />
        <Tooltip />
        <Legend />
        {!isEmpty(models) && models.map((item, i) => <Bar dataKey={item} fill={colorblindFriendlyPalette[i]} key={`model-${item}`} />)}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartMain;
