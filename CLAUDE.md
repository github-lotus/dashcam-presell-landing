# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-page advertorial landing page for a dash cam promotion. The project consists of:
- `index.html` - A complete standalone HTML landing page with embedded CSS and JavaScript
- `dashcam.webp` - Product image used in the landing page

## Architecture

- **Single-file application**: All HTML, CSS, and JavaScript are contained within `index.html`
- **Self-contained**: Uses CDN resources (Tailwind CSS, Google Fonts) and external image URLs
- **Responsive design**: Mobile-first approach with responsive breakpoints
- **Interactive elements**: Countdown timer, stock counter, sticky CTA, and smooth scrolling

## Key Features

- Real-time countdown timer that resets daily
- Dynamic stock counter that decreases over time
- Animated elements using CSS keyframes (pulse buttons, shine effects, marquee text)
- FAQ accordion functionality using HTML details/summary
- Mobile sticky call-to-action bar
- Custom CSS variables for brand colors

## External Dependencies

- **Tailwind CSS**: Loaded via CDN for utility classes
- **Google Fonts**: Inter and Oswald font families
- **Images**: External Unsplash URLs for testimonial photos and logos

## Customization Notes

- Brand colors are defined as CSS custom properties in the `:root` selector
- All CTA links point to the same external URL with tracking parameter
- Stock numbers and countdown logic are handled via JavaScript at the bottom of the file
- Testimonial data and statistics are hardcoded in the HTML

## Git & GitHub Workflow Guidelines

### Repository Management
- **Always use descriptive commit messages** that explain the "why" not just the "what"
- **Commit frequently** with logical, atomic changes (one feature/fix per commit)
- **Never commit sensitive data** (API keys, credentials, personal info)
- **Use .gitignore** to exclude temporary files, logs, and system files

### GitHub CLI Best Practices
- **Installation**: Use `gh --version` to verify GitHub CLI is installed
- **Authentication**: Run `gh auth login` for first-time setup
- **Repository creation**: Use `gh repo create` with descriptive names and visibility settings
- **Issue management**: Use `gh issue create` and `gh pr create` for workflow automation

### Commit Message Standards
```
Format: <type>: <description>

Types:
- feat: New feature or functionality
- fix: Bug fixes
- update: Content or copy changes
- style: CSS/styling changes
- refactor: Code restructuring without functionality changes
- docs: Documentation updates
- test: Testing additions or modifications

Examples:
- feat: Add VensoSmart product features section
- update: Replace ProGuard branding with VensoSmart
- fix: Resolve mobile CTA button alignment issue
- style: Update brand colors to match VensoSmart palette
```

### Branch Strategy
- **main**: Production-ready code only
- **feature branches**: Use descriptive names like `feature/vensosmart-testimonials`
- **hotfix branches**: For urgent production fixes `hotfix/cta-button-fix`

### Pull Request Guidelines
- **Always create PRs** for significant changes, even when working solo
- **Use PR templates** with clear descriptions of changes and testing done
- **Review before merging** to catch issues and maintain code quality
- **Delete feature branches** after successful merge to keep repository clean

### File Management
- **Keep repository organized** with clear folder structure
- **Use meaningful filenames** that describe content/purpose  
- **Maintain TASKLIST.md** for tracking project progress
- **Update CLAUDE.md** when adding new tools, workflows, or guidelines

### Backup & Safety
- **Push changes regularly** to avoid losing work
- **Use tags** for important milestones: `git tag v1.0-vensosmart-launch`
- **Create releases** for major versions using GitHub releases feature
- **Never force push** to main branch unless absolutely necessary

### Automation & CI/CD
- **Consider GitHub Actions** for automated testing when project grows
- **Use issue templates** for consistent bug reports and feature requests
- **Link commits to issues** using keywords like "fixes #123" or "closes #456"

### Emergency Procedures
- **Rollback process**: Use `git revert` instead of `git reset` for shared branches
- **Hotfix workflow**: Create hotfix branch, fix, test, merge, and tag immediately
- **Backup verification**: Regularly verify that all important changes are pushed to GitHub