import { useEffect, useState } from "react"
import Category from "./Category"
import { deleteCategory, getCategories } from "../modules/categoryManager"
import { Link, useNavigate } from "react-router-dom"

const CategoryList = () => {
    const navigate = useNavigate();

    const loadingCategory = { id: -1, name: "Loading Categories..." }
    const [categories, setCategories] = useState([loadingCategory])

    const getAndSetCategories = () => {
        getCategories().then(categories => setCategories(categories))
    }

    useEffect(() => {
        getAndSetCategories();
    }, [])

    return <div>
        <Link to="add">Create New</Link>
        <div>
            {
                categories.map(
                    category => {
                        return <div className="d-inline-block w-25 flex-row" key={category.id}>
                            <Category category={category} />
                            <button onClick={e => {
                                e.preventDefault();
                                deleteCategory(category.id);
                                getAndSetCategories();
                            }}>Delete</button>
                            <button onClick={e => {
                                e.preventDefault();
                                navigate(`edit/${category.id}`)
                            }}>Edit</button>
                        </div>

                    }
                )
            }
        </div>
    </div>
}

export default CategoryList;