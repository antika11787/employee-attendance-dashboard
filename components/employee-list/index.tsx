import './index.scss';
import Image from 'next/image';

const EmployeeList = () => {
    const getInitials = (name: string) => {
        const initials = name.split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase();
        return initials;
    }

    // Function to generate a color based on the initial letter
    const getColor = (initial: string) => {
        // You can define your logic here to assign colors based on initials
        const colors = ['#ff5733', '#33ff57', '#5733ff', '#ffff33', '#33ffff'];
        const index = initial.charCodeAt(0) % colors.length;
        return colors[index];
    }
    return (
        <div className='employee-list'>
            <h4 className='employee-list-heading'>Employee List</h4>
            <table className='employee-list-table'>
                <thead className='employee-list-table-header'>
                    <tr className='employee-list-table-row'>
                        <th className='employee-list-table-data'>Name</th>
                        <th className='employee-list-table-data'>ID</th>
                        <th className='employee-list-table-data'>Action</th>
                    </tr>
                </thead>
                <hr className='horizontal-line'></hr>
                <tbody className='employee-list-table-body'>
                    <tr className='employee-list-table-row-data'>
                        <td className='employee-list-table-data'>
                            <div className="circle" style={{ backgroundColor: getColor('J') }}>
                                {getInitials('John Doe')}
                            </div>
                            John Doe
                        </td>
                        <td className='employee-list-table-data'>12345</td>
                        <td className='employee-list-table-data'>View</td>
                    </tr>
                    <tr className='employee-list-table-row-data'>
                        <td className='employee-list-table-data'>
                            <div className="circle" style={{ backgroundColor: getColor('J') }}>
                                {getInitials('No Name')}
                            </div>
                            No Name
                        </td>
                        <td className='employee-list-table-data'>12345</td>
                        <td className='employee-list-table-data'>View</td>
                    </tr>
                    <tr className='employee-list-table-row-data'>
                        <td className='employee-list-table-data'>
                            <div className="circle" style={{ backgroundColor: getColor('J') }}>
                                {getInitials('John Doe')}
                            </div>
                            John Doe
                        </td>
                        <td className='employee-list-table-data'>12345</td>
                        <td className='employee-list-table-data'>View</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default EmployeeList;
