import UploadFile from '@/components/blocks/upload-file';
import { TbCloudUpload } from "react-icons/tb";
import './style.scss';

const UploadFilePage = () => {
    return (
        <div className='upload-file'>
            <div className='upload-file-heading-container'>
                <h1 className='upload-file-heading'>Upload File</h1>
                <TbCloudUpload className='upload-icon' />
            </div>
            <UploadFile />
        </div>
    )
}

export default UploadFilePage;
