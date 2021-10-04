
import { ReactComponent as UploadPlaceHolder } from '../../../../../core/assets/images/upload-placeholder.svg';
import './styles.scss';

function ImageUpload() {
    return (
        <div className="row">
            <div className="col-6">
                <div className="upload-button-container">
                    <input 
                        type="file"
                        id="upload"
                        hidden
                    />
                    <label htmlFor="upload">ADICIONAR IMAGEM</label>
                </div>
                <small className="upload-text-helper text-primary">
                    As imagens devem ser JPG ou PNG e não devem ultrapassar<strong> 5 mb</strong>.
                </small>
            </div>
            <div className="col-6 upload-placeholder">
               <UploadPlaceHolder />
               <div className="upload-progress-container">
                   <div className="upload-progress">

                   </div>
               </div>
            </div>
        </div>
    );
}

export default ImageUpload;