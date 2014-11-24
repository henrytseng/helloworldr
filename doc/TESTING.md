Testing
=======

Examples can be found in the `examples` folder.  These can be tested via Docker.  

First build the image

```
docker build -t docker-hello .
```

Then run the container

```
docker run -i -t --rm --mount type=bind,source="$(pwd)",target=/hello docker-hello
```

Take a look at an example

```
cd examples/simple-watch
```

Run

```
HOME_LOCAL=1 /hello/packages/helloworldr-cli/bin/hello
```
