import CreatableSelect from 'react-select/creatable';
import './TagSelect.css'

const TagSelect = (setToDos, toDo) => {

    const options = [{ label: "Project A", value: "ProjectA" }, { label: "Project B", value: "ProjectB" }]
    function tagChanging(event) {
        const { name, value } = event.target
        setToDos((prev) => ({
            ...prev, [name]: value
        }))
    }

    return (
        <div className='tag-select-container'>
            <CreatableSelect isClearable options={options} onChange={tagChanging} name='tag' value={toDo.tag} />
        </div>
    )
}

export default TagSelect