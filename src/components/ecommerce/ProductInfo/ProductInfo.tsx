import "./styles.modules.css";

type TProductInfoProps = {
  title: string;
  img: string;
  price: number;
  direction?: "row" | "column";
  children?: React.ReactNode;
  style?: React.CSSProperties;
  quantity?: number;
};

// const { product, productImg, productInfo } = styles;
const ProductInfo = ({
  title,
  img,
  price,
  direction = "column",
  children,
  style,
  quantity,
}: TProductInfoProps) => {
  return (
    <>
      <div className={`product-${direction}`} style={style}>
        <div className={`productImg-${direction}`}>
          <img src={img} alt={title} />
        </div>
        <div className={`productInfo-${direction}`}>
          <h2>{title}</h2>
          <h3>{price.toFixed(2)} EGP</h3>
          {quantity && <h3>Total Quantity: {quantity}</h3>}
          {quantity && <h3>Price Total: {(quantity * price).toFixed(2)}</h3>}
          {children}
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
