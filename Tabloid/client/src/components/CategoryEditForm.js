import { useEffect, useState } from "react";
import { getCategoryById } from "../modules/categoryManager";
import { useParams } from "react-router-dom";

const CategoryEditForm = () => {
    const { id } = useParams();

    const [category, setCategory] = useState({ id: id, name: "" });

    useEffect(() => {
        getCategoryById(id).then(category => setCategory(category));
    }, []);

    return <>
        <input type="text" defaultValue={category.name} placeholder="Category Name..." onChange={
            e => {
                const tempCat = { ...category };
                tempCat.name = e.target.value;
                setCategory(tempCat);
            }
        } />
    </>
}
export default CategoryEditForm;