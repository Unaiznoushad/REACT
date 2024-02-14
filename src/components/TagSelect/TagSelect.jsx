import React from 'react';
import CreatableSelect from 'react-select/creatable';
import './TagSelect.css'

const createOption = (label) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ''),
});

const TagSelect = (props) => {
    const { value, setValue } = props

    React.useEffect(() => {
        console.log("new value", value)
    }, [value])

    // const options = [{ label: "Project A", value: "ProjectA" }, { label: "Project B", value: "ProjectB" }]
    function tagChanging(tagData) {
        console.log("tagData", tagData)

        // const { name, value } = event.target
        // setToDos((prev) => ({
        //     ...prev, [name]: value
        // }))
    }

    const handleCreate = (inputValue) => {
        console.log("handleCreate", inputValue)
        const newOption = createOption(inputValue)
        props.setTagOptions((prevTags) => [newOption, ...prevTags])
        setValue((prevState) => [...prevState, newOption])
    }
    return (
        <div className='tag-select-container'>
            <CreatableSelect isMulti options={props.tagOptions} name='tag'
                // getOptionValue={(values) => { console.log("getOptionValue", values) }}
                onChange={(newValue) => setValue(newValue)}
                onCreateOption={handleCreate}
                isClearable={false}
                value={value}
            />
        </div>
    )
}

export default TagSelect