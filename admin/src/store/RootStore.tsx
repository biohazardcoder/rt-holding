import { configureStore } from "@reduxjs/toolkit";
import UserSlicer from "../toolkit/UserSlicer";
import BlogSlicer from "../toolkit/blogSlicer";
import ServiceSlicer from "../toolkit/serviceSlicer";
import CommentSlicer from "../toolkit/commentSlicer";
import ContactSlicer from "../toolkit/contactSLicer";
import AdminsSlacer from "../toolkit/adminsSlicer";
import StorySlicer from "../toolkit/storySlicer";

export const store = configureStore({
  reducer: {
    user: UserSlicer,
    blog:BlogSlicer,
    service:ServiceSlicer,
    comment:CommentSlicer,
    contact:ContactSlicer,
    story:StorySlicer,
    admins:AdminsSlacer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
