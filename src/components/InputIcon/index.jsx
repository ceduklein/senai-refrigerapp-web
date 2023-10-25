import { InputText } from 'primereact/inputtext';

export function InputIcon(props) {
  return (
    <div className="form-group" style={{marginTop: '20px'}}>
      <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
            <i className={props.primeIcon} ></i>
        </span>
        <InputText placeholder={props.placeholder} value={props.value} 
          onChange={props.onChange} type={props.type}/>
      </div>
    </div>
  )
}