// eslint-disable-next-line no-unused-vars
import React from 'react';
import {connect} from 'react-redux';
import './App.css';
import {setNotificationAction, clearNotificationAction}
  from './reducers/notification_reducer';
import {setBlogsAction, clearBlogsAction} from './reducers/blogs_reducer';
import {useState, useEffect, createRef} from 'react';
import Login from './components/login.js';
import Blog from './components/Blog.js';
import BlogEntryForm from './components/blog_entry_form';
import Notification from './components/notification';
import Togglable from './components/togglable';
import LoginService from './services/login.js';
import BlogsService from './services/blogs.js';
import {useField} from './hooks';

const NOTIFICATION_DISPLAY_TIME_MS = 3000;

function App({
  notificationText, notificationIsError,
  setNotification, clearNotification,
  blogs, setBlogs, blogsNotSet, clearBlogs,
}) {
  const [user, setUser] = useState();
  const [notificationTimeoutId, setNotificationTimeoutId] = useState(undefined);
  const [usernameField, usernameFieldReset] = useField('text');
  const [passwordField, passwordFieldReset] = useField('password');

  // ref for managing togglable blog form visibility
  const blogFormRef = createRef(null);
  const loginFormRef = createRef(null);

  // local storage of login session
  const doSaveSessionToLocalStorage = (sessionData) => {
    const userJSON = JSON.stringify(sessionData);
    window.localStorage.setItem('user', userJSON);
  };
  const doRestoreSessionFromLocalStorage = () => {
    const userJSON = window.localStorage.getItem('user');
    if (userJSON) {
      setUser(JSON.parse(userJSON));
    }
  };
  const doClearSessionFromLocalStorage = () => {
    window.localStorage.removeItem('user');
  };

  // notification management
  const doShowNotification = (text, isError) => {
    setNotification(text, isError);
    if (notificationTimeoutId) {
      window.clearTimeout(notificationTimeoutId);
    }
    const timeoutId = window.setTimeout(() => {
      clearNotification();
    }, NOTIFICATION_DISPLAY_TIME_MS);
    setNotificationTimeoutId(timeoutId);
  };
  const doShowInfo = (text) => doShowNotification(text, false);
  const doShowError = (text) => doShowNotification(text, true);

  // actions triggered by components
  const doFetchBlogs = () => {
    BlogsService.getAll()
        .then((blogs) => setBlogs(blogs))
        .catch((e) => doShowError(e.message));
  };
  const onDoLogin = () => {
    LoginService.doLogin(usernameField.value, passwordField.value)
        .then((sessionData) => {
          setUser(sessionData);
          doSaveSessionToLocalStorage(sessionData);
          doShowInfo(`User ${sessionData.username} logged in!`);
        })
        .catch((e) => {
          doShowError('Login failed:' + e.message);
        });
  };
  const onDoLogout = () => {
    setUser(undefined);
    clearBlogs();
    doClearSessionFromLocalStorage();
    doShowInfo('Good Bye!');
  };

  const onBlogSubmit = (blogValues) => {
    blogFormRef.current.doHide();
    BlogsService.save(blogValues, user.token)
        .then(() => doFetchBlogs())
        .then(() => doShowInfo(`Blog "${blogValues.title}" saved!`))
        .catch((e) => {
          doShowError(e.message);
        });
  };

  const onLikeClicked = (blogValues) => {
    blogValues.likes += 1;
    BlogsService.save(blogValues, user.token)
        .then(() => doFetchBlogs())
        .then(() => doShowInfo(
            `Your like saved on blog "${blogValues.title}"!`)
        )
        .catch((e) => {
          doShowError(e.message);
        });
  };

  const onBlogRemove = (blog) => {
    if (window.confirm(`You are deleting blog ${blog.title}?`)) {
      BlogsService.remove(blog.id, user.token)
          .then(() => doFetchBlogs())
          .then(() => doShowInfo('Blog successfully removed!'))
          .catch((e) => {
            doShowError(e.message);
          });
    }
  };

  // initiate fetching blogs if logged in
  // and blogs undefined
  useEffect(() => {
    if (blogsNotSet && user !== undefined) {
      doFetchBlogs();
    }
  });

  useEffect(() => {
    doRestoreSessionFromLocalStorage();
  }, []);


  const blogList = !!blogs ?
    <div>{
      blogs
          .sort((a, b) => b.likes - a.likes)
          .map((b) =>
            <Blog
              blog={b}
              key={b.id}
              onLikeClicked={onLikeClicked}
              onBlogRemove={b.user.id === user.id ? onBlogRemove : undefined }
            />)}
    </div> :
    undefined;


  return (
    <div className="App">
      <Notification text={ notificationText } isError={notificationIsError}/>
      <Togglable buttonTextWhenClosed='Show Login'
        buttonTextWhenOpen='Hide Login' ref={loginFormRef}>
        <Login
          loggedInUser={!!user ? user.username : undefined}
          usernameField={usernameField}
          passwordField={passwordField}
          usernameFieldReset={usernameFieldReset}
          passwordFieldReset={passwordFieldReset}
          doLogin={onDoLogin}
          doLogout={onDoLogout}
        />
      </Togglable>
      <br/>
      { user !== undefined ?
        <Togglable
          ref={blogFormRef}G
          buttonTextWhenOpen="Cancel"
          buttonTextWhenClosed="Submit New Blog">
          <BlogEntryForm onBlogSubmit={onBlogSubmit} />
        </Togglable> :
        <></>}
      <br/>
      <div className="blog-list">{ blogList }</div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    notificationText: state.notification.text,
    notificationIsError: state.notification.isError,
    blogs: state.blogs,
    blogsNotSet: state.blogs === null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNotification: (text, isError = false) => dispatch(setNotificationAction(text, isError)),
    clearNotification: () => dispatch(clearNotificationAction()),
    setBlogs: (blogs) => dispatch(setBlogsAction(blogs)),
    clearBlogs: () => dispatch(clearBlogsAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
