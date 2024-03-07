'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import DropzoneInput from '@/components/elements/dropzoneInput';
import { MdCloudDone } from "react-icons/md";
import Helper from '@/utils/helper';
import { useRouter } from 'next/navigation';
import './index.scss';

const UploadFile = () => {
    const router = useRouter();
    const { readExcelFile } = Helper();
    const [file, setFile] = useState<any>(null);
    const [excelData, setExcelData] = useState<any>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event?.target?.files?.[0];
        const data = await readExcelFile(file);
        setExcelData(data);
    };

    if (file) {
        console.log("file", file);
    }
    return (
        <div className="upload-wrapper">
            <div className='upload-container'>
                <DropzoneInput
                    labelHeading="Drag & Drop"
                    labelSub="Your files here or browse to upload"
                    labelLimit="Upload only excel files with max size 15 MB"
                    setFile={setFile}
                    onChange={handleFileChange}
                />
            </div>
            <div className='uploaded-image'>
                {file ? (
                    <>
                        <div className='excel-file-container'>
                            <div className='excel-file' onClick={() => {
                                router.push('/')
                            }}>
                                <Image
                                    src={'/excel.png'}
                                    width={40}
                                    height={40}
                                    alt="excel-file"
                                    className="excel-file-image"
                                />
                                <div className='excel-file-info'>
                                    <p className='excel-file-name'>{file.name}</p>
                                    <p className='excel-file-size'>{file.size / 1000} KB</p>
                                </div>
                            </div>
                            <MdCloudDone className='upload-success' />
                        </div>
                        {/* <div>
                            <h2>Excel Data:</h2>
                            <pre>{JSON.stringify(excelData, null, 2)}</pre>
                        </div> */}
                    </>
                ) : (
                    <div className='excel-file-none'>
                        <p className='excel-file-text'>File will appear here. Click on the file to see the graphs.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UploadFile;
