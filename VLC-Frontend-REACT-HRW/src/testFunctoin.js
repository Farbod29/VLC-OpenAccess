const experienceIDExtractor = (Username) => {
  let fields = Username.split('@');
  let part1 = fields[1];
  let ExperimentID = part1.split('.').shift();
  return ExperimentID;
};

// let username = "usrT5SD5FG33@5OCT2021HRW.eu";
// console.log(experienceIDExtractor(username));
