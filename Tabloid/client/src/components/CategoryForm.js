import { useState } from "react"
import { postCategory } from "../modules/categoryManager";
import { useNavigate } from "react-router-dom";

const CategoryForm = () => {
    const navigate = useNavigate();

    const [category, setCategory] = useState({
        Name: ""
    });

    const saveCategoryButtonHandler = (e) => {
        e.preventDefault();
        if(category.Name !== "" || category.Name !== null){
            if(category.Name.length <= 50 && category.Name.length >= 3)
            {
                postCategory(category);
                navigate("/categories");
            }
            else{
                window.alert("Enter a valid name for the category.")
            }
        }
        else{
            window.alert("Enter a valid name for the category.")
        }
    }



    return <>
        <h2>New Category</h2>
        <input required minLength={3} maxLength={50} type="text"  placeholder="Category Name..." onChange=
        {
            e => {
                const categoryCopy={...category}
                categoryCopy.Name = e.target.value;
                setCategory(categoryCopy);
            }
        } />
        <button type="submit" onClick={e => {saveCategoryButtonHandler(e)} }>Submit</button>
    </>
}
export default CategoryForm;