# Developing
```
npm i (optional)
npm run server
```

# Building
```
npm run build
```

`dist/` should contain the assets to be packaged in the next step.

# Packaging
```
ares-package dist/
```

A `.ipk` file should have been created.

# Deploying
```
ares-device-info -D # list all available devices
ares-install <name of ipk>.ipk -d <device name>
ares-launch <id from appinfo.json> -d <device name>
```

Target TV should now be running the app.