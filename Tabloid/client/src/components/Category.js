import { deleteCategory } from "../modules/categoryManager";

const Category = ({category}) => {
    return <><h4>{category.id}</h4><p>{category.name}</p><button onClick={e => {
        e.preventDefault();
        deleteCategory(category.id);
    } }>Delete</button></>
}

export default Category;