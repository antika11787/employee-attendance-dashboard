import Search from '@/components/searchbar';
import './style.scss'
import EmployeeList from '@/components/employee-list';

const EmployeeListPage = () => {
    return (
        <div className='employee-list-page'>
            <div className='searchbar'>
                <h3>Search Employee</h3>
                <Search />
            </div>
            <div className='employee-list-container'>
                <EmployeeList />
            </div>
        </div>
    )
}

export default EmployeeListPage;
