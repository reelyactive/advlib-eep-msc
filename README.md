advlib-eep-msc
==============

Wireless advertising packet decoding library for EnOcean Equipment Profiles of manufacturer specific communication data (MSC).  __advlib-eep-msc__ is typically used as a library for [advlib-esp](https://github.com/reelyactive/advlib-esp) which itself is commonly a processor module of the protocol-agnostic [advlib](https://github.com/reelyactive/advlib).

![Overview of advlib-eep-msc](https://reelyactive.github.io/advlib-eep-msc/images/overview.png)

__advlib-eep-msc__ is a lightweight [Node.js package](https://www.npmjs.com/package/advlib-eep-msc) with no dependencies.  See also its sister libraries [advlib-eep-4bs](https://github.com/reelyactive/advlib-eep-4bs), [advlib-eep-vld](https://github.com/reelyactive/advlib-eep-vld) and [advlib-eep-rps](https://github.com/reelyactive/advlib-eep-rps).


Installation
------------

    npm install advlib-eep-msc


Hello advlib-eep-msc!
---------------------

```javascript
const advlib = require('advlib-eep-msc');

let eepType = 'D1-07-10';
let telegram = 'd10470a500007b0414006980';

let processedData = advlib.processMSCTelegram(eepType, telegram);

console.log(processedData);
```

Which should yield the following console output:

    {
        batteryVoltage: 3.3,
        passageCounts: [ 123 ],
        uri: "https://sniffypedia.org/Organization/DEUTA_Controls_GmbH/"
    }


Supported EnOcean Equipment Profiles
------------------------------------

The following EEPs are currently supported by __advlib-eep-msc__.

| Mfr. Id | EEP      | Profile Name                 | /lib file               |
|:--------|:---------|:-----------------------------|:------------------------|
| 0x047   | D1-07-10 | People Counter               | deutacontrols.js        |

See [www.reelyactive.com/pareto/anywhere/devices/enocean-alliance/](https://www.reelyactive.com/pareto/anywhere/devices/enocean-alliance/) for a list of all EEPs supported by our [Pareto Anywhere](https://www.reelyactive.com/pareto/anywhere/) open source IoT middleware.


Contributing
------------

Discover [how to contribute](CONTRIBUTING.md) to this open source project which upholds a standard [code of conduct](CODE_OF_CONDUCT.md).


Security
--------

Consult our [security policy](SECURITY.md) for best practices using this open source software and to report vulnerabilities.


License
-------

MIT License

Copyright (c) 2024 [reelyActive](https://www.reelyactive.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
THE SOFTWARE.

