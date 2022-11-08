const HOJA = SpreadsheetApp.openById('1EyF9A6jJZEaEETzHmLYO-IBDRYgk_esChjjVBwMDdwE').getActiveSheet();

function doGet(datos)
{
    insertarContacto(datos.parameter.nombre, datos.parameter.correo, datos.parameter.telefono);
    return HtmlService.createTemplateFromFile('web').evaluate().setTitle('Agenda Google App Script');
}

function doPost(datos)
{
    insertarContacto(datos.parameter.nombre, datos.parameter.correo, datos.parameter.telefono);    
    return HtmlService.createTemplateFromFile('web').evaluate().setTitle('Agenda Google App Script');

}

function obtenerDatosHTML(nombre)
{
   return HtmlService.createHtmlOutputFromFile(nombre).getContent();
}

function obtenerContactos()
{
return HOJA.getDataRange().getValues();
}

function insertarContacto(nombre, correo, telefono)
{
    HOJA.appendRow([nombre,correo,telefono]);
}