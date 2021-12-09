# Llama Log Testing

> insert image here

To navigate back to the README file, [click here](README.md)

## Contents

<hr>

## Bugs

### Fixed

The following are bugs that I have dealt with and fixed:

#### Circular Imports with Python Files

Llama Log has been developed with maintainablity in mind, seperating the app into different modules with the use of flask blueprints based on their functionality.

A problem this provided however, was retrieving the mongo object instance from the initial python file in order to push data to mongo databases. Other python files importing this mongo instance from the intial python file resulted in an error due to circular imports, as the python files would then be interdependant of one another.

I came to fix this problem after reading [this Stack Overflow post answer](https://stackoverflow.com/a/57445032/15607265). It was apparent that imports needed to be made deeper within the file when needed, not at the top of the file.