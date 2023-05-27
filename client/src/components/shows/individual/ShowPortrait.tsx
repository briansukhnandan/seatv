import React from 'react';
import { Show } from '../../../../../common/types/Show';
import Api from '../../../api/Api';

export const ShowPortrait = ({
  data, 
  api
}: {
  data: Show, 
  api: Api
}) => {
  return (
    <div>{data.name}</div>
  );
}

export default ShowPortrait;