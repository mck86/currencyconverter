## currencyconverter ##
Test for The Home Depot application process

Table of Contents:
* [Install](#install)
    * [Clone Project](#clone-project)
    * [Install Grobal Dependencies](#install-global-dependencies)
    * [Install Project Dependencies](#install-project-dependencies)
* [Run](#run)
* [Note](#note)


## <a name="install"></a> Install

### <a name="clone-project"></a> Clone Project from Git
```sh
npm git clone https://github.com/mck86/currencyconverter.git
```
### <a name="install-global-dependencies"></a> Install global dependencies
```sh
npm install -g bower
npm install -g grunt grunt-cli
```
### <a name="install-project-dependencies"></a> Install project dependencies
```sh
npm install
bower install
```

## <a name="run"></a> Run Locally

```sh
grunt serve
```

## <a name="note"></a> Note

~~The API returns an HTTP 403 status when run in IE locally, but works when uploaded to a server or run in Chrome and Firefox. When researched, it appears to be due to the request being a Cross-Origin Request. Because of the way IE handles these, it returns a 403 status. Chrome and Firefox handles this differently which is why they do not return a 403 status.~~

Fixed

## <a name="to-dos"></a> To-Dos

- Fix IE error when running locally
- Re-write CSS with SCSS once learned
- Re-write JS with ReactJS once learned