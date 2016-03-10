import NewsPartStore from 'stores/newsParts'
import AppDispatcher from 'dispatcher'
import {LOAD, MARK_AS_READ, POST, DELETE, _COMMENT, _COMMENTS, _START, _DONE, _FAIL} from 'constants'

export default class CommentStore extends NewsPartStore {
  constructor(...args) {
    super(...args)

    this.dispatchToken = AppDispatcher.register(action => {
      const {type, data} = action

      switch(type) {
        case MARK_AS_READ + _COMMENT:
          this.markAsRead(data.id)
          this.change()
          break

        case POST + _COMMENT:
          this.postComment(data)
          break

        case DELETE + _COMMENT:
          this.deleteItem(data.id)
          this.change()
          break

        case LOAD + _COMMENTS + _START:
        case LOAD + _COMMENTS + _DONE:
        case LOAD + _COMMENTS + _FAIL:
          this.loadComments(type, data)
          break
      }
    })
  }

  postComment(data) {
    const { commentId, author, text, isRead } = data

    this.addItem({
      id: commentId,
      author,
      text,
      isRead,
    })
  }

  loadComments(type, data) {
    const { newsId } = data.origData
    const newsItem = this._stores.news.getItem(newsId)

    switch(type) {
      case LOAD + _COMMENTS + _START:
        newsItem.isLoadingComments = true
        newsItem.isLoadedComments = false
        break

      case LOAD + _COMMENTS + _DONE:
        newsItem.isLoadingComments = false
        newsItem.isLoadedComments = true
        data.response.forEach(this.addItem)
        break

      case LOAD + _COMMENTS + _FAIL:
        newsItem.isLoadingComments = false
        newsItem.isLoadedComments = false
        break
    }

    this.change()
  }
}
