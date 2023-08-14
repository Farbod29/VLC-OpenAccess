import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts/highstock'; // https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/plotoptions/series-allowpointselect-pie/
//import HighchartsReact from "./HighchartsReact.js";
import serverSideAddresses from '../../utils/ServerSideAddress.js';
import PieChart from 'highcharts-react-official'; // https://api.highcharts.com/highcharts/chart
import _ from 'lodash';

const options = {
  chart: {
    styleMode: 'true',
    type: 'pie',
    margin: [10, 10, 10, 10],
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
  },
  title: {
    pointFormat: "Other's Opinions",
    text: "Other's Opinions",
  },
  series: [
    {
      name: 'User Response',
      colorByPoint: true,
      data: [],
    },
  ],
};

const PieChartVotes = ({ imageUrl }) => {
  const [chartData, setChartData] = useState(null);

  const experienceIDExtractor = (Username) => {
    let fields = Username.split('@');
    let part1 = fields[1];
    let ExperimentID = part1.split('.').shift();
    return ExperimentID;
  };

  const getImageVoteReactionInfoApi = () =>
    new Promise((resolve, reject) => {
      let userId = localStorage.getItem('companionUserToken');
      let experienceId = experienceIDExtractor(userId);
      fetch(
        `${serverSideAddresses}/image/reaction-analysis?image_url=${imageUrl}&experience_id=${experienceId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            user_id: userId,
          },
        }
      )
        .then((response) => response.json())
        .then((res) => {
          if (res.success === true) resolve(res);
          else reject(new Error('unable to fetch'));
        })
        .catch((err) => reject(err));
    });

  const getImageVoteReactionInfo = async () => {
    try {
      const resp = await getImageVoteReactionInfoApi();
      console.log('resp is', resp);
      let votes = resp.images[0].votes;
      let result = _.groupBy(votes, 'userId'); // miyad kolle array of object ro migire bar assasse parameter userId makes 2 array   {user1 : [array(5)] user2 : [array(6)]}
      console.log('voting result is', result);
      let voteSet = {};
      Object.keys(result).map((item) => {
        let eachUserLastVote = _.orderBy(result[item], 'timestamp', [
          'desc',
        ])[0]['vote'];
        console.log('ordered objects for votes according to timestamp');
        console.log(eachUserLastVote);
        if (eachUserLastVote.length > 0) {
          if (voteSet[eachUserLastVote]) {
            // if the user vote exist it increase one more time !
            voteSet[eachUserLastVote] = voteSet[eachUserLastVote] + 1;
          } else {
            voteSet[eachUserLastVote] = 1;
          }
        }
      });
      //console.log('voteSet is', voteSet);
      let optionData = [];
      Object.keys(voteSet).forEach((vote) =>
        optionData.push({ name: vote, y: voteSet[vote] })
      );
      console.log('final Count', voteSet);
      let optionTemp = options;
      optionTemp.series[0].data = optionData;
      setChartData(optionTemp);
    } catch (error) {
      console.log('unable to fetch data', error);
    }
  };

  useEffect(() => {
    getImageVoteReactionInfo();
  }, [imageUrl]);

  return (
    <div>
      <div>
        {chartData ? (
          <PieChart
            highcharts={Highcharts}
            options={chartData}
            style={{ width: 120 }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default PieChartVotes;
