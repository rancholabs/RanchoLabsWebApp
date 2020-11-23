import { BLOG_REQUEST, BLOG_SUCCESS, BLOG_FAIL } from "../Constants/Blog";

export const blogReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_REQUEST:
      return { loading: true };
    case BLOG_SUCCESS:
      return { loading: false, blogs: action.payload };
    case BLOG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
