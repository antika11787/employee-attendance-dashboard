'use client';

import { useEffect, useState } from 'react';
import './index.scss';
import { FileHistoryApi } from '@/apiEndpoints/fileApi';
import { FileHistoryData } from '@/types/interface';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
import { saveFileID } from "@/redux/slices/FileSlice";
import Helper from '@/utils/helper';
import Search from '@/components/elements/searchbar';

const FileHistory = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { formatTimestamp } = Helper();
    const [files, setFiles] = useState<FileHistoryData[]>([]);

    useEffect(() => {
        FileHistoryApi().then((response) => {
            setFiles(response);
        })
    }, [])

    return (
        <div className='file-history-container'>
            <div className='file-history-heading-container'>
                <h1 className='file-history-heading'>File History</h1>
                <Search searchbarContainer='searchbar-container'
                    searchInputContainer='search-input-container'
                    searchInput='search-input'
                    searchIcon='search-icon'
                    placeholder='Search file...' />
            </div>
            <div className='files-container'>
                {files && files.length > 0 ? (
                    files.map((file: FileHistoryData) => {
                        return (
                            <div key={file._id} className='file'>
                                <div className='file-icon-name'>
                                    <Image src={'/excel.png'} alt="file-icon" width={20} height={20} />
                                    <p className='file-name'>{file.file_name}</p>
                                </div>
                                <div className='file-date-actions'>
                                    <p className='file-size'>{file.size} KB</p>
                                    <p className='file-date'>{formatTimestamp(file.createdAt)}</p>
                                    <p className='view'
                                        onClick={() => {
                                            localStorage.setItem("_id", file._id);
                                            dispatch(saveFileID({ _id: file._id }));
                                            router.push('/dashboard')
                                        }}>View Graphs</p>
                                    <p className='delete'>Delete</p>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <p>No file found</p>
                )}
            </div>
        </div>
    )
}

export default FileHistory;
