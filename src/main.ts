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
      console.log('No pull request, skipping');
      return;
    }
    const client: github.GitHub = new github.GitHub(repoToken);
	const comments = await client.pulls.listReviews({
		owner: issue.owner,
		repo: issue.repo,
		pull_number: issue.number
	});
	for (let entry of comments['data']) {
		if (entry['user']['id'] == 41898282) {
			if (entry['body'] == notifyMessage){
				console.log('Already commented, skipping')
				return;
			}
			
		}
	};
    await client.pulls.createReview({
      owner: issue.owner,
      repo: issue.repo,
      pull_number: issue.number,
      body: notifyMessage,
      event: 'COMMENT'
    });
    }
    catch (error) {
      core.setFailed(error.message);
      throw error;
    }
}

run();
