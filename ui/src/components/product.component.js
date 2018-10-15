import React, { Component } from "react";
import { connect } from "react-redux";
//import { fetchProducts, fetchCount } from "../actions/action-creators";
import { fetchProducts, fetchCount } from "../odata-client/odata";
import { bindActionCreators } from "redux";
import './style.css';

class ProductList extends Component {
    growingThreshold = 5;
    componentDidMount() {
        this.props.fetchCount();
        this.fetchProductList();
    }

    fetchProductList() {
        if ((this.props.products.length + this.growingThreshold) <= this.count) {
             let options={};
             const top= this.growingThreshold;
             const skip= this.props.products.length;
             options["top"]=top;
             options["skip"]=skip;
             this.props.fetchProducts(options);
        }
        else {
            let options={};
            const top= this.count - this.props.products.length;
            const skip= this.props.products.length;
            options["top"]=top;
            options["skip"]=skip;
            this.props.fetchProducts(options);
        }

    }
    createRow(product) {
        
        const rows=(<div className="flex-row-container flex-item product-item width100pc" key={product.ProductID}>
            <div className="flex-item cell-element">{product.ProductID}</div>
            <div className="flex-item cell-element">{product.ProductName}</div>
            <div className="flex-item cell-element">{product.UnitPrice}</div>
            <div className="flex-item cell-element">{product.QuantityPerUnit}</div>
        </div>);
        return rows;
    };

    renderList() {
        return this.props.products.map(this.createRow);
    }

    render() {
        if(!this.props.products || this.props.products.length===0){
            return (<div></div>);
        }
        const table= (
            <div className="flex-column-container lightBlueBG scroll-box flex-item width60pc" >
                <div className="flex-row-container flex-item product-item header-row width100pc" >
                    <h2 className="flex-item cell-element">Product ID</h2>
                    <h2 className="flex-item cell-element">Product Name</h2>
                    <h2 className="flex-item cell-element">Unit Price</h2>
                    <h2 className="flex-item cell-element">Quantity Per Unit</h2>
                </div>
                <div className="flex-item text-block paleBlackTextColor flex-column-container width100pc">
                    {this.props.products.map(this.createRow)}
                </div>
                <div className="flex-row-container show-more" >

                    <div className="flex-item" >
                        <button type="button" onClick={this.fetchProductList.bind(this)} >Show More ({this.props.products.length} / {this.props.count}) </button>
                    </div>


                </div>
            </div>
        );
        return table;
    }
}

function mapStateToProps(state) {
    return {
        products: state.products.products,
        count: state.products.count
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchCount: fetchCount, fetchProducts: fetchProducts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);