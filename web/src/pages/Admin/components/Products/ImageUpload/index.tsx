import React, { useState } from 'react';

import { PrivateRequestApi } from 'core/utils/api';

import { ReactComponent as UploadPlaceHolder } from '../../../../../core/assets/images/upload-placeholder.svg';
import './styles.scss';
import { toast } from 'react-toastify';

type Props = {
    onUploadSuccess: (imgUrl: string) => void;
    productImgUrl?: string;
}

function ImageUpload({ onUploadSuccess, productImgUrl }: Props) {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedImgUrl, setUploadedImgUrl] = useState('');
    const imgUrl = uploadedImgUrl || productImgUrl;

    function onUploadProgress(progressEvent: ProgressEvent) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(progress);
    }

    function uploadImage(selectedImage: File) {
        const payload = new FormData();
        payload.append('file', selectedImage);

        PrivateRequestApi({
            url: '/products/image',
            method: 'POST',
            data: payload,
            onUploadProgress
        })
            .then((response) => {
                setUploadedImgUrl(response.data.uri);
                onUploadSuccess(response.data.uri);
            })
            .catch(() => {
                toast.error("Error ao enviar o arquivo!");
            })
            .finally(() => setUploadProgress(0));
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const selectedImage = event.target.files?.[0];

        if (selectedImage) {
            uploadImage(selectedImage);
        }
    }

    return (
        <div className="row">
            <div className="col-6">
                <div className="upload-button-container">
                    <input
                        type="file"
                        id="upload"
                        hidden
                        accept="image/png, image/jpg"
                        onChange={handleChange}
                    />
                    <label htmlFor="upload">ADICIONAR IMAGEM</label>
                </div>
                <small className="upload-text-helper text-primary">
                    As imagens devem ser JPG ou PNG e não devem ultrapassar<strong> 5 mb</strong>.
                </small>
            </div>
            <div className="col-6 upload-placeholder">
                {
                    uploadProgress > 0 && (
                        <>
                            <UploadPlaceHolder />
                            <div className="upload-progress-container">
                                <div
                                    className="upload-progress"
                                    style={{ width: `${uploadProgress}%` }}
                                >

                                </div>
                            </div>
                        </>
                    )
                }
                {(imgUrl && uploadProgress === 0) && (
                    <img
                        src={imgUrl}
                        alt={imgUrl}
                        className="uploaded-image"
                    />
                )
                }
            </div>
        </div>
    );
}

export default ImageUpload;