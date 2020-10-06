const carboner = require('../index');

// These unit tests require LibreOffice installed on the running machine.
// Do not run these tests without it.

// To help speed things along, start up the carbone factories...
carboner.startFactory();

// Need a longer timeout if you are doing any pdf conversion
jest.setTimeout(30000);

describe('carbone-render', () => {

  it('should render carbone 2', async () => {
    const templatePath = require.resolve('./assets/template_carbone_2.docx');
    const data = require('./assets/contexts_carbone_2.json');
    const options = {};
    const result = await carboner.render(templatePath, data, options);

    expect(result).toBeTruthy();
    expect(result.report).toBeTruthy();
  });

  it('should convert carbone 2 to pdf', async () => {
    const templatePath = require.resolve('./assets/template_carbone_2.docx');
    const data = require('./assets/contexts_carbone_2.json');
    // demonstrates template substitution in generated file name.
    const options = {
      convertTo: 'pdf',
      reportName: '{d.title}.ext'
    };
    const result = await carboner.render(templatePath, data, options);

    expect(result).toBeTruthy();
    expect(result.reportName).toBe(`${data.title}.pdf`);
    expect(result.report).toBeTruthy();
  });

  it('should render html', async () => {
    const templatePath = require.resolve('./assets/template_attestation.html');
    const data = require('./assets/contexts_attestation.json');
    const options = {};
    // this template uses custom formatters, so this is a good test for that too...
    const formatters = {
      convTF: function(data) { return data ? 'Yes' : '___'; },
      sleepAreaSingle: function(data) {return data === 'SINGLE' ? 'Yes' : '___';},
      sleepAreaShared: function(data) {return data === 'SHARED' ? 'Yes' : '___';}
    };
    const result = await carboner.render(templatePath, data, options, formatters);

    expect(result).toBeTruthy();
    expect(result.report).toBeTruthy();
    // our html template is recognized by carbone 2 as xml, carbone 2 cannot convert xml to html
    // so we expect to fall back to carbone 1 here.
    expect(result.engine).toContain('carbone@1');
  });

  it('should convert html to pdf', async () => {
    // we know that carbone 2.1.1 cannot convert html to pdf
    // in order for this test to pass, it will have to revert to calling carbone 1.2.1 render

    const templatePath = require.resolve('./assets/template_attestation.html');
    const data = require('./assets/contexts_attestation.json');
    const options = {
      convertTo: 'pdf',
      reportName: '{d.confirmationId}.ext'
    };
    // this template uses custom formatters, so this is a good test for that too...
    const formatters = {
      convTF: function(data) { return data ? 'Yes' : '___'; },
      sleepAreaSingle: function(data) {return data === 'SINGLE' ? 'Yes' : '___';},
      sleepAreaShared: function(data) {return data === 'SHARED' ? 'Yes' : '___';}
    };
    const result = await carboner.render(templatePath, data, options, formatters);

    expect(result).toBeTruthy();
    expect(result.reportName).toBe(`${data.confirmationId}.pdf`);
    expect(result.report).toBeTruthy();
    expect(result.engine).toContain('carbone@1');
  });

  it('should render powerpoint', async () => {
    const templatePath = require.resolve('./assets/template_powerpoint.pptx');
    const data = require('./assets/contexts_dgrsc.json');
    const options = {};
    const result = await carboner.render(templatePath, data, options);

    expect(result).toBeTruthy();
    expect(result.report).toBeTruthy();
  });

  it('should convert powerpoint to pdf', async () => {
    const templatePath = require.resolve('./assets/template_powerpoint.pptx');
    const data = require('./assets/contexts_dgrsc.json');
    const options = {
      convertTo: 'pdf',
      reportName: 'filename.ext'
    };
    const result = await carboner.render(templatePath, data, options);

    expect(result).toBeTruthy();
    expect(result.reportName).toBe('filename.pdf');
    expect(result.report).toBeTruthy();
  });

  it('should render excel', async () => {
    const templatePath = require.resolve('./assets/template_movies.xlsx');
    const data = require('./assets/contexts_movies.json');
    const options = {};
    const result = await carboner.render(templatePath, data, options);

    expect(result).toBeTruthy();
    expect(result.report).toBeTruthy();
  });

  it('should convert excel to pdf', async () => {
    const templatePath = require.resolve('./assets/template_movies.xlsx');
    const data = require('./assets/contexts_movies.json');
    const options = {
      convertTo: 'pdf',
      reportName: 'filename.ext'
    };
    const result = await carboner.render(templatePath, data, options);

    expect(result).toBeTruthy();
    expect(result.reportName).toBe('filename.pdf');
    expect(result.report).toBeTruthy();
  });

  it('should render odt', async () => {
    const templatePath = require.resolve('./assets/template_information_sharing_agreement.odt');
    const data = require('./assets/contexts_dgrsc.json');
    const options = {};
    const result = await carboner.render(templatePath, data, options);

    expect(result).toBeTruthy();
    expect(result.report).toBeTruthy();
  });

  it('should convert odt to pdf', async () => {
    const templatePath = require.resolve('./assets/template_information_sharing_agreement.odt');
    const data = require('./assets/contexts_dgrsc.json');
    const options = {
      convertTo: 'pdf',
      reportName: 'filename.ext'
    };
    const result = await carboner.render(templatePath, data, options);

    expect(result).toBeTruthy();
    expect(result.reportName).toBe('filename.pdf');
    expect(result.report).toBeTruthy();
  });

  it('should render docx', async () => {
    const templatePath = require.resolve('./assets/template_information_sharing_agreement.docx');
    const data = require('./assets/contexts_dgrsc.json');
    const options = {};
    const result = await carboner.render(templatePath, data, options);

    expect(result).toBeTruthy();
    expect(result.report).toBeTruthy();
  });

  it('should convert docx to pdf', async () => {
    const templatePath = require.resolve('./assets/template_information_sharing_agreement.docx');
    const data = require('./assets/contexts_dgrsc.json');
    const options = {
      convertTo: 'pdf',
      reportName: 'filename.ext'
    };
    const result = await carboner.render(templatePath, data, options);

    expect(result).toBeTruthy();
    expect(result.reportName).toBe('filename.pdf');
    expect(result.report).toBeTruthy();
  });

  it('should render text', async () => {
    const templatePath = require.resolve('./assets/template_hello_world.txt');
    const data = require('./assets/contexts_hello_world.json');
    const options = {};
    const result = await carboner.render(templatePath, data, options);

    expect(result).toBeTruthy();
    expect(result.report).toBeTruthy();
  });

  it('should convert txt to pdf', async () => {
    const templatePath = require.resolve('./assets/template_hello_world.txt');
    const data = require('./assets/contexts_hello_world.json');
    const options = {
      convertTo: 'pdf',
      reportName: 'filename.ext'
    };
    const result = await carboner.render(templatePath, data, options);

    expect(result).toBeTruthy();
    expect(result.reportName).toBe('filename.pdf');
    expect(result.report).toBeTruthy();
  });


});
