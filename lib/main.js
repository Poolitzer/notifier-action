"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
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
            const client = new github.GitHub(repoToken);
            const comments = yield client.pulls.listReviews({
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
            yield client.pulls.createReview({
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
    });
}
exports.run = run;
run();
