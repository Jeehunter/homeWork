


const fs = require('fs');
const licenseChecker = require('C:\\node\\node_modules\\license-checker\\lib\\index');

console.info('CodeArts IDE ThridPartyNotices generator start.');

const customFormatExample = {
	'name': '',
	'version': '',
	'description': '',
	'licenses': '',
	'copyright': '',
	'licenseFile': 'none',
	'licenseText': 'none',
	'licenseModified': 'no'
};

const header = `THIRD PARTY OPEN SOURCE SOFTWARE NOTICE

This document contains an open source software notice for this product. The open source software licenses are granted by the respective right holders.
And the open source licenses prevails all other license information with regard to the respective open source software contained in the product.

Warranty Disclaimer
THE OPEN SOURCE SOFTWARE IN THIS SOFTWARE IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL, BUT WITHOUT ANY WARRANTY,
WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES
FOR MORE DETAILS.
`;

const writtenOffer = `
Written Offer
This product contains software whose rights holders license it on the terms of the GNU General Public License, version 2 (GPLv2) and/or other open source software licenses. We will provide you and any third party with the source code of the software licensed under an open source software license if you send us a written request by mail or email to the following addresses:
foss@huawei.com
detailing the name of the product and the firmware version for which you need the source code and indicating how we can contact you.

PLEASE NOTE THAT WE WILL ASK YOU TO PAY US FOR THE COSTS OF A DATA CARRIER AND THE POSTAL CHARGES TO SEND THE DATA CARRIER TO YOU. THIS OFFER IS VALID FOR THREE YEARS FROM THE MOMENT WE DISTRIBUTED THE PRODUCT AND VALID FOR AS LONG AS WE OFFER SPARE PARTS OR CUSTOMER SUPPORT FOR THAT PRODUCT MODEL.
`;

const ignores = ['codearts-dev'];

console.info('Waiting for license-checker...');

licenseChecker.init({
	start: './',
	customPath: customFormatExample
}, function (err, packages) {
	if (err) {
		console.error(err);
	} else {
		let text = header;

		for (const item in packages) {
			let isIgnore = false;
			for (const ignore of ignores) {
				if (item.indexOf(ignore) !== -1) {
					isIgnore = true;
					break;
				}
			}
			if (isIgnore) {
				continue;
			}
			const itemText = convertItem(item, packages[item]);
			text = text + itemText;
		}

		text = text + writtenOffer;

		fs.writeFileSync('ThirdPartyOpenSourceNotices.txt', text, function (err) {
			if (err) {
				return console.error(err);
			}
		});
		console.info('CodeArts IDE ThridPartyNotices generator done.');
	}
});

function convertItem(name, package) {
	const copyrightText = package.copyright ? `Copyright notice: ${package.copyright}` : '';
	const licenseText = package.licenseText ? package.licenseText : '';
	const item = `
--------------------------------------------------------------------------------------------

Software: ${name}
${copyrightText}
License: ${package.licenses}


${licenseText}


--------------------------------------------------------------------------------------------
`;
	return item;
}
