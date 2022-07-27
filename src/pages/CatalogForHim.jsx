import React, { useState, useCallback, useEffect, useRef } from 'react';

import Helmet from '../components/Helmet';
import Grid from '../components/Grid';
import ProductCard from '../components/ProductsCard';
import CheckBox from '../components/CheckBox';
import Button from '../components/Button';

import productData from '../assets/fake-data/products';
import category from '../assets/fake-data/category';
import size from '../assets/fake-data/products-size';
import colors from '../assets/fake-data/product-color';

const CatalogForHim = () => {
    const initFilter = {
        category: [],
        color: [],
        size: [],
    };

    const productList = productData.getProductByGender('nam');

    // const arr = [];
    // const productList = arr.push(newRes);

    console.log(productList);

    const [products, setProducts] = useState(productList);

    const [filter, setFilter] = useState(initFilter);

    const filterSelect = (type, checked, item) => {
        if (checked) {
            switch (type) {
                case 'CATEGORY':
                    setFilter({ ...filter, category: [...filter.category, item.categorySlug] });
                    break;
                case 'COLOR':
                    setFilter({ ...filter, color: [...filter.color, item.color] });
                    break;
                case 'SIZE':
                    setFilter({ ...filter, size: [...filter.size, item.size] });
                    break;
                default:
            }
        } else {
            switch (type) {
                case 'CATEGORY':
                    const newCategory = filter.category.filter((e) => e !== item.categorySlug);
                    setFilter({ ...filter, category: newCategory });
                    break;
                case 'COLOR':
                    const newColor = filter.color.filter((e) => e !== item.color);
                    setFilter({ ...filter, color: newColor });
                    break;
                case 'SIZE':
                    const newSize = filter.size.filter((e) => e !== item.size);
                    setFilter({ ...filter, size: newSize });
                    break;
                default:
            }
        }
    };

    const clearFilter = () => setFilter(initFilter);

    const updateProducts = useCallback(() => {
        let temp = productList;

        if (filter.category.length > 0) {
            temp = temp.filter((e) => filter.category.includes(e.categorySlug));
        }

        if (filter.color.length > 0) {
            temp = temp.filter((e) => {
                const check = e.colors.find((color) => filter.color.includes(color));
                return check !== undefined;
            });
        }

        if (filter.size.length > 0) {
            temp = temp.filter((e) => {
                const check = e.size.find((size) => filter.size.includes(size));
                return check !== undefined;
            });
        }

        setProducts(temp);
    }, [filter, productList]);

    useEffect(() => {
        updateProducts();
    }, [updateProducts]);

    const filterRef = useRef();

    const showHideFilter = () => {
        filterRef.current.classList.toggle('active');
    };

    return (
        <Helmet title="FOR - HIM">
            <div className="catalog-header">
                <h2 className="catalog-header_heading">For Him</h2>
                <p>
                    Tất cả những sản phẩm Mới nhất nằm trong BST được mở bán Hàng Tuần sẽ được cập nhật liên tục tại
                    đây. Chắc chắn bạn sẽ tìm thấy những sản phẩm Đẹp Nhất - Vừa Vặn Nhất - Phù Hợp nhất với phong cách
                    của mình.
                </p>
            </div>
            <div className="catalog">
                <div className="catalog_filter" ref={filterRef}>
                    <div className="catalog_filter_close" onClick={() => showHideFilter()}>
                        <i className="bx bx-left-arrow-alt"></i>
                    </div>
                    <div className="catalog_filter_widget">
                        <div className="catalog_filter_widget_title"> Danh mục sản phẩm</div>
                        <div className="catalog_filter_widget_content">
                            {category.map((item, index) => (
                                <p key={index}>
                                    <CheckBox
                                        label={item.display}
                                        onChange={(input) => filterSelect('CATEGORY', input.checked, item)}
                                        checked={filter.category.includes(item.categorySlug)}
                                    />
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="catalog_filter_widget">
                        <div className="catalog_filter_widget_title"> kích cỡ / Size</div>
                        <div className="catalog_filter_widget_content">
                            {size.map((item, index) => (
                                <p key={index}>
                                    <CheckBox
                                        label={item.display}
                                        onChange={(input) => filterSelect('SIZE', input.checked, item)}
                                        checked={filter.size.includes(item.size)}
                                    />
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="catalog_filter_widget">
                        <div className="catalog_filter_widget_title"> Màu sắc</div>
                        <div className="catalog_filter_widget_content">
                            {colors.map((item, index) => (
                                <p key={index}>
                                    <CheckBox
                                        label={item.display}
                                        onChange={(input) => filterSelect('COLOR', input.checked, item)}
                                        checked={filter.color.includes(item.color)}
                                    />
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="catalog_filter_widget">
                        <div className="catalog_filter_widget_content">
                            <Button size="sm" onClick={clearFilter}>
                                xoá bộ lọc
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="catalog_filter_toggle">
                    <Button size="sm" onClick={showHideFilter}>
                        Bộ lọc
                    </Button>
                </div>
                <div className="catalog_content">
                    <Grid col={3} mdCol={2} smCol={1} gap={20}>
                        {products.map((item, index) => (
                            <ProductCard
                                key={index}
                                img01={item.image01}
                                img02={item.image02}
                                name={item.title}
                                price={Number(item.price)}
                                slug={item.slug}
                            />
                        ))}
                    </Grid>
                </div>
            </div>
        </Helmet>
    );
};

export default CatalogForHim;
