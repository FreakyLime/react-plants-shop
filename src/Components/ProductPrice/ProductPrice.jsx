import PropTypes from 'prop-types';
import styles from './ProductPrice.module.css';

const ProductPrice = ({ cost, sale, className }) => {
  return (
    <div className={`${styles.productPrice} ${className || ''}`}>
      <span className={sale ? styles.oldPrice : ''}>
        ${cost}
      </span>
      {sale && (
        <span className={styles.sale}>
          ${sale}
        </span>
      )}
    </div>
  );
};

ProductPrice.propTypes = {
  cost: PropTypes.number.isRequired,
  sale: PropTypes.number,
  className: PropTypes.string,
};

export default ProductPrice;
