helloworldr
===========

Watches folder/files for changes and runs a command for quick tests.  Runs the command in a child process with a default timeout of 1 minute.  




Installation
------------

Run the following

	npm install helloworldr -g




Configuration
-------------

### timeout

Number of seconds to wait before a child process timeout occurs.  

**Example:** Timeout after 5 minutes

```
	{
		"timeout": 300
	}
```


### watch

Create a JSON file `.helloworldr`.  Associating the glob pattern to watch with the command to run.  

**Example:** Watch all files with `.go` extension in any subfolder and execute the command `go run`.  Watch files in current path with `.txt` extension and print

```
	{
		"watch": {
			"**/*.go": "go run %1",
			"*.txt": "cat %1"
		}
	}
```




Run
---

Then run: 

	$ helloworldr




License
-------

Copyright (c) 2014 Henry Tseng

Released under the MIT license. See LICENSE for details.
