'use strict'

require('!style!css!components/news.css')

import React from 'react'
import ReactDOM from 'react-dom'
import NewsList from 'components/newsList'

const newsList = React.createElement(NewsList);

ReactDOM.render(newsList, document.querySelector('#news-ctnr'));
