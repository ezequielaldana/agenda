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

function insertarContacto(nombre, apellido, correo, telefono)
{
    HOJA.appendRow([nombre,apellido,correo,telefono]);

}

function borrarContacto(numFila)
{
    HOJA.deleteRow(numFila);
}
function modificarContacto(numFila,datos)
{
    let celdas =HOJA.getRange('A'+numFila+':D'+numFila);
    celdas.setValues([[datos.nombre, datos.apellido,datos.correo, datos.telefono]]);
}

function importarContactos()
{
    let url = 'https://randomuser.me/api/?results=5&inc=name,email,phone,picture';
    let respuesta = UrlFetchApp.fetch(url).getContentText();
    let datos = JSON.parse(respuesta)
    datos.results.forEach(insertarContactoJSON);
}

function insertarContactoJSON(contacto)
{
  HOJA.appendRow([contacto.name.first,contacto.name.last,contacto.email, contacto.phone, contacto.picture.large]);
}