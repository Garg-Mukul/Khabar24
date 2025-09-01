import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  
  constructor(props){
    super(props);
    console.log("I am a constructor. ");
    this.state = 
    {
      articles:  [],
      loading: false,
      page:1
    }
    document.title = this.props.category;
  }

  async componentDidMount(){
    console.log("cdm");
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=b099d3fc32f0447e98c1f9802556fd2e&page=1&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles:parsedData.articles,
      totalResults:parsedData.totalResults
    })
    this.props.setProgress(100);


  }
  handlePreviousClick= async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=b099d3fc32f0447e98c1f9802556fd2e&page=${this.state.page - 1}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1
      })

  }
  handleNextClick=async ()=>{
    if(this.state.page+1 > Math.ceil(this.state.totalResults/20)){

    }
    else
    {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=b099d3fc32f0447e98c1f9802556fd2e&page=${this.state.page + 1}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles:parsedData.articles,
    page: this.state.page+1})}

  }


  render() {
    console.log("render");
    return (
      <div className = "container my-3">
        <h2>Top Headlines</h2>
        
        <div className = "row">
          {this.state.articles.map((element)=>{
            return <div className="col-md-4"  key = {element.url}>
            <NewsItem title =  {element.title ? element.title.slice(0, 11) : "No Title"} description = {element.description ? element.description.slice(0, 88) : "No Description"} imageUrl = {element.urlToImage? element.urlToImage : "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg"} newsUrl = {element.url}></NewsItem>
          </div>
          
        })}

        <div className='container'>
          <button disabled = {this.state.page<=1} type="button" className="btn btn-secondary mx-2" onClick = {this.handlePreviousClick}>Previous</button>
          <button disabled = {this.state.page+1 > Math.ceil(this.state.totalResults/20)} type="button" className="btn btn-secondary mx-2" onClick = {this.handleNextClick}>Next</button>
        </div>
        
          
          
          
          
        
        </div>
        
        
      </div>

    )
  }
}

export default News
