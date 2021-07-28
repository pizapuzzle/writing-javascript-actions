const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
    try {
        const issueTitle = core.getInput("issueTitle");
        const jokeBody = core.getInput("joke");
        const token = core.getInput("repo-token");

        const octokit = new github.getOctokit(token); // ! note

        core.info(
            `issueTitle: ${issueTitle} 
            jokeBody: ${jokeBody} 
            does token exist: ${token == true} 
            does octokit exist: ${octokit == true} 
            `
        )

        // how did they get issues.create? ans:
        // https://octokit.github.io/rest.js/v18#issues
        const newIssue = await octokit.rest.issues.create({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo, 
            title: issueTitle,
            body: jokeBody,
        });
        // !where is the repo stuff from ?
    } catch (err) {
        core.setFailed(err.message);
    }
}

run();
