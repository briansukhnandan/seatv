import React from 'react';
import { Show } from '../../../../../common/types/Show';

export const ShowPortrait = ({data, api}) => {
  return (
    <div>{data.name}</div>
  );
}

export default ShowPortrait;