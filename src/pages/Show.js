import { useState, useEffect } from 'react';
// import { Redirect } from 'react-router-dom';
function Show({ match, people, updatePeople, deletePeople, history }) {
    // if(!user) return <Redirect to="/login" />
    const [ editForm, setEditForm ] = useState({
        name: '',
        title: '',
        image: ''
    });

    const [person, setPerson] = useState(null)

    useEffect(() => {
      if(people) {
        const id = match.params.id;
        const foundPerson = people.find(p => p._id === id);
        setEditForm(foundPerson)
        setPerson(foundPerson)

      }
    }, [people, match])

    const loading = () => {
        return <h1>Loading ...</h1>
    }

    // UI that shows a person
    const loaded = () => {
        return (
            <div className="person">
                <h1>{person.name}</h1>
                <h2>{person.title}</h2>
                <img src={person.image} alt={person.name} />
                <br />
                <button id="delete" onClick={() => handleDelete(person._id)}>Delete Shinobi :(</button>
            </div>
        )
    }
    const handleChange = (event) => {
      setEditForm({...editForm, [event.target.name]: event.target.value });
    }
    const handleSubmit = (event) => {
      event.preventDefault();
      const {_id, name, title, image} = editForm;
      updatePeople({name, title, image}, _id)
    }

    const handleDelete = (id) => {
      deletePeople(id);
      history.push('/');

    }
    return (
        <div>
            {person ? loaded() : loading()}
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={editForm.name} onChange={handleChange} />
                <input type="text" name="title" value={editForm.title} onChange={handleChange} />
                <input type="text" name="image" value={editForm.image} onChange={handleChange} />
                <input type="submit" value="Edit Shinobi" />
            </form>
        </div>
    );
}
export default Show;