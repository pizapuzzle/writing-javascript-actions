const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
    try {
        const issueTitle = core.getInput("issueTitle");
        const jokeBody = core.getInput("joke");
        const token = core.getInput("repo-token");

        const octokit = github.getOctokit(token); // ! note

        // how did they get issues.create? ans:
        // https://octokit.github.io/rest.js/v18#issues
        const newIssue = await octokit.issues.create({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo, // !where is this from ?
            title: issueTitle,
            body: jokeBody,
        });
    } catch (err) {
        core.setFailed(err.message);
    }
}

run();
