import { Card, CardBody } from "reactstrap";
import { deleteCategory } from "../modules/categoryManager";
import { useNavigate } from "react-router-dom";

const Category = ({ category }) => {
    return <Card>
        <CardBody>{category.name}</CardBody>
    </Card>
}

export default Category;