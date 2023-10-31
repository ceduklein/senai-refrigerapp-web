import { Dialog } from 'primereact/dialog';
import { FiAlertCircle, FiCheckCircle, FiXCircle } from 'react-icons/fi';

export function Modal(props) {
  const { title, content, showDialog, closeDialog, onConfirm, showChildren, confirmButtonText, closeButtonText } = props;

  const dialogHeader = () => {
    return(
      <span style={{ cursor: 'default' }}>
        <FiAlertCircle size={30} color={'red'} style={{marginRight: 20}} />
        { title }
      </span>
    )
  }

  const dialogFooter = () => {
    return(
      <div>
        <button type="button" className="btn btn-success" style={{marginRight: '30px'}}
          onClick={ e => onConfirm() }>
          <FiCheckCircle size={16} style={{marginTop:'-3px'}} /> { confirmButtonText }
        </button>
        <button type="button" className="btn btn-danger" onClick={ closeDialog }>
          <FiXCircle size={16} style={{marginTop:'-3px'}} /> { closeButtonText }
        </button>
      </div>
    )
  }

  return(
      <Dialog header={ dialogHeader } 
        visible={ showDialog } 
        style={{ width: '50vw' }} 
        onHide={ closeDialog } 
        footer={ dialogFooter }
      >  
        { showChildren ? props.children : content }
      </Dialog>
  )
}