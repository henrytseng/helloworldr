Testing
=======

Examples can be found in the `examples` folder.  These can be tested via Docker.  

First build the image

```
docker build -t docker-hello .
```

Then run the example

```
docker run -i -t --rm --mount type=bind,source="$(pwd)",target=/hello docker-hello
```
