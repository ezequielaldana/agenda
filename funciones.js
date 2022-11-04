function doGet()
{
    return HtmlService.createTemplateFromFile('web').evaluate().setTitle('Agenda Google App Script');
}

function obtenerDatosHTML(nombre){
   return HtmlService.createHtmlOutputFromFile(nombre).getContent();
}