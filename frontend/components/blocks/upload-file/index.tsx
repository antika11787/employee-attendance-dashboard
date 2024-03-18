'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import DropzoneInput from '@/components/elements/dropzoneInput';
import { MdCloudDone } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { UploadFileApi } from "@/apiEndpoints/fileApi";
import { useDispatch } from "react-redux";
import { saveFileID } from "@/redux/slices/FileSlice";
import './index.scss';
import { FileState } from '@/types/interface';

const UploadFile = () => {
    const router = useRouter();
    const [file, setFile] = useState<any>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const storedId = localStorage.getItem("_id");
        if (storedId) {
            dispatch(saveFileID({ _id: storedId }));
        }
    }, [file]);

    return (
        <div className="upload-wrapper">
            <div className='upload-container'>
                <DropzoneInput
                    labelHeading="Drag & Drop"
                    labelSub="Your files here or browse to upload"
                    labelLimit="Upload only excel files with max size 25 MB"
                    setFile={setFile}
                />
            </div>
            <div className='uploaded-image'>
                {file ? (
                    <>
                        <div className='excel-file-container'>
                            <div className='excel-file' onClick={async () => {
                                const formData = new FormData();
                                formData.append("file", file);

                                const response = await UploadFileApi(formData)
                                localStorage.setItem("_id", response._id);
                                dispatch(saveFileID({ _id: response._id }));
                                router.push('/dashboard');
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
