# Email Notifications Setup Guide

This guide explains how to set up email notifications for CI/CD pipeline success and failure events.

## Overview

The CI/CD pipeline now sends automated email notifications when:
- ✅ **All checks pass**: Success notification with pipeline details
- ❌ **Any check fails**: Failure notification with debugging tips

## Required GitHub Secrets

To enable email notifications, you need to add the following secrets to your GitHub repository:

### Steps to Add Secrets:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each of the following secrets:

### Email Configuration Secrets

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `EMAIL_SERVER` | SMTP server address | `smtp.gmail.com` |
| `EMAIL_PORT` | SMTP server port | `465` or `587` |
| `EMAIL_USERNAME` | SMTP username/sender email | `your-email@gmail.com` |
| `EMAIL_PASSWORD` | SMTP password or app password | (see setup below) |
| `EMAIL_FROM` | Sender display name/email | `CI/CD Bot <ci@yourapp.com>` |
| `EMAIL_RECIPIENT` | Recipient email address | `your-email@gmail.com` |

## Email Provider Setup

### Using Gmail (Recommended)

1. **Enable 2FA** on your Gmail account if not already done
2. **Generate an App Password**:
   - Go to [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Windows Computer" (or your device type)
   - Google will generate a 16-character password
   - Copy this password

3. **Add GitHub Secrets**:
   ```
   EMAIL_SERVER: smtp.gmail.com
   EMAIL_PORT: 465
   EMAIL_USERNAME: your-email@gmail.com
   EMAIL_PASSWORD: <16-character app password>
   EMAIL_FROM: CI/CD Bot <your-email@gmail.com>
   EMAIL_RECIPIENT: your-email@gmail.com
   ```

### Using Other SMTP Providers

**Office 365 / Outlook**:
```
EMAIL_SERVER: smtp.office365.com
EMAIL_PORT: 587
EMAIL_USERNAME: your-email@outlook.com
EMAIL_PASSWORD: <your-password>
```

**SendGrid**:
```
EMAIL_SERVER: smtp.sendgrid.net
EMAIL_PORT: 587
EMAIL_USERNAME: apikey
EMAIL_PASSWORD: <your-sendgrid-api-key>
```

**AWS SES**:
```
EMAIL_SERVER: email-smtp.<region>.amazonaws.com
EMAIL_PORT: 587
EMAIL_USERNAME: <SMTP username>
EMAIL_PASSWORD: <SMTP password>
```

## How It Works

### Success Email
When all pipeline checks pass, you'll receive an email with:
- ✅ Status of all checks (YAML Lint, Tests, Build, Security, Deployment)
- Build metadata (repository, branch, commit, author)
- Link to the GitHub Actions pipeline

### Failure Email
When any check fails, you'll receive an email with:
- ❌ Failure notification
- Build metadata
- Debugging tips for common issues
- Link to detailed pipeline logs

## Testing

To test the email setup:

1. Make a dummy commit or use `workflow_dispatch` to manually trigger the workflow
2. Push to the `master` branch (or trigger via GitHub Actions UI)
3. Check if you receive the email (check spam/promotions folder)

## Troubleshooting

### Emails Not Receiving

1. **Check GitHub Secrets**:
   - Verify all required secrets are added correctly
   - Check for typos in secret names (case-sensitive)

2. **Check Email Credentials**:
   - Test SMTP credentials with a third-party tool
   - Ensure "Allow less secure apps" is enabled (if applicable)
   - Verify app passwords for 2FA-enabled accounts

3. **Check GitHub Actions Logs**:
   - Go to Actions tab in your repository
   - Click on the failed workflow
   - Expand the "Send Success/Failure Email" step
   - Check for error messages

4. **Common Error Messages**:
   - `Authentication failed`: Wrong credentials
   - `Connection refused`: Wrong port or server address
   - `TLS required`: Use port 587 instead of 465 (or vice versa)

## Security Best Practices

⚠️ **Important**:
- Never commit secrets to the repository
- Use GitHub's Secrets management to store sensitive data
- Use app-specific passwords instead of actual account passwords
- Rotate credentials regularly
- Consider using dedicated service accounts for CI/CD notifications

## Email Template Customization

To customize email templates, edit `.github/workflows/main.yml`:

1. Locate the `notify-success` or `notify-failure` job
2. Modify the `body` field in the email step
3. Available variables:
   - `${{ github.repository }}` - Repository name
   - `${{ github.ref_name }}` - Branch name
   - `${{ github.sha }}` - Commit hash
   - `${{ github.actor }}` - Author username
   - `${{ github.run_id }}` - Pipeline run ID

## Additional Resources

- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [SendGrid Email Action](https://github.com/dawidd6/action-send-mail)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
