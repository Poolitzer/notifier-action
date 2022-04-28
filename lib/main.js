"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const github = require('@actions/github');
const core = require('@actions/core');
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const notifyMessage = core.getInput('notify-message', { required: true });
            const repoToken = core.getInput('repo-token', { required: true });
            const issue = github.context.issue;
            if (github.context.payload.repository) {
            }
            else {
                console.log('No pull request, skipping');
                return;
            }
            const octokit = new github.getOctokit(repoToken);
            const comments = yield octokit.rest.pulls.listReviews({
                owner: issue.owner,
                repo: issue.repo,
                pull_number: issue.number
            });
            for (let entry of comments['data']) {
                if (entry['user']['id'] == 41898282) {
                    if (entry['body'] == notifyMessage) {
                        console.log('Already commented, skipping');
                        return;
                    }
                }
            }
            ;
            yield octokit.rest.pulls.createReview({
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
    });
}
exports.run = run;
run();
