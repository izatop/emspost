var api = require('../index.js');
var error = function (error) {
    console.log('error:', error);
};

api.echo().then(function (result) {
    "use strict";
    console.log("echo", result);
}).catch(error);

api.getCountries()
    .then(function (result) {
        "use strict";
        console.log("getCountries", result);
    })
    .catch(error);

api.getRegions()
    .then(function (result) {
        "use strict";
        console.log("getRegions", result);
    })
    .catch(error);

api.getCities()
    .then(function (result) {
        "use strict";
        console.log("getCities", result);
    })
    .catch(error);

api.getMaxWeight()
    .then(function (result) {
        "use strict";
        console.log("getMaxWeight", result);
    })
    .catch(error);

api.calculate({from: "city--moskva", to: "city--murmansk", weight: 1})
    .then(function (result) {
        "use strict";
        console.log('calculate', result);
    })
    .catch(error);