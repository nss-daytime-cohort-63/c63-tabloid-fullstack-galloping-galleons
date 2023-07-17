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
        postCategory(category);
        navigate("/categories");
    }



    return <>
        <h2>New Category</h2>
        <input type="text"  placeholder="Category Name..." onChange=
        {
            e => {
                const categoryCopy={...category}
                categoryCopy.Name = e.target.value;
                setCategory(categoryCopy);
            }
        } />

    </>
}