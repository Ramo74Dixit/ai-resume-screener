// utils/resumeParser.js
const pdf = require("pdf-parse");
const axios = require("axios");

const extractSkillsFromResume = (resumeUrl) => {
    return new Promise((resolve, reject) => {
        axios.get(resumeUrl, { responseType: 'arraybuffer' })
            .then(response => {
                pdf(response.data).then((parsedData) => {
                    const text = parsedData.text.toLowerCase();
                    const skillsList = [
                        "javascript", "react", "nodejs", "express", "python", "java", "sql", "html", "css","git","communication", "mern" , "c","c++" , "mongodb", "php"
                    ];
                    const extractedSkills = skillsList.filter(skill => text.includes(skill));
                    resolve(extractedSkills);
                }).catch(reject);
            })
            .catch(reject); 
    });
};
// npm i pdf-parse 
module.exports = { extractSkillsFromResume };
