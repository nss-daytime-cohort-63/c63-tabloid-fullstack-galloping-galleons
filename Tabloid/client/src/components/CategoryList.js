import { useEffect, useState } from "react"
import Category from "./Category"
import { getCategories } from "../modules/categoryManager"

const CategoryList = () => {
    const loadingCategory = {id: -1, name: "Loading Categories..."}
    const [categories, setCategories] = useState([loadingCategory])

    useEffect(() => {
        getCategories().then(categories => setCategories(categories))
    },[])

    return <div>
        {
            categories.map(
                category => {
                    return <Category category={category} key={category.id}/>
                }
            )
        }
    </div>
}

export default CategoryList;