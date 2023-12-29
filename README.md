# NxReactSspa

This repo is a nx extension to generate react application and componment with single spa support

### Commands

There are shell scripts under **shell** directory. In order to execute the scripts, please manke sure the command line tool is authorized to use files. To make sure you have your bash command line tool authoried, use

```shell
chmod a+x /shell
```

#### To build react-sspa
   ```
    ./shell/build-local.sh
   ```
   This command will build the react-sspa package, and then compress to a tgz file. Ahter the it is compressed into the tgz file, the script will add it to the local node_modules. Then you can simple do

    ```
    nx g react-sspa:app
    ```
    to create a react project locally with single spa support
