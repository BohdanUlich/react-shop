import React, { useEffect } from 'react';
import Sort from '../../components/Sort-popup/Sort';
import ProductCard from '../../components/Product-card/Product-card';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/actions/product';
import { LoadingPreview } from '../../components';

function CategoryPage() {

    const items = useSelector(({ products }) => products.items )
    const category = useSelector(({ categories }) => categories.category)
    const sortBy = useSelector(({ filters }) => filters.sortBy)
    const isLoaded = useSelector(({ products }) => products.isLoaded )

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts(category, sortBy))
    }, [sortBy])

    const sortItems = [{name: 'популярности', type: 'rating', order:'desc'},
                       {name: 'наличию', type: 'available', order:'desc'},      
                       {name: 'цене', type: 'actualPrice', order:'asc'}, 
                       {name: 'алфавиту', type: 'name', order:'asc'}]

    return(
        <div className="container">
            <div className="category-page">

                <div className="category-page__header">
                    <Sort sortItems={sortItems} activeSortType={sortBy} />
                </div>

                <div className="category-page__body">
                    {isLoaded 
                        ? items.map(obj => <ProductCard key={obj.id} {...obj}/>)
                        : Array(8).fill(0).map((_, index) => <LoadingPreview key={index} />)  
                    }
                </div>
            </div>
        </div>
    )
}

export default CategoryPage;