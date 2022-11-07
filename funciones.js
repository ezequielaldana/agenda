function doGet()
{
    return HtmlService.createTemplateFromFile('web').evaluate().setTitle('Agenda Google App Script');
}

function obtenerDatosHTML(nombre){
   return HtmlService.createHtmlOutputFromFile(nombre).getContent();
}
function obtenerContactos()
{
let hoja = SpreadsheetApp.openById('1EyF9A6jJZEaEETzHmLYO-IBDRYgk_esChjjVBwMDdwE').getSheetByName('datos');
let datos= hoja.getDataRange().getValues();
return datos;
}