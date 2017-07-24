
## Hacking the SDK (advanced users)

To develop on the Moment SDK, you will need to install some dependencies first.
The following instructions assume you have some familiarity with your terminal.

### Step 0: Clone Repository

Clone the repository:

    git clone git@github.com:SomaticLabs/moment-sdk.git

Change the working directory:

    cd moment-sdk

### Step 1: Install NPM

Follow this [Getting Started Guide](https://docs.npmjs.com/getting-started/installing-node) to
install NPM for your operating system.

### Step 2: Install Gulp

Our build system uses the Gulp package to manage JavaScript compilation and
documentation generation. You will need a global installation of gulp, which
you can obtain by entering the following command into your terminal:

    npm install -g gulp

### Step 4: Ensure Java is Available

Make sure you have the Java runtime (JRE) installed. We use the `java` command
as part of the build process.

### Step 5: Install NPM Dependencies

For the rest of our build system, you can install all the necessary software by
entering the following command into your terminal:

    npm install

## Typical Development Workflow

### Creating and Running Tests

Unit tests are run using [Mocha](https://www.npmjs.com/package/mocha), and
all test files are in the `test/` folder. Running tests is easy:

    npm test

To create new tests, you will do one of the following:

1. Create a new test module in a separate file
2. Add a unit test to an existing module

If your changes involve several new classes and functions, you may want to
create a new file; however, we prefer adding unit tests to existing test files
under most circumstances.

To ensure tests cases provide adequate code coverage, we make use of the
[istanbul](https://www.npmjs.com/package/istanbul) package. To run a coverage
test using it, just run the following command:

    npm run coverage

### Generating Documentation

Documentation is generated using [JSDoc](http://usejsdoc.org/), and all
additions to the Moment SDK must be documented using inline comments.
To generate documentation for your code, simply run the following command:

    npm run generate-docs

### Compiling with Closure Compiler

The last step before the SDK code can be used on-board Moment is compilation
using the
[Google Closure Compiler](https://github.com/google/closure-compiler/).
The Closure Compiler is configured to use all of its advanced optimizations,
and will also enforce several code style rules to allow for aggressive size
reduction and optimization. To compile the JavaScript source for the SDK, run the following command:

    npm run compile

### Pull Requests and Issues

We invite anyone to open an issue for feature requests, bugs, and questions.
Likewise, you are welcome to fork the code as long as you respect the GNU General Public License. If you wish to create a pull request on the main repository, we may require you to sign a contributor's agreement - your code will still be made available under the GPL, but Somatic Labs requires all direct contributions to be licensed back to our company (it makes our lawyers happy).
