import {
    editableCell,
    emptyRow,
    fixedCell, horizontalCollectionCell, referenceCell,
    registerRenderer,
    row, tabCell,
    verticalCollectionCell,
    verticalGroupCell
} from "webeditkit";
import {ModelNode} from "webeditkit/dist/datamodel";

var css = require('./css/style.css');

const webeditkit = require("webeditkit");

$('document').ready(function(){
    webeditkit.setup();

    registerRenderer('com.strumenta.businessorg.Organization', (node)=>{
        return verticalGroupCell(
            row(fixedCell(node, 'Organization'), editableCell(node, 'name')),
            emptyRow(),
            row(fixedCell(node, 'roles:')),
            row(tabCell(), verticalCollectionCell(node, 'roles')),
            emptyRow(),
            row(fixedCell(node, 'persons:')),
            row(tabCell(), verticalCollectionCell(node, 'persons')),
        );
    });

    registerRenderer('com.strumenta.businessorg.Role', (node)=>{
        return editableCell(node, 'name');
    });

    registerRenderer('com.strumenta.businessorg.Person', (node)=>{
        return row(editableCell(node, 'name'), fixedCell(node, ":"), horizontalCollectionCell(node, 'roles', () => {
            fixedCell(node, ",");
        }));
    });

    registerRenderer('com.strumenta.businessorg.RolePlayed', (node)=>{
        return referenceCell(node, 'role');
    });

    webeditkit.addModel("localhost:2904", "com.strumenta.businessorg.sandbox.acmeinc", "5270253970127314084", "businessorg");
});