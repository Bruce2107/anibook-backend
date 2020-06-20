process.env.NODE_ENV !== 'development' && require('module-alias/register');
import app from './app';

app.listen(process.env.PORT || 4000);
