import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({ options }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleSelectOption = (option) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
    };

    const handleToggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    return (
        <div className="dropdown-container" ref={dropdownRef}>
            <div className="dropdown-select" onClick={handleToggleDropdown}>
                {selectedOption || 'Select an option'}
            </div>
            {isDropdownOpen && (
                <div className="dropdown-menu">
                    {options.map((option) => (
                        <div
                            key={option}
                            className="dropdown-menu-item"
                            onClick={() => handleSelectOption(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
            {/* {selectedOption && <p>You selected: {selectedOption}</p>} */}
        </div>
    );
};
export default Dropdown;