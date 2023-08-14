const experienceIdExtractor = (Username) => {
  let fields = Username.split("@");
  let part1 = fields[1];
  let ExperimentID = part1.split(".").shift();
  return ExperimentID;
};

export default experienceIdExtractor;
