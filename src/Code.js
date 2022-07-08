import SyntaxHighlighter from 'react-syntax-highlighter';
import ExportHtmlModal from './modal/ExportHtmlFormModal';
import { useSliceSelector, useSliceStore } from './utils/reduxHelper';
import { genHtml } from './codeGen';

export default function Code() {
  const store = useSliceStore('app');
  const [rows, formSettings] = useSliceSelector('app', ['rows', 'formSettings']);

  const html = genHtml(rows, formSettings);

  function copyToClipBoard() {
    navigator.clipboard.writeText(html);
  }

  function openExportHtmlModal() {
    store.setState({
      showExportHtmlModal: true
    })
  }

  function preview() {
    var win = window.open("", "Preview");
    win.document.body.innerHTML = html;
  }

  return (
    <div className="mt-3">
      <div>
        <button className="btn btn-success btn-sm"
          onClick={copyToClipBoard}
        >
          <i className="fas fa-copy"></i> Copy to clipboard
        </button>
        {" "}
        <button className="btn btn-success btn-sm"
          onClick={openExportHtmlModal}
        >
          <i className="fas fa-file-export"></i> Export to file
        </button>
        {" "}
        <button className="btn btn-success btn-sm"
          onClick={preview}
        >
          <i className="fas fa-binoculars"></i> Preview
        </button>
      </div>
      <SyntaxHighlighter language="javascript" className="mt-3">
        {html}
      </SyntaxHighlighter>
      <ExportHtmlModal />
    </div>
  );
}