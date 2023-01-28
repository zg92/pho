# Pho

Pho is a command line interface (CLI) for photographers to manage their image post-processing. Pho enables simple importing, modification, and exporting of files. Currently, image modification is only supported for `.jpg` files.

A few example use cases are:

1. Adding a border around images in bulk
2. Compressing or resizing images in bulk
3. Getting filtered EXIF data at scale

## Installation

To install Pho:

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm install -g .` to install pho globally and enable its usage in terminal through calling `pho <command>`

## Usage

Run `pho.js init` to initialize program and create a directory for importing, exporting, and working with images.

All commands can be performed through using `pho <command>`. Use `pho --help` or `pho <command> --help` to get more details about available commands and options.

The following commands are supported:

### Moving files in and out of Pho:

- `pho import [directory] [files]`: Import files from a local file into a directory in Pho.
- `pho export [directory] [files] [destination]`: Export files from a Pho directory to an external directory.

### Look at files in different Pho directories:

- `pho peek [directory] [extra] [files] [options]`: Peek at a directory or file(s) to see their metrics and/or exif data.

### Image file operations:

- `pho rename [file] [name] [add]`: Rename an existing file by passing in the file as the first argument, then the desired new name.
- `pho border [inplace] [directory] [files] [size] [ig]`: Compress all .jpg files in a directory, a single file, or multiple files.
- `pho compress [inplace] [directory] [files]`: Compress all .jpg files in a directory, a single file, or multiple files.
- `pho resize [inplace] [directory] [files] [resize]`: Resize all .jpg files in a directory, a single file, or multiple files.

### Removing files:

- `pho delete [directory] [files]`: Delete an existing file or directory within the working directory.
- `pho reset [directories] [keep]`: Optional argument enabling you to specify the directories you would like to reset.

## Dependencies

Pho requires the following dependencies to run:

- ansi-colors (MIT License): A library for adding color to the terminal
- cli-progress (MIT License): A library for creating progress bars in the command line
- configstore (MIT License): A library for managing configs in the command line
- exif-parser (MIT License): A library for parsing exif data from image files
- figlet (MIT License): A library for creating ASCII art
- prompts (MIT License): A library for creating interactive prompts in the command line
- sharp (Apache License 2.0): An image processing library for Node.js
- yargs (BSD-3-Clause): A library for building powerful command line interfaces

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
