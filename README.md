emspost
=======

This is an Promise-based API library that provides access to EMS Russian Post API. 
More information about EMS Russian Post API you can see on [their website](http://www.emspost.ru/ru/corp_clients/dogovor_docements/api/).

## Install

```
npm install emspost --save
```

## Example
```js
var emspost = require('emspost');
emspost.echo().then(function (result) {
    if (result) {
        console.log('service is available');
    } else {
        console.log('service isn\'t available');
    }
}).catch(function (error) {
    console.log('something went wrong...');
})
```

## API Methods

### Get countries

Example:

```js
emspost.getCountries().then(function (result) {
    console.log(result);
})
```

Result:

```
[
    ...
    {name: 'РОССИЯ', code: 'RU'},
    ...
]
```

### Get regions

Example:

```js
emspost.getRegions().then(function (result) {
    console.log("getRegions", result);
})
```

Result:

```
[
    ...
    {name: 'АДЫГЕЯ РЕСПУБЛИКА', code: 'region--respublika-adygeja'},
    ...
]
```

### Get cities

Example:

```js
emspost.getCities().then(function (result) {
    console.log("getCities", result);
})
```

Result:

```
[
    ...
    {name: 'АБАКАН', code: 'city--abakan'},
    ...
]
```

### Get max weight

Example:

```js
emspost.getMaxWeight().then(function (result) {
    console.log("getMaxWeight", result);
})
```

### Calculate delivery price

Method has one argument `CalculateProperty` that contains the following properties ([see more about these properties](http://www.emspost.ru/ru/corp_clients/dogovor_docements/api/)):

```
{
    from?:string, 
    to:string, 
    weight:number,
    type:string
}
```

Example:

```js
emspost.calculate({from: "city--moskva", to: "city--murmansk", weight: 1})
    .then(function (result) {
        console.log('calculate', result);
    })
```

Result:

```
{
    price: 680,
    period: {
        max: 3,
        min: 2
    }
}
```