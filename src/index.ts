process.env.NODE_ENV !== 'development' &&
  process.env.NODE_ENV !== 'test' &&
  require('module-alias/register');
import app from './app';

app.listen(process.env.PORT || 4000);
