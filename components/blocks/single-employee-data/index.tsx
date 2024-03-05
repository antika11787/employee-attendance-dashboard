'use client';

import './index.scss';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Helper from '@/utils/helper';
import { BsFilterRight } from "react-icons/bs";

const SingleEmployeeData = () => {
    const { getInitials, getColor } = Helper();
    const { id } = useParams();

    const [selectedYear, setSelectedYear] = useState('2024');
    const [selectedMonth, setSelectedMonth] = useState('january');

    const handleChangeYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(event.target.value);
    };

    const handleChangeMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(event.target.value);
    };

    return (
        <div className="single-employee-data">
            <div className='image-name'>
                <div className="initial-circle" style={{ backgroundColor: getColor(getInitials("Alice Doe")) }}>
                    {getInitials("Alice Doe")}
                </div>
                <h1 className='employee-name'>Alice Doe</h1>
            </div>
            <div className='filter-wrapper'>
                <div className='filters'>
                    <BsFilterRight className='filter-icon' />
                    <p className='filters-text'>Filters</p>
                </div>
                <select value={selectedYear} onChange={handleChangeYear} className="single-employee-dropdown">
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                </select>
                <select value={selectedMonth} onChange={handleChangeMonth} className="single-employee-dropdown">
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                </select>
            </div>
        </div>
    )
}

export default SingleEmployeeData;
