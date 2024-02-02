//Include packages needed for this application
const inq = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./generateMarkdown.js');


//Create an array of questions for user input
const questions = [
    {
        type:'input',
        name:'github',
        message:'What is your github username?',
    },
    {
        type:'input',
        name:'email',
        message:'What is your email address?',
    },
    {
        type:'input',
        name:'title',
        message:'What is the title of your project?',
    },
    {
        type:'input',
        name:'details',
        message:'What are the details of your project?',
        
    },
    {
        type:'list',
        name:'licenses',
        message:'What type of license(s) was chosen for your project?',
        choices:['MIT License', "APACHE 2.0", "None"]
    },
    {
        type:'input',
        name:'installation',
        message:'What are the steps for installation?',
    },
];

// Create a function to write README file
function writeToFile(fileName, data) {
        fs.writeFile(fileName, data, err => {
            if (err) {
              return console.log(err);
            }
          
            console.log("Success! Your README.md file has been generated")
        });
    }
    
    const writeFileAsync = util.promisify(writeToFile);

// Create a function to initialize app

async function init() {
    try {

        // Prompt Inquirer questions
        const userResponses = await inquirer.prompt(questions);
        console.log("Your responses: ", userResponses);
        console.log("Thank you for your responses! Fetching your GitHub data next...");
    
        // Call GitHub api for user info
        const userInfo = await api.getUser(userResponses);
        console.log("Your GitHub user info: ", userInfo);
    
        // Pass Inquirer userResponses and GitHub userInfo to generateMarkdown
        console.log("Generating your README next...")
        const markdown = generateMarkdown(userResponses, userInfo);
        console.log(markdown);
    
        // Write markdown to file
        await writeFileAsync('ExampleREADME.md', markdown);

    } catch (error) {
        console.log(error);
    }
};

// Function call to initialize app
init();
