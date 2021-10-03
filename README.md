# Notify when a certain path changed on PR

This action is notifiying through a review comment when a certain file/path has changed.

# Setup

```workflow
on:
  pull_request_target:
    paths: 
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

# Actual example:
[here](https://github.com/Poolitzer/python-telegram-bot/blob/github_actions/.github/workflows/example_change_warning.yml)

