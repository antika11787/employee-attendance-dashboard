'use client';

import Breadcrumb from '@/components/elements/breadcrumb';
import { useParams } from 'next/navigation';
import '../style.scss';
import SingleEmployeeData from '@/components/blocks/single-employee-data';
import SingleEmployeeCharts from '@/components/blocks/single-employee-charts';
import Comparison from '@/components/blocks/comparison';

const EmployeePage = () => {
    const { id } = useParams();
    console.log(id)

    const breadcrumbItems = [
        { text: 'Dashboard', href: '/' },
        { text: 'Employee List', href: '/employee-list' },
        { text: `${id}`, href: `/employee-list/${id}` },
    ];

    return (
        <div className="single-employee-page">
            <Breadcrumb items={breadcrumbItems} />
            <SingleEmployeeData />
            <SingleEmployeeCharts />
            <Comparison />
        </div>
    )
}

export default EmployeePage;
