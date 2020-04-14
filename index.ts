import {ModelNode} from "webeditkit/dist/datamodel";

var css = require('./css/style.css');

import {
    editableCell,
    emptyRow,
    fixedCell, horizontalCollectionCell, horizontalGroupCell, referenceCell,
    registerRenderer,
    row, tabCell,
    verticalCollectionCell,
    verticalGroupCell
} from "webeditkit";

const webeditkit = require("webeditkit");

$('document').ready(function(){
    webeditkit.setup();

    registerRenderer('com.strumenta.businessorg.Organization', (node) => {
       return verticalGroupCell(
            row(fixedCell(node, 'Organization', ['title']), editableCell(node, 'name', ['title'])),
            emptyRow(),
            row(fixedCell(node, 'Roles:')),
            row(tabCell(), verticalCollectionCell(node, 'roles')),
            emptyRow(),
            row(fixedCell(node, 'Persons:')),
            row(tabCell(), verticalCollectionCell(node, 'persons')),
       );
    });

    registerRenderer('com.strumenta.businessorg.Role', (node) => {
        return editableCell(node, 'name');
    });

    registerRenderer('com.strumenta.businessorg.Person', (node) => {
        return row(editableCell(node, 'name'), fixedCell(node, ":"), horizontalCollectionCell(node, 'roles', () => {
            return fixedCell(node, ",");
        }));
    });

    registerRenderer('com.strumenta.businessorg.RolePlayed', (node) => {
        return referenceCell(node, 'role');
    });

    registerRenderer('com.strumenta.businessorg.Process', (node) => {
        return verticalGroupCell(
            row(fixedCell(node, 'process', ['title']),
                editableCell(node, 'name', ['title']),
                fixedCell(node, 'for', ['title']),
                referenceCell(node, 'organization', ['title'])),
            emptyRow(),
            verticalCollectionCell(node, 'steps', true),
            // row(fixedCell(node, 'Roles:')),
            // row(tabCell(), verticalCollectionCell(node, 'roles')),
            // emptyRow(),
            // row(fixedCell(node, 'Persons:')),
            // row(tabCell(), verticalCollectionCell(node, 'persons')),
        );
    });

    registerRenderer('com.strumenta.businessorg.ProcessStep', (node) => {
        return horizontalGroupCell(
            tabCell(),
            fixedCell(node, (node.index() + 1).toString()),
            editableCell(node, 'name'),
            fixedCell(node, 'executed by'),
            referenceCell(node, 'executor')
        );
    });

    webeditkit.addModel("localhost:2904", "com.strumenta.businessorg.sandbox.acmeinc", "5270253970127314084", "organization");
    webeditkit.addModel("localhost:2904", "com.strumenta.businessorg.sandbox.acmeinc", "5270253970127368335", "process");
});