import M from 'materialize-css';

document.addEventListener('DOMContentLoaded', function () {
  let elems = document.querySelectorAll('.datepicker');
  let instances = M.Datepicker.init(elems, {});
});

export const PickerForm: React.FC = () => {
  return (
    <div className="input-field mt2">
      <input
        type="text"
        className="datepicker"
        id="datepicker"
        placeholder="Выберите дату"
      ></input>
      <label htmlFor="datepicker" className="active">
        Выберите дату
      </label>
    </div>
  );
};
