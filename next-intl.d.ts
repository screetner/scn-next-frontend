type ENMessage = typeof import('./messages/en.json')
type THMessage = typeof import('./messages/th.json')

declare interface IntlMessages extends ENMessage, THMessage {}
