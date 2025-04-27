import './index.css'
import { Component } from 'react'
import Product from '../Product'

const statusList = {
    LOADING: 'stage1',
    DONE: 'stage2',
    INITIAL: 'stage3'
}

class Home extends Component{
    state = {
        list: [],
        apiStatus:statusList.INITIAL
    }

    loderFun = () => (
<div className="loading">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>
    )
    getFun = async() => {
        this.setState({
            apiStatus: statusList.LOADING
        })
        const BASE_URL = 'https://fakestoreapi.com/products'
        const res = await fetch(BASE_URL)
        const data = await res.json()
        this.setState({
            list: data,
            apiStatus: statusList.DONE
        }, () => console.log(this.state.list))
    }

    contentFun = () => {
        const {list} = this.state
        return (
            <div className="product-container">
      <header className="product-header">
        <h1>Our Products</h1>
        <p>Discover our amazing collection</p>
      </header>
      
      <ul className="product-list">
        {list.map(product => (
          <Product product={product} key={product.id} />
        ))}
      </ul>
    </div>
            
        )
    }
    funFun = () => {
        const {apiStatus} = this.state
        switch(apiStatus){
            case statusList.LOADING:
                return this.loderFun()
            case statusList.DONE:
                return this.contentFun()
            default:
                return null
        }
    }
    componentDidMount(){
        this.getFun()
    }
    render(){
        return (
            <div>
                {this.funFun()}
            </div>
        )
    }
}

export default Home