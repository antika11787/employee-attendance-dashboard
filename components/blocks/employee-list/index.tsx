import './index.scss';
import Helper from '@/utils/helper';
import Link from 'next/link';
import { FaEye } from "react-icons/fa";

interface Employee {
    Employee: string;
    "Employee ID": number;
    "Check In": string;
    "Worked Hours (H.M)": number;
    "Late Hours (H.M)": number;
    "Early Leave Hours (H.M)": number;
    "Over Time (H.M)": number;
}

const EmployeeList = ({ employees }: { employees: Employee[] }) => {
    const { getInitials, getColor } = Helper();

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
                    {employees.map(employee => (
                        <tr key={employee["Employee ID"]} className='table-row'>
                            <td className='column-id'>{employee["Employee ID"]}</td>
                            <td className='initial column-name'>
                                <div className="initial-circle" style={{ backgroundColor: getColor(getInitials(employee.Employee)) }}>
                                    {getInitials(employee.Employee)}
                                </div>
                                <p className='employee-name'>{employee.Employee}</p>
                            </td>
                            <td className='column-worked-hours'>{employee["Worked Hours (H.M)"]}</td>
                            <td className='column-late-hours'>{employee["Late Hours (H.M)"]}</td>
                            <td className='column-early-leave-hours'>{employee["Early Leave Hours (H.M)"]}</td>
                            <td className='column-overtime'>{employee["Over Time (H.M)"]}</td>
                            <td className='column-action'>
                                <Link href={'/employee-list/' + employee["Employee ID"]}>
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
