import * as core from '@actions/core';
import * as github from '@actions/github';

export async function run() {
    try {
    const notifyMessage: string = core.getInput('notify-message', {required: true});
    const repoToken: string = core.getInput('repo-token', {required: true});
    const issue: {owner: string; repo: string; number: number} = github.context.issue;
    if (github.context.payload.repository) {
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
      body: notifyMessage,
      event: 'COMMENT'
    });
	const test = await client.pulls.listReviews({
		owner: issue.owner,
		repo: issue.repo,
		pull_number: issue.number
	});
	for (let entry of test) {
		console.log(entry); // 1, "string", false
	};
    }
    catch (error) {
      core.setFailed(error.message);
      throw error;
    }
}

run();
