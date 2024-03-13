import React from 'react';
import CreatableSelect from 'react-select/creatable';
import './TagSelect.css'

const createOption = (label) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ''),
})

const TagSelect = (props) => {
    const { value, setValue } = props
    const handleCreate = (inputValue) => {
        const newOption = createOption(inputValue)
        // props.setTagOptions((prevTags) => [newOption, ...prevTags]) 
        setValue((prevState) => ([newOption, ...prevState]))
    }
    return (
        <div className='tag-select-container'>
            <CreatableSelect isMulti options={props.tagOptions} name='tag'
                onChange={(newValue) => setValue(newValue)}
                onCreateOption={handleCreate}
                isClearable={true}
                value={value}
                className='react-select-tag'
                placeholder="Create or select tag"
                styles={{ control: (styles) => ({ ...styles, color: "black" }), option: (styles, { isFocused }) => { return { ...styles, backgroundColor: isFocused ? "white" : "white" } } }}

            />
        </div>
    )
}

export default TagSelect;