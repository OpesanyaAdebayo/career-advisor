
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

     //get dominant interest
     topInterests.push(getDominantInterest(unsortedProfile,profileWithoutNeuroticism));

     // get the next two dominant interests
     for(let i = 0; i < 2; i++) {
         profileWithoutNeuroticism.pop();
         topInterests.push(getDominantInterest(unsortedProfile,profileWithoutNeuroticism));
     }

     let careerCode = topInterests.map((interest) =>interest.charAt(0)).join().replace(/,/g, "");

     return careerCode;

};

let profile = {
    "_id": {
        "$oid": "5a8f45485aa4033b20fd29b9"
    },
    "firstName": "Chris",
    "lastName": "Nwamba",
    "email": "chris@yahoo.com",
    "password": "$2a$10$LOyOcWIHct/qaYmBc8xA8uO0S98OC9vd7fKWyJ4M04mXSjk8jvBnO",
    "twitterHandle": "codebeast",
    "personality_profile": {
        "word_count": 6937,
        "processed_language": "en",
        "personality": [
            {
                "trait_id": "big5_openness",
                "name": "Openness",
                "category": "personality",
                "percentile": 0.619541637523925,
                "raw_score": 0.7583663627649012,
                "significant": true,
                "children": [
                    {
                        "trait_id": "facet_adventurousness",
                        "name": "Adventurousness",
                        "category": "personality",
                        "percentile": 0.8910020091588895,
                        "raw_score": 0.5486306259286715,
                        "significant": true
                    },
                    {
                        "trait_id": "facet_artistic_interests",
                        "name": "Artistic interests",
                        "category": "personality",
                        "percentile": 0.6748893253351012,
                        "raw_score": 0.6882801520684989,
                        "significant": true
                    },
                    {
                        "trait_id": "facet_emotionality",
                        "name": "Emotionality",
                        "category": "personality",
                        "percentile": 0.6201929772926769,
                        "raw_score": 0.6606698145836118,
                        "significant": true
                    },
                    {
                        "trait_id": "facet_imagination",
                        "name": "Imagination",
                        "category": "personality",
                        "percentile": 0.7876978727358785,
                        "raw_score": 0.7745184760229487,
                        "significant": true
                    },
                    {
                        "trait_id": "facet_intellect",
                        "name": "Intellect",
                        "category": "personality",
                        "percentile": 0.7643954099832346,
                        "raw_score": 0.6405974655370119,
                        "significant": true
                    },
                    {
                        "trait_id": "facet_liberalism",
                        "name": "Authority-challenging",
                        "category": "personality",
                        "percentile": 0.7565975659967934,
                        "raw_score": 0.5512541117190456,
                        "significant": true
                    }
                ]
            },
            {
                "trait_id": "big5_conscientiousness",
                "name": "Conscientiousness",
                "category": "personality",
                "percentile": 0.4388606076248371,
                "raw_score": 0.6208749076352675,
                "significant": true,
                "children": [
                    {
                        "trait_id": "facet_achievement_striving",
                        "name": "Achievement striving",
                        "category": "personality",
                        "percentile": 0.605193516871967,
                        "raw_score": 0.7025247366913685,
                        "significant": true
                    },
                    {
                        "trait_id": "facet_cautiousness",
                        "name": "Cautiousness",
                        "category": "personality",
                        "percentile": 0.2616677163046591,
                        "raw_score": 0.4521862066463805,
                        "significant": true
                    },
                    {
                        "trait_id": "facet_dutifulness",
                        "name": "Dutifulness",
                        "category": "personality",
                        "percentile": 0.30766837914015005,
                        "raw_score": 0.6465950855056652,
                        "significant": true
                    },
                    {
                        "trait_id": "facet_orderliness",
                        "name": "Orderliness",
                        "category": "personality",
                        "percentile": 0.17113169106331544,
                        "raw_score": 0.46304766666565783,
                        "significant": true
                    },
                    {
                        "trait_id": "facet_self_discipline",
                        "name": "Self-discipline",
                        "category": "personality",
                        "percentile": 0.41919870180188484,
                        "raw_score": 0.5609383527558718,
                        "significant": true
                    },
                    {
                        "trait_id": "facet_self_efficacy",
                        "name": "Self-efficacy",
                        "category": "personality",
                        "percentile": 0.5052130814227831,
                        "raw_score": 0.7535592832055416,
                        "significant": true
                    }
                ]
            },
            {
                "trait_id": "big5_extraversion",
                "name": "Extraversion",
                "category": "personality",
                "percentile": 0.6042232387117213,
                "raw_score": 0.5627998795234731,
                "significant": true,
                "children": [
                    {
                        "trait_id": "facet_activity_level",
                        "name": "Activity level",
                        "category": "personality",
                        "percentile": 0.9191541135000973,
                        "raw_score": 0.6119852114261775,
                        "significant": true
                    },
                    {
                        "trait_id": "facet_assertiveness",
                        "name": "Assertiveness",
                        "category": "personality",
                        "percentile": 0.651050093071224,
                        "raw_score": 0.6634628387243711,
                        "significant": true
                    },
                    {
                        "trait_id": "facet_cheerfulness",
                        "name": "Cheerfulness",
                        "category": "personality",
                        "percentile": 0.5263336035734483,
                        "raw_score": 0.6203551287329481,
                        "significant": true
                    },
                    {
                        "trait_id": "facet_excitement_seeking",
                        "name": "Excitement-seeking",
                        "category": "personality",
                        "percentile": 0.4918905088110267,
                        "raw_score": 0.6027423776559777,
                        "significant": true
                    },
                    {
                        "trait_id": "facet_friendliness",
                        "name": "Outgoing",
                        "category": "personality",
                        "percentile": 0.6076200965020608,
                        "raw_score": 0.5741872045469307,
                        "significant": true
                    },
                    {
                        "trait_id": "facet_gregariousness",
                        "name": "Gregariousness",
                        "category": "personality",
                        "percentile": 0.3851565571502793,
                        "raw_score": 0.4383333823924329,
                        "significant": true
                    }
                ]
            },
            {
                "trait_id": "big5_agreeableness",
                "name": "Agreeableness",
                "category": "personality",
                "percentile": 0.44755256199939575,
                "raw_score": 0.736956904910913,
                "significant": true,
                "children": [
                    {
                        "trait_id": "facet_altruism",
                        "name": "Altruism",
                        "category": "personality",
                        "percentile": 0.6829080451641574,
                        "raw_score": 0.7217825661412033,
                        "significant": true
                    },
                    {
                        "trait_id": "facet_cooperation",
                        "name": "Cooperation",
                        "category": "personality",
                        "percentile": 0.4447276742539301,
                        "raw_score": 0.5710150724567036,
                        "significant": true
                    },
                    {
                        "trait_id": "facet_modesty",
                        "name": "Modesty",
                        "category": "personality",
                        "percentile": 0.31429463933508484,
                        "raw_score": 0.42285178237139454,
                        "significant": true
                    },
                    {
                        "trait_id": "facet_morality",
                        "name": "Uncompromising",
                        "category": "personality",
                        "percentile": 0.4956815667606155,
                        "raw_score": 0.6253001454159645,
                        "significant": true
                    },
                    {
                        "trait_id": "facet_sympathy",
                        "name": "Sympathy",
                        "category": "personality",
                        "percentile": 0.8370842963429543,
                        "raw_score": 0.7009961071693692,
                        "significant": true
                    },
                    {
                        "trait_id": "facet_trust",
                        "name": "Trust",
                        "category": "personality",
                        "percentile": 0.7037866842262356,
                        "raw_score": 0.6078556040423815,
                        "significant": true
                    }
                ]
            },
            {
                "trait_id": "big5_neuroticism",
                "name": "Emotional range",
                "category": "personality",
                "percentile": 0.422476928875399,
                "raw_score": 0.4563416824777884,
                "significant": true,
                "children": [
                    {
                        "trait_id": "facet_anger",
                        "name": "Fiery",
                        "category": "personality",
                        "percentile": 0.766069266645017,
                        "raw_score": 0.5754153378511971,
                        "significant": true
                    },
                    {
                        "trait_id": "facet_anxiety",
                        "name": "Prone to worry",
                        "category": "personality",
                        "percentile": 0.5730799430769692,
                        "raw_score": 0.6066752126534767,
                        "significant": true
                    },
                    {
                        "trait_id": "facet_depression",
                        "name": "Melancholy",
                        "category": "personality",
                        "percentile": 0.6446823291962033,
                        "raw_score": 0.4719374820491571,
                        "significant": true
                    },
                    {
                        "trait_id": "facet_immoderation",
                        "name": "Immoderation",
                        "category": "personality",
                        "percentile": 0.32816624535559175,
                        "raw_score": 0.48348954622172285,
                        "significant": true
                    },
                    {
                        "trait_id": "facet_self_consciousness",
                        "name": "Self-consciousness",
                        "category": "personality",
                        "percentile": 0.5790380552931151,
                        "raw_score": 0.5572086108437264,
                        "significant": true
                    },
                    {
                        "trait_id": "facet_vulnerability",
                        "name": "Susceptible to stress",
                        "category": "personality",
                        "percentile": 0.688692859685495,
                        "raw_score": 0.49897723029827956,
                        "significant": true
                    }
                ]
            }
        ],
        "needs": [
            {
                "trait_id": "need_challenge",
                "name": "Challenge",
                "category": "needs",
                "percentile": 0.8215244949158647,
                "raw_score": 0.7730983364559827,
                "significant": true
            },
            {
                "trait_id": "need_closeness",
                "name": "Closeness",
                "category": "needs",
                "percentile": 0.29702799307494443,
                "raw_score": 0.7697044175220737,
                "significant": true
            },
            {
                "trait_id": "need_curiosity",
                "name": "Curiosity",
                "category": "needs",
                "percentile": 0.8536283286582489,
                "raw_score": 0.8443410701925806,
                "significant": true
            },
            {
                "trait_id": "need_excitement",
                "name": "Excitement",
                "category": "needs",
                "percentile": 0.523570557680529,
                "raw_score": 0.6899008082395006,
                "significant": true
            },
            {
                "trait_id": "need_harmony",
                "name": "Harmony",
                "category": "needs",
                "percentile": 0.6343901530159658,
                "raw_score": 0.8211188888583427,
                "significant": true
            },
            {
                "trait_id": "need_ideal",
                "name": "Ideal",
                "category": "needs",
                "percentile": 0.8169273551159986,
                "raw_score": 0.7340009932918617,
                "significant": true
            },
            {
                "trait_id": "need_liberty",
                "name": "Liberty",
                "category": "needs",
                "percentile": 0.8005387397777387,
                "raw_score": 0.7681125489231195,
                "significant": true
            },
            {
                "trait_id": "need_love",
                "name": "Love",
                "category": "needs",
                "percentile": 0.4321437053704511,
                "raw_score": 0.760345384013278,
                "significant": true
            },
            {
                "trait_id": "need_practicality",
                "name": "Practicality",
                "category": "needs",
                "percentile": 0.6507535849212294,
                "raw_score": 0.7361423534904963,
                "significant": true
            },
            {
                "trait_id": "need_self_expression",
                "name": "Self-expression",
                "category": "needs",
                "percentile": 0.5975793704804577,
                "raw_score": 0.6835629722837476,
                "significant": true
            },
            {
                "trait_id": "need_stability",
                "name": "Stability",
                "category": "needs",
                "percentile": 0.5446796892565069,
                "raw_score": 0.738023238636733,
                "significant": true
            },
            {
                "trait_id": "need_structure",
                "name": "Structure",
                "category": "needs",
                "percentile": 0.6526438801905659,
                "raw_score": 0.7067132194134083,
                "significant": true
            }
        ],
        "values": [
            {
                "trait_id": "value_conservation",
                "name": "Conservation",
                "category": "values",
                "percentile": 0.3136376796571204,
                "raw_score": 0.6435749179151486,
                "significant": true
            },
            {
                "trait_id": "value_openness_to_change",
                "name": "Openness to change",
                "category": "values",
                "percentile": 0.8129779858522136,
                "raw_score": 0.8185461786581025,
                "significant": true
            },
            {
                "trait_id": "value_hedonism",
                "name": "Hedonism",
                "category": "values",
                "percentile": 0.2787453210404529,
                "raw_score": 0.7007113764223816,
                "significant": true
            },
            {
                "trait_id": "value_self_enhancement",
                "name": "Self-enhancement",
                "category": "values",
                "percentile": 0.6619920679952069,
                "raw_score": 0.7246653457915074,
                "significant": true
            },
            {
                "trait_id": "value_self_transcendence",
                "name": "Self-transcendence",
                "category": "values",
                "percentile": 0.62864355757726,
                "raw_score": 0.8383054328852864,
                "significant": true
            }
        ],
        "behavior": [
            {
                "trait_id": "behavior_sunday",
                "name": "Sunday",
                "category": "behavior",
                "percentage": 0.0893371757925072
            },
            {
                "trait_id": "behavior_monday",
                "name": "Monday",
                "category": "behavior",
                "percentage": 0.16714697406340057
            },
            {
                "trait_id": "behavior_tuesday",
                "name": "Tuesday",
                "category": "behavior",
                "percentage": 0.11671469740634005
            },
            {
                "trait_id": "behavior_wednesday",
                "name": "Wednesday",
                "category": "behavior",
                "percentage": 0.13544668587896252
            },
            {
                "trait_id": "behavior_thursday",
                "name": "Thursday",
                "category": "behavior",
                "percentage": 0.1282420749279539
            },
            {
                "trait_id": "behavior_friday",
                "name": "Friday",
                "category": "behavior",
                "percentage": 0.15273775216138327
            },
            {
                "trait_id": "behavior_saturday",
                "name": "Saturday",
                "category": "behavior",
                "percentage": 0.21037463976945245
            },
            {
                "trait_id": "behavior_0000",
                "name": "0:00 am",
                "category": "behavior",
                "percentage": 0.018731988472622477
            },
            {
                "trait_id": "behavior_0100",
                "name": "1:00 am",
                "category": "behavior",
                "percentage": 0.011527377521613832
            },
            {
                "trait_id": "behavior_0200",
                "name": "2:00 am",
                "category": "behavior",
                "percentage": 0.005763688760806916
            },
            {
                "trait_id": "behavior_0300",
                "name": "3:00 am",
                "category": "behavior",
                "percentage": 0.01585014409221902
            },
            {
                "trait_id": "behavior_0400",
                "name": "4:00 am",
                "category": "behavior",
                "percentage": 0.005763688760806916
            },
            {
                "trait_id": "behavior_0500",
                "name": "5:00 am",
                "category": "behavior",
                "percentage": 0.012968299711815562
            },
            {
                "trait_id": "behavior_0600",
                "name": "6:00 am",
                "category": "behavior",
                "percentage": 0.023054755043227664
            },
            {
                "trait_id": "behavior_0700",
                "name": "7:00 am",
                "category": "behavior",
                "percentage": 0.03602305475504323
            },
            {
                "trait_id": "behavior_0800",
                "name": "8:00 am",
                "category": "behavior",
                "percentage": 0.07348703170028818
            },
            {
                "trait_id": "behavior_0900",
                "name": "9:00 am",
                "category": "behavior",
                "percentage": 0.069164265129683
            },
            {
                "trait_id": "behavior_1000",
                "name": "10:00 am",
                "category": "behavior",
                "percentage": 0.06484149855907781
            },
            {
                "trait_id": "behavior_1100",
                "name": "11:00 am",
                "category": "behavior",
                "percentage": 0.07492795389048991
            },
            {
                "trait_id": "behavior_1200",
                "name": "12:00 pm",
                "category": "behavior",
                "percentage": 0.07780979827089338
            },
            {
                "trait_id": "behavior_1300",
                "name": "1:00 pm",
                "category": "behavior",
                "percentage": 0.053314121037463975
            },
            {
                "trait_id": "behavior_1400",
                "name": "2:00 pm",
                "category": "behavior",
                "percentage": 0.07060518731988473
            },
            {
                "trait_id": "behavior_1500",
                "name": "3:00 pm",
                "category": "behavior",
                "percentage": 0.06195965417867435
            },
            {
                "trait_id": "behavior_1600",
                "name": "4:00 pm",
                "category": "behavior",
                "percentage": 0.069164265129683
            },
            {
                "trait_id": "behavior_1700",
                "name": "5:00 pm",
                "category": "behavior",
                "percentage": 0.03170028818443804
            },
            {
                "trait_id": "behavior_1800",
                "name": "6:00 pm",
                "category": "behavior",
                "percentage": 0.04899135446685879
            },
            {
                "trait_id": "behavior_1900",
                "name": "7:00 pm",
                "category": "behavior",
                "percentage": 0.05043227665706052
            },
            {
                "trait_id": "behavior_2000",
                "name": "8:00 pm",
                "category": "behavior",
                "percentage": 0.04899135446685879
            },
            {
                "trait_id": "behavior_2100",
                "name": "9:00 pm",
                "category": "behavior",
                "percentage": 0.025936599423631124
            },
            {
                "trait_id": "behavior_2200",
                "name": "10:00 pm",
                "category": "behavior",
                "percentage": 0.02881844380403458
            },
            {
                "trait_id": "behavior_2300",
                "name": "11:00 pm",
                "category": "behavior",
                "percentage": 0.020172910662824207
            }
        ],
        "consumption_preferences": [
            {
                "consumption_preference_category_id": "consumption_preferences_shopping",
                "name": "Purchasing Preferences",
                "consumption_preferences": [
                    {
                        "consumption_preference_id": "consumption_preferences_automobile_ownership_cost",
                        "name": "Likely to be sensitive to ownership cost when buying automobiles",
                        "score": 0
                    },
                    {
                        "consumption_preference_id": "consumption_preferences_automobile_safety",
                        "name": "Likely to prefer safety when buying automobiles",
                        "score": 0
                    },
                    {
                        "consumption_preference_id": "consumption_preferences_clothes_quality",
                        "name": "Likely to prefer quality when buying clothes",
                        "score": 0
                    },
                    {
                        "consumption_preference_id": "consumption_preferences_clothes_style",
                        "name": "Likely to prefer style when buying clothes",
                        "score": 1
                    },
                    {
                        "consumption_preference_id": "consumption_preferences_clothes_comfort",
                        "name": "Likely to prefer comfort when buying clothes",
                        "score": 0
                    },
                    {
                        "consumption_preference_id": "consumption_preferences_influence_brand_name",
                        "name": "Likely to be influenced by brand name when making product purchases",
                        "score": 1
                    },
                    {
                        "consumption_preference_id": "consumption_preferences_influence_utility",
                        "name": "Likely to be influenced by product utility when making product purchases",
                        "score": 0.5
                    },
                    {
                        "consumption_preference_id": "consumption_preferences_influence_online_ads",
                        "name": "Likely to be influenced by online ads when making product purchases",
                        "score": 1
                    },
                    {
                        "consumption_preference_id": "consumption_preferences_influence_social_media",
                        "name": "Likely to be influenced by social media when making product purchases",
                        "score": 1
                    },
                    {
                        "consumption_preference_id": "consumption_preferences_influence_family_members",
                        "name": "Likely to be influenced by family when making product purchases",
                        "score": 0
                    },
                    {
                        "consumption_preference_id": "consumption_preferences_spur_of_moment",
                        "name": "Likely to indulge in spur of the moment purchases",
                        "score": 0.5
                    },
                    {
                        "consumption_preference_id": "consumption_preferences_credit_card_payment",
                        "name": "Likely to prefer using credit cards for shopping",
                        "score": 0
                    }
                ]
            },
            {
                "consumption_preference_category_id": "consumption_preferences_health_and_activity",
                "name": "Health & Activity Preferences",
                "consumption_preferences": [
                    {
                        "consumption_preference_id": "consumption_preferences_eat_out",
                        "name": "Likely to eat out frequently",
                        "score": 1
                    },
                    {
                        "consumption_preference_id": "consumption_preferences_gym_membership",
                        "name": "Likely to have a gym membership",
                        "score": 1
                    },
                    {
                        "consumption_preference_id": "consumption_preferences_outdoor",
                        "name": "Likely to like outdoor activities",
                        "score": 0.5
                    }
                ]
            },
            {
                "consumption_preference_category_id": "consumption_preferences_environmental_concern",
                "name": "Environmental Concern Preferences",
                "consumption_preferences": [
                    {
                        "consumption_preference_id": "consumption_preferences_concerned_environment",
                        "name": "Likely to be concerned about the environment",
                        "score": 0
                    }
                ]
            },
            {
                "consumption_preference_category_id": "consumption_preferences_entrepreneurship",
                "name": "Entrepreneurship Preferences",
                "consumption_preferences": [
                    {
                        "consumption_preference_id": "consumption_preferences_start_business",
                        "name": "Likely to consider starting a business in next few years",
                        "score": 1
                    }
                ]
            },
            {
                "consumption_preference_category_id": "consumption_preferences_movie",
                "name": "Movie Preferences",
                "consumption_preferences": [
                    {
                        "consumption_preference_id": "consumption_preferences_movie_romance",
                        "name": "Likely to like romance movies",
                        "score": 1
                    },
                    {
                        "consumption_preference_id": "consumption_preferences_movie_adventure",
                        "name": "Likely to like adventure movies",
                        "score": 0
                    },
                    {
                        "consumption_preference_id": "consumption_preferences_movie_horror",
                        "name": "Likely to like horror movies",
                        "score": 0
                    },
                    {
                        "consumption_preference_id": "consumption_preferences_movie_musical",
                        "name": "Likely to like musical movies",
                        "score": 0
                    },
                    {
                        "consumption_preference_id": "consumption_preferences_movie_historical",
                        "name": "Likely to like historical movies",
                        "score": 0
                    },
                    {
                        "consumption_preference_id": "consumption_preferences_movie_science_fiction",
                        "name": "Likely to like science-fiction movies",
                        "score": 0
                    },
                    {
                        "consumption_preference_id": "consumption_preferences_movie_war",
                        "name": "Likely to like war movies",
                        "score": 0
                    },
                    {
                        "consumption_preference_id": "consumption_preferences_movie_drama",
                        "name": "Likely to like drama movies",
                        "score": 0
                    },
                    {
                        "consumption_preference_id": "consumption_preferences_movie_action",
                        "name": "Likely to like action movies",
                        "score": 0
                    },
                    {
                        "consumption_preference_id": "consumption_preferences_movie_documentary",
                        "name": "Likely to like documentary movies",
                        "score": 0
                    }
                ]
            },
            {
                "consumption_preference_category_id": "consumption_preferences_music",
                "name": "Music Preferences",
                "consumption_preferences": [
                    {
                        "consumption_preference_id": "consumption_preferences_music_rap",
                        "name": "Likely to like rap music",
                        "score": 1
                    },
                    {
                        "consumption_preference_id": "consumption_preferences_music_country",
                        "name": "Likely to like country music",
                        "score": 1
                    },
                    {
                        "consumption_preference_id": "consumption_preferences_music_r_b",
                        "name": "Likely to like R&B music",
                        "score": 1
                    },
                    {
                        "consumption_preference_id": "consumption_preferences_music_hip_hop",
                        "name": "Likely to like hip hop music",
                        "score": 1
                    },
                    {
                        "consumption_preference_id": "consumption_preferences_music_live_event",
                        "name": "Likely to attend live musical events",
                        "score": 0
                    },
                    {
                        "consumption_preference_id": "consumption_preferences_music_playing",
                        "name": "Likely to have experience playing music",
                        "score": 0
                    },
                    {
                        "consumption_preference_id": "consumption_preferences_music_latin",
                        "name": "Likely to like Latin music",
                        "score": 1
                    },
                    {
                        "consumption_preference_id": "consumption_preferences_music_rock",
                        "name": "Likely to like rock music",
                        "score": 0
                    },
                    {
                        "consumption_preference_id": "consumption_preferences_music_classical",
                        "name": "Likely to like classical music",
                        "score": 0.5
                    }
                ]
            },
            {
                "consumption_preference_category_id": "consumption_preferences_reading",
                "name": "Reading Preferences",
                "consumption_preferences": [
                    {
                        "consumption_preference_id": "consumption_preferences_read_frequency",
                        "name": "Likely to read often",
                        "score": 0
                    },
                    {
                        "consumption_preference_id": "consumption_preferences_books_entertainment_magazines",
                        "name": "Likely to read entertainment magazines",
                        "score": 0
                    },
                    {
                        "consumption_preference_id": "consumption_preferences_books_non_fiction",
                        "name": "Likely to read non-fiction books",
                        "score": 0
                    },
                    {
                        "consumption_preference_id": "consumption_preferences_books_financial_investing",
                        "name": "Likely to read financial investment books",
                        "score": 1
                    },
                    {
                        "consumption_preference_id": "consumption_preferences_books_autobiographies",
                        "name": "Likely to read autobiographical books",
                        "score": 0
                    }
                ]
            },
            {
                "consumption_preference_category_id": "consumption_preferences_volunteering",
                "name": "Volunteering Preferences",
                "consumption_preferences": [
                    {
                        "consumption_preference_id": "consumption_preferences_volunteer",
                        "name": "Likely to volunteer for social causes",
                        "score": 0
                    }
                ]
            }
        ],
        "warnings": []
    },
    "summary": "You are expressive.\nYou are energetic: you enjoy a fast-paced, busy schedule with many activities. You are adventurous: you are eager to experience new things. And you are empathetic: you feel what others feel and are compassionate towards them.\nYour choices are driven by a desire for discovery.\nYou consider independence to guide a large part of what you do: you like to set your own goals to decide how to best achieve them. You don't find taking pleasure in life to be particularly motivating for you: you prefer activities with a purpose greater than just personal enjoyment."
};

console.log(getCareerCode(profile, sortProfile(profile)));

module.exports = {
    sortProfile: sortProfile,
    getDominantInterest: getDominantInterest
};