# FAR clauses

Basic tool for identify required FAR clauses.  Scrapes data from the [FAR
52.301 Matrix](https://www.acquisition.gov/far/current/html/52_301Matrix.html)
and puts it into a JSON file.  There's a simple web GUI that displays the list
of contract types; clicking a contract type will show the list of
required-if-applicable, required, and optional FAR clauses.

## Usage

To build the clause mapping file, run the script with node and specify that
you want to build the mapping file:

```
node main.js build-mapping
```

Currently the script only builds the mapping file, but it was designed so
it could have additional functionality later.

The main application is a static site.  Because it uses the jQuery AJAX
API, it won't work loaded as a simple file.  [http-server](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=3&cad=rja&uact=8&ved=0ahUKEwi_nJKGzdHQAhUm5YMKHZdaA7gQFgguMAI&url=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fhttp-server&usg=AFQjCNE6WK097SaQwBrGc_aERDwX_XOMeQ)
is a useful tool for very simply serving a directory.

## Public domain

This project is in the worldwide [public domain](LICENSE.md).   As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within   the United States, and
copyright and related rights in the work worldwide are waived through
the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).

> All contributions to this project will be released under the CC0
dedication. By submitting a   pull request, you are agreeing to comply
with this waiver of copyright interest.
