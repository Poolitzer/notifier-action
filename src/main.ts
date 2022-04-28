const github = require('@actions/github');
const core = require('@actions/core');

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
    const octokit = new github.getOctokit(repoToken);
	const comments = await octokit.rest.pulls.listReviews({
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
    await octokit.rest.pulls.createReview({
      owner: issue.owner,
      repo: issue.repo,
      pull_number: issue.number,
      body: notifyMessage,
      event: 'COMMENT'
    });
    }
    catch (error) {
      core.setFailed(error);
      throw error;
    }
}

run();
