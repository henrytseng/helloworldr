Configuration
=============

## Watch

Runs build assemblies automatically when file changes occur.  

### watch

Create a JSON file `hello.config.json`.  Associating the glob pattern to watch with the command to run.  

**Example:** Watch all files with `.go` extension in any subfolder and execute the command `go run`.  Watch files in current path with `.txt` extension and print

```
	{
		"watch": {
			"**/*.go": "go run %1",
			"*.txt": "cat %1"
		}
	}
```


### timeout

Number of seconds to wait before a child process timeout occurs.  

**Example:** Timeout after 5 minutes

```
	{
		"timeout": 300,
		"watch": {
			"*.txt": "cat %1"
		}
	}
```


## Build

(TODO)
