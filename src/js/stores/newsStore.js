import NewsPartStore from 'stores/newsPartStore'
import AppDispatcher from 'dispatcher'
import {MARK_NEWS_AS_READ, POST_COMMENT, DELETE_NEWS_ITEM} from 'constants'

export default class NewsStore extends NewsPartStore {
  constructor(...args) {
    super(...args)

    this.dispatchToken = AppDispatcher.register(action => {
      const {type, data} = action

      switch(type) {
        case MARK_NEWS_AS_READ:
          this.markAsRead(data.id)
          this.change()
          break

        case POST_COMMENT:
          AppDispatcher.waitFor([this._stores.comments.dispatchToken])

          const newsItem = this.getItem(data.newsId)
          const lastCommentId = this._stores.comments.getLastId()

          newsItem.comments.push(lastCommentId)

          this.change()
          break

        case DELETE_NEWS_ITEM:
          this.deleteItem(data.id)
          this.change()
          break
      }
    })
  }
}
