import React from "react";

const BoldSentenceMaker = (props) => {

    const importantSegments = props.ghasem;
    //const JudgementSegments = data.resp.image_meta_information.ReverseImagesMetadata[0].JudgementSegments;
    let importantSegmentsKeys = Object.keys(importantSegments);

    const sentenceBeautify = (sentence, targetWordsArray) => {
        let result = [];
        let splitSentence = sentence.split(" ");
        result = splitSentence.map(word => {
            if (targetWordsArray.some(wordInTargetArr => word.toLowerCase().includes(wordInTargetArr.toLowerCase()))) {
                return <span style={{color: `${props.rang}`}}>{word} </span>
            } else {
                return <span style={{color: "gray"}}>{word} </span>
            }
        });
        return result;
    };
    return (
        <div>
            <div>
                {
                    importantSegmentsKeys.map((item, indexSegment) => {
                            return (
                                <div key={indexSegment}>
                                    <h1 > {item} </h1>
                                    <div>
                                        <h3>
                                            {sentenceBeautify(importantSegments[item][0], importantSegmentsKeys)}
                                        </h3>
                                        {importantSegments[item][1] && <h3>
                                            {sentenceBeautify(importantSegments[item][1], importantSegmentsKeys)}
                                        </h3>}
                                        {importantSegments[item][2] && <h3>
                                            {sentenceBeautify(importantSegments[item][2], importantSegmentsKeys)}
                                        </h3>}
                                    </div>
                                </div>
                            )
                        }
                    )
                }
            </div>
        </div>
    );
};

export default BoldSentenceMaker;
