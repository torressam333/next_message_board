/**
 * Centralized place for route paths.
 * Makes it easier to mass update paths in app if needed.
 */
const paths = {
  home() {
    return "/";
  },
  topicShow(topicSlug: string) {
    return `/topics/${topicSlug}`;
  },
  postCreate(topicSlug: string) {
    return `/topics/${topicSlug}/posts/new`;
  },
  postShow(topicSlug: string, postId: string) {
    `/topics/${topicSlug}/posts/${postId}`;
  }
};

export default paths;
