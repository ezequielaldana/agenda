const HOJA = SpreadsheetApp.openById('1EyF9A6jJZEaEETzHmLYO-IBDRYgk_esChjjVBwMDdwE').getActiveSheet();
const CARPETA = DriveApp.getFolderById('1kyRTBnse6GSurKnnklVoHIDk7YPBXpBG');
const CABECERA_URL_IMAGEN_DRIVE = 'https://drive.google.com/uc?export=view&id='

function doGet(datos)
{
    return HtmlService.createTemplateFromFile('web').evaluate().setTitle('Agenda Google App Script');
}

function doPost(datos)
{   
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

function insertarContacto(contacto, imagen)
{
    if(imagen)
    {
        let blob= Utilities.newBlob(imagen.datos, imagen.tipo, imagen.nombre);
        let archivo = CARPETA.createFile(blob);
        contacto.imagen = CABECERA_URL_IMAGEN_DRIVE+archivo.getId();
    }

    HOJA.appendRow([contacto.nombre,contacto.apellido,contacto.correo,contacto.telefono, contacto.imagen]);

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