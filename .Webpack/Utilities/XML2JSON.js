import { path as appRoot } from 'app-root-path';
import fs from 'fs';
import _s from 'underscore.string';
import xml2json from 'xml2js-parser';

import Markdown from './Markdown';

class XML2JSON {
    static xml2jsonOptions () {
        return {
            explicitArray : false,
            explicitRoot : false,
            mergeAttrs : true,
            normalize : false,
            tagNameProcessors : [
                function (name) {
                    return _s.camelize(name);
                }
            ],
            trim : true
        };
    }

    /**
     * renameProps
     */
    static renameProps (data, props) {
        if (data === null || typeof data !== 'object') {
            return;
        }

        Object.keys(data).forEach(key => {
            if (props.indexOf(key) === -1) {
                return;
            }

            data[data[key].name] = data[key];
            delete data[key];
        });
    }

    /**
     * flattenKeyValuePairs
     */
    static flattenKeyValuePairs(data, props) {
        let cache;

        if (data === null || typeof data !== 'object') {
            return;
        }

        Object.keys(data).forEach(key => {
            if (props.indexOf(key) === -1) {
                XML2JSON.flattenKeyValuePairs(data[key], props);

                return;
            }

            if (!data[key] || !Boolean(data[key] instanceof Array)) {
                return;
            }

            cache = {};

            data[key].forEach(item => {
                Object.defineProperty(cache, item.key, {
                    value: item.value,
                    enumerable: true
                });
            });

            if (Object.getOwnPropertyNames(cache).length > 0) {
                data[key] = cache;
            }
        });
    }

    /**
     * isKeeper
     */
    static isKeeper (element) {
        let exclusion = [
            'date-last-modified',
            'date-last-translated',
            'is-fpo',
            'owner'
        ];

        return exclusion.indexOf(element.key) === -1;
    }

    /**
     * reviver
     */
    static reviver (key, value) {
        let returnValues;

        switch(key) {
            case 'asset':
                Object.keys(value).forEach(item => {
                    value[item].assetType = item.charAt(0) + item.substring(1);
                    returnValues = value[item];
                });
                break;

            case 'contentElements':
                switch(value.contentElement instanceof Array) {
                    case true:
                        returnValues = value.contentElement;
                        break;

                    default:
                        returnValues = [];
                        returnValues.push(value.contentElement);
                        break;
                }
                break;

            case 'sections':
                switch(Boolean(value.section instanceof Array)) {
                    case true:
                        returnValues = value.section;
                        break;

                    default:
                        returnValues = [];
                        returnValues.push(value.section);
                        break;
                }
                break;

            case 'item':
                switch(Boolean(value instanceof Array)) {
                    case true:
                        returnValues = value;
                        break;

                    default:
                        returnValues = [];
                        returnValues.push(value);
                        break;
                }

                returnValues.filter(XML2JSON.isKeeper);
                break;

            case 'metadata':
                returnValues = value.item;
                break;

            case 'displayIndex':
            case 'id':
            case 'xmlns:xsi':
            case 'xsi:noNamespaceSchemaLocation':
                returnValues = undefined;
                break;

            default:
                returnValues = value;
                break;
        }

        return returnValues;
    }

    static asset (asset) {
        switch (asset.assetType) {
            case 'image' : return {
                src : asset.value,
                width : asset.metadata.width,
                height : asset.metadata.height
            };

            case asset.locale : return asset.locale;

            default : return asset.value;
        }
    }

    static rearrangeData (data, pageName) {
        return data.sections.map(
            section => {
                const hasName = section.name;
                const hasMetadata = Boolean(section.metadata);
                const hasContentElements = Boolean(section.contentElements);

                let hasSections = Boolean(section.sections);
                let hasPartNumbers = (pageName && pageName.endsWith('/products'));
                let isI18N = (pageName && pageName.endsWith('/i18n'));

                let node = {
                    name : hasName ? section.name : null
                };

                if (hasPartNumbers) {
                    node.partNumbers = [];
                }

                if (hasMetadata) {
                    Object.keys(section.metadata).forEach(
                        name => node[name] = section.metadata[name]
                    );
                }

                if (hasContentElements) {
                    if (isI18N) {
                        section.contentElements.forEach(
                            element => node[element.name] = XML2JSON.asset(element.asset)
                        );
                    } else {
                        section.contentElements.forEach(
                            element => node[element.name] = Markdown.convert(
                                element.name, XML2JSON.asset(element.asset)
                            )
                        );
                    }
                }

                if (hasPartNumbers) {
                    section.sections.forEach(
                        sec => {
                            const partNumber = {};

                            if (sec.name) {
                                partNumber.name = sec.name;
                            }

                            if (sec.metadata) {
                                Object.keys(sec.metadata).forEach(
                                    name => partNumber[name] = sec.metadata[name]
                                );
                            }

                            if (sec.contentElements) {
                                sec.contentElements.forEach(
                                    element => partNumber[element.name] = Markdown.convert(
                                        element.name, XML2JSON.asset(element.asset)
                                    )
                                );
                            }

                            node.partNumbers.push(partNumber);
                        }
                    );
                }

                if (hasContentElements && section.contentElements.some(element => element.asset)) {
                    section.contentElements.forEach(
                        element => {
                            if (!element.asset) {
                                return;
                            }

                            Object
                                .keys(element.asset)
                                .filter(name => name !== 'metadata')
                                .forEach(
                                    name => node[name] = element.asset[name]
                                );

                            if (!element.asset.metadata) {
                                return;
                            }

                            Object.keys(element.asset.metadata).forEach(
                                name => node[name] = element.asset.metadata[name]
                            );
                        }
                    );
                }

                if (node.assetType) {
                    delete node.assetType;
                }

                if (hasSections && !hasPartNumbers) {
                    node.sections = XML2JSON.rearrangeData(section, pageName);
                }

                return node;
            }
        );
    }

    static manipulateData (data) {
        let pageName = data.page.name;
        switch (pageName) {
            case 'shared/supported-locales' :
                try {
                    return [].concat(
                        data.page.sections.section.contentElements.contentElement
                    ).map(
                        element => {
                            const text = element.asset.text;
                            const metadata = {};

                            [].concat(text.metadata.item).forEach(
                                data => metadata[data.key] = data.value
                            );

                            return Object.assign({ title : text.value }, metadata);
                        }
                    );
                } catch (error) {
                    return [];
                }
                break;

            default :
                data = JSON.parse(
                    JSON.stringify(data).replace(/\s/g, ' '),
                    XML2JSON.reviver
                );

                XML2JSON.renameProps(data, ['page']);
                XML2JSON.flattenKeyValuePairs(data, ['metadata']);

                let convertedData = XML2JSON.rearrangeData(
                    data[Object.keys(data)[0]], pageName
                ).map(
                    prop => {
                        delete prop.height;
                        delete prop.value;
                        delete prop.width;

                        return prop;
                    }
                );

                if (convertedData.length === 1) {
                    convertedData = convertedData[0];
                }

                if (convertedData.sections && Object.keys(convertedData).length === 1) {
                    convertedData = convertedData.sections;
                }

                return convertedData;
                break;
        }
    }

    static transform (path) {
        const xmlFile = xml2json.parseStringSync(
            fs.readFileSync(`${appRoot}/${path.replace(appRoot, '')}`).toString(),
            XML2JSON.xml2jsonOptions()
        );

        return XML2JSON.manipulateData(xmlFile);
    }

    static stringify (path) {
        return JSON.stringify(XML2JSON.transform(path), null, 2);
    }

    static buffer (path) {
        return new Buffer(XML2JSON.stringify(path))
    }
}

export default XML2JSON;
