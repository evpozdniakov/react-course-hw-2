'use strict'

import React, {PropTypes} from 'react'
import NewsComments from 'components/newsComments'
import timeSpent from 'HOC/timeSpent'
import hintInfo from 'HOC/hintInfo'
import markAsRead from 'HOC/markAsRead'
import {markNewsAsRead} from 'actions/news'

const NewsItem = React.createClass({
  propTypes: {
    newsItem: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      published: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      comments: PropTypes.array.isRequired,
      isExpanded: PropTypes.bool.isRequired,
      commentsShown: PropTypes.bool.isRequired
    }).isRequired,
    toggleNewsContent: PropTypes.func.isRequired,
    toggleNewsComments: PropTypes.func.isRequired,
    startCountTime: PropTypes.func.isRequired,
    stopCountTime: PropTypes.func.isRequired,
    renderTimeSpent: PropTypes.func.isRequired,
    renderReadBtn: PropTypes.func.isRequired,
  },

  getHintInfo() {
    return `Тип: новость\nid:${this.props.newsItem.id}`
  },

  handleMouseEnter() {
    this.props.startCountTime()
    this.props.showHintInfo(this.getHintInfo())
  },

  handleMouseLeave() {
    this.props.stopCountTime()
    this.props.hideHintInfo()
  },

  handleMarkAsRead() {
    markNewsAsRead(this.props.newsItem.id)
  },

  render() {
    var className = 'news-item';

    if (!this.props.newsItem.isExpanded) {
      className += ' collapsed'
    }
    else if (this.props.newsItem.commentsShown) {
      className += ' with-comments'
    }

    const props = {
      className,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
    }

    return (
      <div {...props}>
        {this.props.renderTimeSpent()}
        {this.props.renderReadBtn(this.handleMarkAsRead)}
        {this.renderDate()}
        {this.renderTitle()}
        {this.renderContent()}
        {this.renderComments()}
      </div>
    )
  },

  renderDate() {
    return (
      <div className="news-date">
        {this.props.newsItem.published}
      </div>
    )
  },

  renderTitle() {
    const {id, title} = this.props.newsItem;

    const props = {
      className: 'news-title',
      onClick: this.props.toggleNewsContent
    }

    return (
      <div {...props}>
        <span>{title}</span>
      </div>
    )
  },

  renderContent() {
    return (
      <div className="news-content">
        {this.props.newsItem.content}
      </div>
    )
  },

  renderComments() {
    const props = {
      comments: [], // fixme: get comments related to news item
      toggleNewsComments: this.props.toggleNewsComments
    }

    return <NewsComments {...props} />
  }
})

export default markAsRead(timeSpent(hintInfo(NewsItem)))
