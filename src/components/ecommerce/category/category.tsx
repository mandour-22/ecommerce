import { TCategories } from "@types";
import { Link } from "react-router-dom";
import "./styles.modules.css";

const category = ({ title, img, prefix }: TCategories) => {
  return (
    <div className="category w-100">
      <Link to={`/categories/product/${prefix}`} className="link">
        <div className="categoryImg ">
          <img src={img} alt={title} />
        </div>
        <h4 className="categoryTitle">{title}</h4>
      </Link>
    </div>
  );
};

export default category;
