import { useEffect, useState } from "react";
import { getCategoryById, updateCategory } from "../modules/categoryManager";
import { useNavigate, useParams } from "react-router-dom";

const CategoryEditForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [category, setCategory] = useState({ id: id, name: "" });

    useEffect(() => {
        getCategoryById(id).then(category => setCategory(category));
    }, []);

    return <>
        <h2>Edit Category</h2>
        <input type="text" defaultValue={category.name} placeholder="Category Name..." onChange={
            e => {
                const tempCat = { ...category };
                tempCat.name = e.target.value;
                setCategory(tempCat);
            }
        } />
        <button type="submit" onClick={e => {
            e.preventDefault();
            if(category.name.length >= 3 && category.name.length <= 50)
            {
                updateCategory(id, category);
                navigate("/categories")
            }
            else
            {
                window.alert("Name must be between 3 and 50 characters, inclusive.")
            }
        }}>Save Changes</button>
    </>
}
export default CategoryEditForm;