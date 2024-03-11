import Search from '@/components/elements/searchbar';
import { RiShutDownLine } from "react-icons/ri";
import Image from 'next/image';
import './index.scss';

const Header = () => {
    return (
        <div className="header-wrapper">
            <div className='header-container'>
                <Search searchbarContainer='searchbar-container'
                    searchInputContainer='search-input-container'
                    searchInput='search-input'
                    searchIcon='search-icon'
                    placeholder='Search employee'
                />
                <div className='header-content'>
                    <div className='image-content'>
                        <Image src="/user.png" alt="check-in" width={38} height={38} />
                        <div className='admin-info'>
                            <p className='admin-name'>Partha Pratim Sarker</p>
                            <p className='admin-role'>Admin</p>
                        </div>
                    </div>
                    <div className='vertical-line'></div>
                    <RiShutDownLine className='shut-down' />
                </div>
            </div>
        </div>
    )
}

export default Header;
