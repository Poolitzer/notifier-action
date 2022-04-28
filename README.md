# Notify when a certain path changed on PR

This action is notifiying through a review comment when a certain file/path has changed.

# Example Setup

```workflow
on:
  pull_request_target:
    paths: 

permissions:
 pull-requests: write 

jobs:
  job:
    runs-on: ubuntu-latest
    steps:
      - name: running the check
        uses: Poolitzer/notifier-action@master
        with:
          notify-message: Your Message
          repo-token: ${{ secrets.GITHUB_TOKEN }}
```

# Real life example:
https://github.com/python-telegram-bot/python-telegram-bot/blob/master/.github/workflows/example_notifier.yml
