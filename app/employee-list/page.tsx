import Search from '@/components/elements/searchbar';
import './style.scss'
import EmployeeList from '@/components/blocks/employee-list';
import januaryCheckIns from '@/data/januaryCheckIns';

const EmployeeListPage = () => {
    return (
        <div className='employee-list-page'>
            <h2 className='employee-list-heading'>Employee List</h2>
            <div className='searchbar'>
                {/* <h3>Search Employee</h3> */}
                <Search placeholder='Search Employee' />
            </div>
            <div className='employee-list-wrapper'>
                <EmployeeList employees={januaryCheckIns} />
            </div>
        </div>
    )
}

export default EmployeeListPage;
