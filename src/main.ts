import * as core from '@actions/core';
import * as github from '@actions/github';

export async function run() {
    try {
    const welcomeMessage: string = core.getInput('welcome-message');
    const welcomeMessage: string = core.getInput('welcome-message', {required: true});
    const repoToken: string = core.getInput('repo-token', {required: true});
    const issue: {owner: string; repo: string; number: number} = github.context.issue;

    if (github.context.payload.action !== 'opened') {
      console.log('No issue or pull request was opened, skipping');
      return;
    }
    if (github.context.payload.repository) {
      console.log('Actual a PR');
    }
    else {
      console.log('No pull request was opened, skipping');
      return;
    }
    const client: github.GitHub = new github.GitHub(repoToken);
    await client.pulls.createReview({
      owner: issue.owner,
      repo: issue.repo,
      pull_number: issue.number,
      body: welcomeMessage,
      event: 'COMMENT'
    });
    }
    catch (error) {
      core.setFailed(error.message);
      throw error;
    }
}

run();
