import { useSliceSelector, useSliceStore } from './utils/reduxHelper';

export default function FormSettings() {
  const store = useSliceStore('app');
  let [formSettings] = useSliceSelector('app', ['formSettings']);
  formSettings = formSettings ?? {};

  function setFormSettings(data) {
    let { formSettings } = store.getState();
    formSettings = formSettings ?? {};
    store.setState({
      formSettings: { ...formSettings, ...data }
    })
  }

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-3">
          <label className="mb-1">Width:</label>
          <input
            className="form-control"
            value={formSettings.width ?? ''}
            onChange={e => setFormSettings({ width: e.target.value })}
          />
        </div>
        <div className="col-3">
          <label className="mb-1">Max width:</label>
          <input
            className="form-control"
            value={formSettings.maxWidth ?? ''}
            onChange={e => setFormSettings({ maxWidth: e.target.value })}
          />
        </div>
        <div className="col-3">
          <label className="mb-1">Margin:</label>
          <input
            className="form-control"
            value={formSettings.margin ?? ''}
            onChange={e => setFormSettings({ margin: e.target.value })}
          />
        </div>
        <div className="col-3">
          <label className="mb-1">Padding:</label>
          <input
            className="form-control"
            value={formSettings.padding ?? ''}
            onChange={e => setFormSettings({ padding: e.target.value })}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-3">
          <label className="mb-1">Border:</label>
          <input
            className="form-control"
            value={formSettings.border ?? ''}
            onChange={e => setFormSettings({ border: e.target.value })}
          />
        </div>
        <div className="col-3">
          <label className="mb-1">Border radius:</label>
          <input
            className="form-control"
            value={formSettings.borderRadius ?? ''}
            onChange={e => setFormSettings({ borderRadius: e.target.value })}
          />
        </div>
        <div className="col-3">
          <label className="mb-1">Background color:</label>
          <input
            className="form-control"
            value={formSettings.backgroundColor ?? ''}
            onChange={e => setFormSettings({ backgroundColor: e.target.value })}
          />
        </div>
        <div className="col-3">
          <label className="mb-1">Row border:</label>
          <input
            className="form-control"
            value={formSettings.rowBorder ?? ''}
            onChange={e => setFormSettings({ rowBorder: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}