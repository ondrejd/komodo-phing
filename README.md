# Phing Support for Komodo Edit Addon

This addon adds [Phing](https://www.phing.info/) support into [Komodo Edit](http://komodoide.com/komodo-edit/).

## Features

- simple auto-completion for _Phing_ build files,
- few templates of _Phing_ build files.

### Note on auto-completion

Auto-completion is based on DTD file and so is automatically imperfect because of definition of _Phing_ build files - simply DTD can not implement it all. Instead of perfect doctype I wanted just help with tasks arguments.
So if you want to use it you should start _Phing_ build files with this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE project PUBLIC "-//PHING GRAMMAR V0.1" "http://ondrejd.info/phing-grammar">
```

This is just for IDEs or editors which do not support [RELAX NG](http://www.relaxng.org/) but just [XML Catalogs](https://www.oasis-open.org/committees/download.php/14810/xml-catalogs.pdf). For example in [NetBeans IDE](https://netbeans.org/) is better to start your _Phing_ build files with this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<?xml-model xlink:href="/your/path/to/phing-grammar.rng" 
            schematypens="http://relaxng.org/ns/structure/1.0" 
            type="application/xml"?>
```

For more details on this topic see _Phing_ [documentation](https://www.phing.info/docs/stable/hlhtml/index.html#d5e1043).

