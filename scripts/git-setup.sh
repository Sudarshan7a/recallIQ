#!/usr/bin/env sh
# Set up repo-level git recommended settings
echo "Setting git commit template to .github/COMMIT_MESSAGE_TEMPLATE.md"
git config --local commit.template .github/COMMIT_MESSAGE_TEMPLATE.md

echo "Done. To make commit hooks active, consider installing Husky or other tooling."
