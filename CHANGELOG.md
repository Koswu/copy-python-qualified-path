# Change Log

All notable changes to the "copy-python-qualified-path" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

## [0.5.0] - 2025-11-14

### Added
- New "Copy Import Statement" command that copies Python import statements in the format `from module.path import ClassName` or `from module.path import function_name`
- Context menu item for "Copy Import Statement" alongside existing "Copy Qualified Path"

### Changed
- Refactored common parsing logic into a helper function for better code maintainability

## [0.0.1] - Initial release