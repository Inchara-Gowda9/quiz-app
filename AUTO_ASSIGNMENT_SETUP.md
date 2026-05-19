# Auto-Assignment Features Setup Guide

This guide explains how to set up and configure the automated assignment features for Pull Requests, Issues, and Pipeline Failures.

## Overview

The auto-assignment system includes three workflows:

1. **Auto-Assign PR** - Automatically assigns PRs to author and requests reviews
2. **Auto-Assign Issues** - Automatically assigns issues based on labels
3. **Auto-Assign on Failure** - Assigns failed pipeline notifications to responsible parties

## Features

### 1. Auto-Assign Pull Requests

When a PR is opened or marked as ready for review:
- ✅ Assigns PR to the author
- 👀 Requests code reviews from team members
- 🏷️ Adds labels based on files changed (frontend, backend, tests, ci-cd, styles, etc.)
- 💬 Posts a welcome comment with guidelines

**File:** `.github/workflows/assign-pr.yml`

#### Configuration

Edit `.github/workflows/assign-pr.yml` to customize reviewers:

```yaml
const reviewers = ['maintainer1', 'maintainer2'];
const team_reviewers = [];
```

Replace `maintainer1`, `maintainer2` with your team members' GitHub usernames.

### 2. Auto-Assign Issues

When an issue is opened or labeled:
- 🏷️ Assigns issues based on labels (bug, feature, documentation, etc.)
- 🎯 Adds priority labels automatically
- 💬 Posts auto-assignment comment with next steps

**File:** `.github/workflows/assign-issues.yml`

#### Customizable Label-to-Assignee Mapping

Edit the `labelToAssignee` object in `.github/workflows/assign-issues.yml`:

```javascript
const labelToAssignee = {
  'bug': ['maintainer1'],
  'feature': ['maintainer2'],
  'documentation': ['team-lead'],
  'frontend': ['frontend-dev'],
  'backend': ['backend-dev'],
  'ci-cd': ['devops-engineer'],
  'security': ['security-lead'],
  'performance': ['performance-dev'],
  'refactor': ['architect'],
  'help-wanted': []  // Don't auto-assign
};
```

**Automatic Priority Assignment:**
- `security` → `priority-critical`
- `bug` → `priority-high`
- `feature` → `priority-medium`
- `documentation` → `priority-low`

### 3. Auto-Assign on Pipeline Failure

When the CI/CD pipeline fails:
- 🔴 Assigns failed PR to author
- 🏷️ Adds `ci-failed` and `requires-attention` labels
- 💬 Posts detailed failure comment with debugging steps
- 📋 Creates an issue if failure is on a branch with no PR

**File:** `.github/workflows/assign-on-failure.yml`

#### Features
- Automatically finds the associated PR
- Posts helpful debugging tips
- Links to workflow logs
- Suggests common troubleshooting steps

## Setup Instructions

### Step 1: Customize Team Members

Edit each workflow file to add your team members:

**For PR Reviews** (`.github/workflows/assign-pr.yml`):
```javascript
const reviewers = ['your-username1', 'your-username2'];
```

**For Issue Assignment** (`.github/workflows/assign-issues.yml`):
```javascript
const labelToAssignee = {
  'bug': ['your-devops-lead'],
  'feature': ['your-tech-lead'],
  // Add more mappings...
};
```

### Step 2: Configure GitHub Teams (Optional)

For team-based assignments, create GitHub teams:
1. Go to your organization settings
2. Create teams (e.g., `frontend-team`, `backend-team`)
3. Add members to teams
4. Reference teams in workflows with `team_reviewers`

### Step 3: Create Issue Labels (Recommended)

Create these labels in your repository for better organization:

**Priority Labels:**
- `priority-critical` - Red (#d73a49)
- `priority-high` - Orange (#FF6B6B)
- `priority-medium` - Yellow (#FFA500)
- `priority-low` - Green (#28A745)

**Area Labels:**
- `frontend` - Blue (#0075ca)
- `backend` - Purple (#7057ff)
- `ci-cd` - Gray (#cccccc)
- `security` - Red (#d73a49)
- `documentation` - Orange (#ffc2b3)

**Status Labels:**
- `ci-failed` - Red alert
- `requires-attention` - Warning

**Issue Type Labels:**
- `bug` - Problem
- `feature` - Enhancement
- `documentation` - Docs
- `refactor` - Improvement
- `help-wanted` - Community

### Step 4: Test the Setup

1. **Test PR Assignment:**
   - Create a test PR
   - Verify it's assigned to you
   - Check if reviewers were requested

2. **Test Issue Assignment:**
   - Create a test issue with a "bug" label
   - Verify it's assigned to the right person

3. **Test Failure Assignment:**
   - Intentionally break a test
   - Push to a branch with an open PR
   - Verify failure comment is posted

## Customization Examples

### Example 1: Route Issues by Component

```javascript
const labelToAssignee = {
  'quiz-component': ['component-maintainer'],
  'home-component': ['frontend-lead'],
  'quiz-logic': ['backend-lead'],
  'styling': ['design-lead'],
};
```

### Example 2: Round-Robin Assignment

```javascript
const maintainers = ['dev1', 'dev2', 'dev3'];
const index = Math.floor(Math.random() * maintainers.length);
assignees.add(maintainers[index]);
```

### Example 3: Escalation for Critical Issues

```javascript
if (labels.includes('security') || labels.includes('critical')) {
  assignees.add('security-lead');
  assignees.add('cto');
}
```

## Troubleshooting

### Workflows Not Running

**Problem:** Workflows don't execute automatically

**Solutions:**
1. Check if workflows are enabled: Settings → Actions → General → Allow all actions
2. Verify the trigger conditions (opened, labeled, etc.)
3. Check workflow syntax: `.github/workflows/*.yml`
4. Review workflow logs for errors

### Not Assigning Correctly

**Problem:** Issues/PRs not being assigned

**Solutions:**
1. Verify team member usernames are correct
2. Check if labels exist (case-sensitive)
3. Review the label-to-assignee mapping
4. Check GitHub API permissions

### Comments Not Posting

**Problem:** Automation comments not appearing

**Solutions:**
1. Verify `GITHUB_TOKEN` has required `permissions`
2. Check workflow logs for error messages
3. Ensure comment formatting is valid Markdown
4. Verify API rate limits haven't been exceeded

## Permission Requirements

All workflows require these permissions:

```yaml
permissions:
  pull-requests: write
  issues: write
  contents: read
  actions: read
```

These are included in each workflow file.

## GitHub Actions Token (${{ secrets.GITHUB_TOKEN }})

The `GITHUB_TOKEN` is automatically available and includes:
- Pull request assignment
- Issue assignment
- Comment creation
- Label management

No additional secrets need to be configured for these workflows!

## Best Practices

1. **Keep Labels Consistent:** Use a standard labeling convention
2. **Review Mappings Regularly:** Update team assignments quarterly
3. **Monitor Automation:** Review workflow logs occasionally
4. **Document Changes:** Update this guide when modifying workflows
5. **Test Changes:** Always test workflow changes in a test branch first
6. **Use Team Mentions:** Prefer GitHub team mentions (@org/team) over individual mentions

## Integration with CI/CD Pipeline

The `assign-on-failure.yml` workflow integrates with your main CI/CD pipeline:

- Triggers after main CI/CD pipeline completes
- Only runs if pipeline fails
- Automatically notifies responsible developers
- Posts helpful debugging information

## Disabled Features

Some features are disabled by default. To enable them:

### Enable Help-Wanted Auto-Assignment

Uncomment helpers in `assign-issues.yml`:

```javascript
if (labels.includes('help-wanted')) {
  // Post to community channels
  // Post to discussion boards
}
```

### Enable Auto-Merge for Passing Checks

Create a new workflow:

```yaml
name: Auto-Merge
on:
  pull_request:
    types: [synchronize]

jobs:
  automerge:
    if: success()
    runs-on: ubuntu-latest
    steps:
      - uses: actions/github-script@v7
        with:
          script: |
            // Auto-merge logic
```

## FAQ

**Q: Can I assign issues to multiple people?**
A: Yes! The workflow supports multiple assignees. Add them to the array:
```javascript
const labelToAssignee = {
  'critical': ['person1', 'person2', 'person3'],
};
```

**Q: How do I disable auto-assignment for specific issues?**
A: Add the label `no-auto-assign` to prevent workflow execution (you'll need to modify the workflows to check for this label).

**Q: Can I customize the comment templates?**
A: Yes! Edit the `comment` variable in each workflow to customize the message.

**Q: Does this work with GitHub Teams?**
A: Yes! Use `team_reviewers` for team-based assignments in the PR workflow.

## Support & Feedback

For issues or feature requests:
1. Check existing GitHub issues
2. Create a detailed issue with:
   - Workflow file name
   - Expected behavior
   - Actual behavior
   - Workflow logs (if applicable)

## Related Documentation

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub API - Issues](https://docs.github.com/en/rest/issues)
- [GitHub API - Pull Requests](https://docs.github.com/en/rest/pulls)
- [GitHub Actions Scripting](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
