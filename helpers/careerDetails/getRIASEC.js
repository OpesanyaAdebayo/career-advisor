//@ts-check
const sortProfile = (profile) => {
    // remove unnecessary details from personality profile
    let trimmedProfile = profile.personality_profile.personality.map((facet) => {
        return {
            'trait_id': facet.trait_id,
            'name': facet.name,
            'score': facet.percentile,
            'children': facet.children
        };
    });

    // sort tthe big5 scores and put them in an array
    let sortedScores = trimmedProfile.map((trait) => trait.score).sort();

    // sort traits according to scores
    let sortedProfile = [];
    for (let i = 0; i < sortedScores.length; i++) {
        for (let k = 0; k < trimmedProfile.length; k++) {
            if (sortedScores[i] == trimmedProfile[k].score) {
                sortedProfile.push(trimmedProfile[k]);
            }
        }

    }
    return sortedProfile;
};

const getDominantInterest = (unsortedProfile, sortedProfile) => {

    // remove neuroticism
    let profileWithoutNeuroticism = sortedProfile.filter((trait) => trait.trait_id != "big5_neuroticism");

    let highestTrait = profileWithoutNeuroticism[profileWithoutNeuroticism.length - 1];

    let dominantInterest;

    if (highestTrait.trait_id == 'big5_openness' && (highestTrait.children[1].percentile > highestTrait.children[4].percentile)) {
        dominantInterest = "Artistic";
    } else if (highestTrait.trait_id == 'big5_openness' && (highestTrait.children[1].percentile < highestTrait.children[4].percentile)) {
        dominantInterest = "Investigative";
    } else if (highestTrait.trait_id == 'big5_extraversion' && (unsortedProfile.personality_profile.personality[3].percentile > 0.67999999999)) {
        dominantInterest = "Social";
    } else if (highestTrait.trait_id == 'big5_extraversion' && (unsortedProfile.personality_profile.personality[3].percentile <= 0.67999999999)) {
        dominantInterest = "Enterprising";
    } else if (highestTrait.trait_id == 'big5_agreeableness') {
        dominantInterest = 'Social';
    } else if (highestTrait.trait_id == 'big5_conscientiousness') {
        dominantInterest = 'Conventional';
    }

    return dominantInterest;
};

const getCareerCode = (unsortedProfile, sortedProfile) => {
     // remove neuroticism
     let profileWithoutNeuroticism = sortedProfile.filter((trait) => trait.trait_id != "big5_neuroticism");
     let topInterests = [];

     // get the two dominant interests
     for(let i = 0; i < 2; i++) {
         topInterests.push(getDominantInterest(unsortedProfile,profileWithoutNeuroticism));
         profileWithoutNeuroticism.pop();
     }

     let careerCode = topInterests.map((interest) => interest.charAt(0)).join().replace(/,/g, "");

     return careerCode;

};


module.exports = {
    sortProfile: sortProfile,
    getDominantInterest: getDominantInterest,
    getCareerCode: getCareerCode
};