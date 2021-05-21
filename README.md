# Airline Ticket Sales

A development environment for an airline ticket sales company.



## Quick start

```bash
# Resolve dependencies
yarn # or npm install

# Start the dev server
yarn dev
```



## Environment

​	To test the API, migrations have been made and are performed on the first startup. In addition, some seeders with some data have been included to assist in the task of populating tables. Feel free to check the [src/database](./src/database) folder and add more data.



## Container

​	The application can be used in a docker container. First, you'll need to run `yarn bundle` in order to generate the necessary bundle used in the container. Then, just use `docker-compose up` in the root folder and it should be ready in a few seconds.



## Author

[Vitor Rabelo Cruvinel](https://github.com/Kabelin)
