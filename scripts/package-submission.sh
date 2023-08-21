#!/usr/bin/env bash

# Check if the candidate email has been provided
CANDIDATE_EMAIL=${1}
if [ -z "${CANDIDATE_EMAIL}" ] ; then
  echo "This script is expected to be run as part of the submission process. Please refer to README.md for instructions."
  exit 1
fi

# Check that the working directory is clean.
if [ -n "$(git status -s)" ] ; then
  echo "You appear to have files that have not been committed."
  echo 
  echo "Please commit any files you need & remove or stash the rest. Then try again."
  exit 1
fi

# We'll use a stash just to make sure.
s=$(git stash create)
git archive \
  --format=zip \
  --worktree-attributes \
  --output submission-${CANDIDATE_EMAIL}.zip ${s:-HEAD}
