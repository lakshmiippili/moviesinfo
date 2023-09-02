import React,{useRef} from 'react'
import classes from './AddMovie.module.css'
const AddMovie =(props)=>{
    const titleRef = useRef('')
    const openingTextRef = useRef('')
    const releaseDateRef = useRef('')
    const submitHandler =(event)=>{
        event.preventDefault()
        const movie={
            title:titleRef.current.value,
            openingText:openingTextRef.current.value,
            releaseDate:releaseDateRef.current.value
        }
        titleRef.current.value = ''
        openingTextRef.current.value = ''
        releaseDateRef.current.value = ''
        props.onAddNewMovie(movie)
    }
    return (<form onSubmit={submitHandler}>
        <div className={classes.control}>
            <label htmlFor='title'>Title</label>
            <input type='text' id='title' ref={titleRef}></input>
        </div>
        <div className={classes.control}>
            <label htmlFor='openingtext'>Opening Text</label>
            <input type='text' id='openingtext' ref={openingTextRef}></input>
        </div>
        <div className={classes.control}>
            <label htmlFor='releasedate'>Release Date</label>
            <input type='text' id='releasedate' ref={releaseDateRef}></input>
        </div>
        <button>Add Movie</button>
    </form>)
}

export default AddMovie