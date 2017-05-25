# Typefi

## Overview
Typefi is an extension for [Brackets](https://github.com/adobe/brackets) that allows markdown documents to be printed using Typefi. 

## Getting started

1. Install the extension within Brackets by selecting `File...Extension Manager`.
2. Select `Help...Show Extensions Folder` and within this folder open `typefi/settings.json`.
3. Enter values for all items within the settings file (described subsequently) and save.
4. Open the markdown document to be printed within Brackets.
5. Create a Typefi workflow that uses Markdown to Html as its first action.

## Using Typefi

Whenever you wish to print the current markdown document just hit the Typefi button or Ctrl-Shift-T (Command-Shift-T on macOS). The document will be printed using Typefi and the first pdf output produced opened in your default browser. If no pdf output is produced then the first output produced is opened.

## Settings

### serverApi

The Typefi server api url which is to be used for printing, such as `https://v8.typefi.com/api/v2/` or `http://localhost:8080/api/v2/`

### workflow

The full path to the workflow that is to be used for printing, such as `Acme/Documentation/Final.typefi_workflow`. This must use Markdown to Html as the first action.

### username

The username for the Typefi server.

### password

The password for the Typefi server.

### customer

The customer for the Typefi server.

## Source documentation

Within the root folder the following JSDoc command will generate all source documentation

		jsdoc readme.md lib

## Credits

This extensions uses the [Ramda](https://github.com/ramda/ramda) functional library, with [JSDoc](http://usejsdoc.org/) documentation that includes [Type Signatures](https://github.com/ramda/ramda/wiki/Type-Signatures) adapted from Haskell for Ramda