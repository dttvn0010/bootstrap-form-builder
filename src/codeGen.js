
function generateFieldHtml(field) {
  if(!field) return '';
  let tab = '      ';
  let style = '';
  
  if(field.width) {
    style += `width:${field.width};`;
  }

  if(field.maxWidth) {
    style += `max-width:${field.maxWidth};`;
  }

  if(field.padding){
    style += `margin:${field.padding};`;
  }

  if(field.fieldType === '1') {
    if(field.fontSize) {
      style += `font-size:${field.fontSize}px;`;
    }
    if(field.fontWeight) {
      style += `font-weight:${field.fontWeight};`;
    }
  
    return tab + `<label${style?` style="${style}"`: ''}>${field.fieldLabel??''}</label>\n`;
  }

  if(field.fieldType === '2') {
    let className = 'btn';
    if(field.size === 'small'){
      className += ' btn-sm';
    }
    if(field.variant) {
      className += ` btn-${field.variant}`;
    }
    
    return tab + `<button${style?` style="${style}"`: ''} class="${className}">${field.fieldLabel??''}</button>\n`;
  }

  if(field.fieldType === '3') {
    let html = tab + `<div${style?` style="${style}"`: ''}>\n`;
    tab += '  ';
    
    if(field.fieldLabel) {
      html += tab + `<label class="mb-1${field.fieldLabelBold? ' bold': ''}">${field.fieldLabel}:</label>\n`;
    }

    const minValue = field.inputType === 'number' ? field.minValue: null;
    const maxValue = field.inputType === 'number' ? field.maxValue: null;
    
    html += tab + `<input${field.id?` name="${field.id}"`:''}${field.inputType?` type="${field.inputType}"`:''}${minValue?` min=${minValue}`:""}${maxValue?` max=${maxValue}`:""} class="form-control"/>\n`;
    html += tab.substr(0, 6) + '</div>\n';

    return html;
  }

  if(field.fieldType === '4') {
    let html = tab + `<div${style?` style="${style}"`: ''}>\n`;
    tab += '  ';

    if(field.fieldLabel) {
      html += tab + `<label class="mb-1${field.fieldLabelBold? ' bold': ''}">${field.fieldLabel}:</label>\n`;
    }

    html += tab + `<textarea${field.id?` name="${field.id}"`:''}${field.rows?` rows="${field.rows}"`:''} class="form-control"></textarea>\n`;
    html += tab.substr(0, 6) + '</div>\n';

    return html;
  }

  if(field.fieldType === '5') {
    let html = tab + `<div${style?` style="${style}"`: ''}>\n`;
    tab += '  ';

    if(field.fieldLabel) {
      html += tab + `<label class="mb-1${field.fieldLabelBold? ' bold': ''}">${field.fieldLabel}:</label>\n`;
    }

    html += tab + '<div class="mt-1">\n'
    html += tab + `  <input type="file"${field.id?` name="${field.id}"`:''} class="form-control"/>\n`;
    html += tab + '</div>\n';

    html += tab.substr(0, 6) + '</div>\n';

    return html;
  }

  if(field.fieldType === '6') {
    let html = tab + `<div${style?` style="${style}"`: ''}>\n`;
    tab += '  ';

    if(field.fieldLabel) {
      html += tab + `<label class="mb-1${field.fieldLabelBold? ' bold': ''}">${field.fieldLabel}:</label>\n`;
    }

    html += tab + `<select${field.id?` name="${field.id}"`:''} class="form-control">\n`;
    html += tab + `  <option value>---------</option>\n`;
    if(field.options){
      field.options.forEach(opt => 
        html += tab + `  <option value="${opt.value}">${opt.label}</option>\n`
      );
    }
    html += tab + `</select>\n`;
    html += tab.substr(0, 6) + '</div>\n';

    return html;
  }

  if(field.fieldType === '7' || field.fieldType === '8') {
    let html = tab + `<div${style?` style="${style}"`: ''}>\n`;
    tab += '  ';

    if(field.fieldLabel) {
      html += tab + `<label class="mb-1${field.fieldLabelBold? ' bold': ''}">${field.fieldLabel}:</label>\n`;
    }
    
    html += tab + `<div>\n`;
    tab += '  ';

    let inputType = field.fieldType === '7' ? 'radio' : 'checkbox';
    if(field.options){
      field.options.forEach(opt => {
          html += tab + `<span>\n`;
          html += tab + `  <input${field.id?` name="${field.id}"`:''} type="${inputType}" class="form-check-input"/>\n`;
          html += tab + `  <label class="me-3">${opt.label}</label>\n`;
          html += tab + `</span>\n`;
        } 
      );
    }
    html += tab.substr(0, 8) + `</div>\n`;
    html += tab.substr(0, 6) + '</div>\n';

    return html;
  }

  return '';
}

function generateColumnHtml(col){
  let tab = '    ';
  let html = tab + `<div class="col${col.width? "-" + col.width: ''}${col.offset? ` offset-${col.offset}`: ''}${col.field?.alignment?' text-' + col.field?.alignment: ''}">\n`;
  html += generateFieldHtml(col.field);
  html += tab + '</div>\n';
  return html;  
}

function generateRowHtml(row){
  let style = '';
  if(row.margin){
    style += `margin:${row.margin}!important;`;
  }
  if(row.padding) {
    style += `padding:${row.padding}!important;`;
  }
  let tab = '  ';
  let html = tab + `<div${style?` style="${style}"`:''} class="row gx-3 mt-2 px-2 pt-1 pb-2">\n`;
  let columns = row.columns ?? [];
  for(let i = 0; i < columns.length;i ++){
    html += generateColumnHtml(columns[i]);
    if(i+1 < columns.length) html += '\n';
  }

  html += tab + '</div>\n';
  return html;
}

export function genHtml(rows, formSettings) {
  rows = rows ?? [];
  formSettings = formSettings ?? {};

  let html = '<meta charset="UTF-8">\n';
  html += `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">\n\n`;
  html += `<style>\n`;
  html += `  .container{\n`;

  let fields = {
    width: 'width',
    maxWidth: 'max-width',
    margin: 'margin',
    padding: 'padding',
    border: 'border',
    borderRadius: 'border-radius',
    backgroundColor: 'background'
  };

  for(let [k, v] of Object.entries(fields)){
    if(formSettings[k]) {
      html += `    ${v}: ${formSettings[k]};\n`;
    }
  }
  
  html += `  }\n\n`;
  html += `  .bold{\n    font-weight: 550;\n  }\n`;

  if(formSettings.rowBorder) {
    html += `\n  .row{\n    border-bottom: ${formSettings.rowBorder};\n  }\n`;
  }
  html += `</style>\n\n`;

  html += `<div class="container">\n`;
  for(let i = 0; i < rows.length; i++) {
    html += generateRowHtml(rows[i]);
    if(i + 1 < rows.length) html += '\n';
  }
  html += `</div>`;
  return html;
}