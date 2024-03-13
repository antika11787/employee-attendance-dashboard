'use client';

import './index.scss';
import Helper from '@/utils/helper';
import Link from 'next/link';
import { FaEye } from "react-icons/fa";
import { GetAllEmployeesApi } from '@/apiEndpoints/employeeApi';
import { FileResponse, FileState } from '@/types/interface';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const EmployeeList = () => {
    const { getInitials, getColor } = Helper();
    const [data, setData] = useState<FileResponse[]>([]);
    const fileId = useSelector((state: FileState) => state.file._id);

    useEffect(() => {
        const fetchData = async () => {
            const response = await GetAllEmployeesApi(fileId);
            setData(response.file);
        };
        fetchData();
    }, [])
    console.log(data)
    return (
        <div className='employee-list-container'>
            <table className='employee-list-table'>
                <thead className='table-header'>
                    <tr className='table-row'>
                        <th className='column-id'>ID</th>
                        <th className='column-name'>Name</th>
                        <th className='column-worked-hours'>Worked Hours<br></br>(Avg)</th>
                        <th className='column-late-hours'>Late Hours<br></br>(Avg)</th>
                        <th className='column-early-leave-hours'>Early Leave Hours<br></br>(Avg)</th>
                        <th className='column-overtime'>Overtime<br></br>(Avg)</th>
                        <th className='column-action'>Action</th>
                    </tr>
                </thead>
                <tbody className='table-body'>
                    {data.map(emp => (
                        <tr key={emp.employee_id} className='table-row'>
                            <td className='column-id'>{emp.employee_id}</td>
                            <td className='initial column-name'>
                                <div className="initial-circle" style={{ backgroundColor: getColor(getInitials(emp.employee)) }}>
                                    {getInitials(emp.employee)}
                                </div>
                                <p className='employee-name'>{emp.employee}</p>
                            </td>
                            <td className='column-worked-hours'>{emp.worked_hours}</td>
                            <td className='column-late-hours'>{emp.late_hours}</td>
                            <td className='column-early-leave-hours'>{emp.early_leave_hours}</td>
                            <td className='column-overtime'>{emp.over_time}</td>
                            <td className='column-action'>
                                <Link href={'/employee-list/' + emp.employee_id}>
                                    <FaEye className='eye-icon' />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default EmployeeList;
