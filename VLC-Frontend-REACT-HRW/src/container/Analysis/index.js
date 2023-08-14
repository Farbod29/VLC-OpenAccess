import React from 'react';
import PieChartVotes from '../HighcahrtVotes/PieChart';
import companionContext from '../../context.js';
//import Forum from '../Forum/Forum.js';

const Analysis = () => {
  const consumer = React.useContext(companionContext);
  let image_url_Trigger =
    consumer.receivedImageInfo.image_meta_information.image_url;
  React.useEffect(() => {
    // component did mount / will unmount
  }, [image_url_Trigger]);
  return (
    <div style={{ width: 480, margin: 10 }}>
      <div>
        <PieChartVotes
          style={{ width: 360, margin: 15 }}
          imageUrl={consumer.receivedImageInfo.image_meta_information.image_url}
        />
      </div>
      {/* <div>
        <Forum style={{ width: 300, margin: 40 }} />
      </div> */}
    </div>
  );
};
export default Analysis;
