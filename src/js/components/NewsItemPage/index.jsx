import React, { Component, PropTypes } from 'react'
import NewsItem from 'components/NewsItem'
import { newsStore } from 'stores'
import { Link } from 'react-router'

export default class NewsItemPage extends Component {
  static propTypes = {}

  constructor(props) {
    super()

    this.state = {
      newsItem: null
    }

    this.requestNewsItem(props)
  }

  componentDidMount() {
    newsStore.addEventListener(this.change)
  }

  componentWillUnmount() {
    newsStore.removeEventListener(this.change)
  }

  componentWillReceiveProps(props) {
    this.requestNewsItem(props)
  }

  change = () => {
    const { id } = this.props.params
    const newsItem = newsStore.getItem(id)

    this.setState({newsItem})
  }

  getNewsItemIfLoaded() {
    const { id } = this.props.params

    var { newsItem } = this.state

    if (!newsItem) {
      newsItem = newsStore.getItem(id)
    }

    return newsItem
  }

  requestNewsItem(props) {
    const { id } = props.params

    setTimeout(() => {
      this.setState({
        newsItem: newsStore.getOrLoadNewsItem(id)
      })
    }, 0)
  }

  render() {
    const newsItem = this.getNewsItemIfLoaded()

    if (!newsItem) {
      return null
    }

    const linkToComments = (newsItem.isLoaded) ? this.renderLinkToComments() : null

    const props = {
      newsItem,
    }

    return (
      <div>
        <NewsItem {...props} />
        {linkToComments}
        {this.props.children}
      </div>
    )
  }

  renderLinkToComments() {
    const { id, page } = this.props.params

    if (page) {
      return null
    }

    const href = `/news/${id}/comments/1`

    return (
      <Link to={href}>
        Комментарии
      </Link>
    )
  }
}
