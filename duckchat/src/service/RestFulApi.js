export class RestFulApi {

    constructor() {
        this.apiHost = "http://192.168.1.9:3000"
    }

    getHost() {
        return this.apiHost
    }

    // hàm lấy danh sách tin tức 
    async getNews() {
        let url = "/news/getListNews"
        try {
            const response = await fetch(this.apiHost + url, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            return data.data;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    // hàm gọi api lấy danh sách tin tức (idUser)
    async getAllNews_IdUser(idUser, offer) {
        // đường dẫn
        let url = this.apiHost + "/news/getListNews_IdUser?idUser=" + idUser + "&offer=" + offer

        // Gọi api 
        try {
            const response = await fetch(url, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.json()
            if (data.success) {
                return data.data
            }
            return false
        } catch (error) {
            console.log("Lỗi trong quá trình gọi api lấy danh sách bài viết (idUser): " + error)
            return false;
        }
    }


    // Lấy thông tin tin tức dạng văn bản
    async getNews_Document(idNews) {
        let url = "/news/getInformationNews/document?idNews=" + idNews;
        try {
            const response = await fetch(this.apiHost + url, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            return data.data[0];
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    // Lấy danh sách bài viết
    async getAll_Post(offer) {
        let url = this.apiHost + "/post/getposts?offer=" + offer
        try {
            const response = await fetch(url, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            return data.data
        } catch (error) {
            throw error
        }
    }

    // lấy danh sách bài viết người dùng (id người dùng)
    async getAllPosts_IdUser(idUser, offer) {
        try {
            let url = this.apiHost + "/post/getAllPost_IdUser?idUser=" + idUser + "&offer=" + offer
            const response = await fetch(url, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            if (data.success) {
                return data.data
            }
            return false
        } catch (error) {
            console.log("Lôi lấy danh sách bài viết (id người dùng): " + error)
            return false;
        }

    }

    // lấy danh sách bài viết đã thích
    async getAll_MyLikePost(idUser) {
        let url = this.apiHost + "/post/user_likepost?idUser=" + idUser
        try {
            const response = await fetch(url, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            if (data) {
                return data.data;
            }
        } catch (error) {
            console.log("Lỗi gọi api lấy danh sách thích bài viết: " + error)
            throw error
        }
    }

    // thả icon cảm xúc cho bài viết
    async insertIconFeelToPost(idUser, idPost, nameIcon) {
        let url = this.apiHost + "/post/insertIconFeelPost?idUser=" + idUser + "&idPost=" + idPost + "&nameIcon=" + nameIcon
        try {
            const response = await fetch(url, {
                method: "post",
                headers: {
                    "Content-Type": "application"
                }
            })

            const result = await response.json(response)
            return result.success

        } catch (error) {
            console.log("Err thả icon bài viết: " + error)
            return false;
        }
    }

    // xoá cảm xúc icon vừa thả cho bài viết
    async deleteIconFeelToPost(idUser, idPost) {
        let url = this.apiHost + "/post/deleteIconFeelPost?idUser=" + idUser + "&idPost=" + idPost
        try {
            const response = await fetch(url, {
                method: "post",
                headers: {
                    "content-Type": "application"
                }
            })
            const result = await response.json()
            return result.success
        } catch (error) {
            console.log("Lỗi gọi api xoá icon cảm xúc thả cho bài viết: " + error)
            return false
        }
    }

    // cập nhật icon cảm xúc bài viết
    async updateIconFeelToPost(iduser, idPost, nameIcon) {
        let url = this.apiHost + "/post/updateIconFeelPost?idUser=" + iduser + "&idPost=" + idPost + "&nameIcon=" + nameIcon
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const result = await response.json()
            return result.success
        } catch (error) {
            console.log("Lỗi gọi api cập nhật cảm xúc bài viết: " + error)
            return false
        }
    }

    //  lấy danh sách comment bài viết ==> dựa còn id bài viết
    async getAll_CommentPost(idPost, offset) {
        let url = this.apiHost + "/post/getAllCommentPost?idPost=" + idPost + "&offset=" + offset
        try {
            const response = await fetch(url, {
                method: 'get',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const data = await response.json()
            if (data.success) {
                return data.data
            }
            return false
        } catch (error) {
            console.log("Lỗi lấy danh sách comment theo id bài viết: " + error)
            return false;
        }
    }

    // insert bình luận cho bài viết dựa vào id bài viết
    async insertCommentPost(idPost, idUser, valueCmt) {
        let url = this.apiHost + "/post/insertCommentPost?idPost=" + idPost + "&idUser=" + idUser + "&valueCmt=" + valueCmt
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const result = await response.json();
            if (result.success) {
                return result.data
            }
            return false;
        } catch (error) {
            console.log("Lỗi khi thêm bình luận cho bài viết: " + error)
            return false;
        }
    }

    // gọi api tìm người dùng
    async searchUser_Debounce(valueSearch, idRequest) {
        // url
        let url = this.apiHost + "/user/searchUser?valueSearch=" + valueSearch + "&idRequest=" + idRequest
        try {

            // gọi api
            const response = await fetch(url, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const result = await response.json();
            if (result.success) {
                return result.data
            }
            return false
        } catch (error) {
            console.log("Lỗi gọi api tìm kiếm người dùng (debounce): " + error)
            return false
        }
    }

    // gọi api tìm bạn bè trong danh sách bạn bè
    async searchFriend_MyFriend(idUser, valueSearch) {
        // url
        let url = this.apiHost + "/user/searchMyFriends?idUser=" + idUser + "&valueSearch=" + valueSearch

        try {
            // gọi api
            const response = await fetch(url, {
                method: 'post',
                headers: {
                    'ContentType': 'application/json'
                }
            })

            const result = await response.json()
            if (result.success && result.data.length > 0) {
                return result.data
            }
            return false
        } catch (error) {
            console.log("Lỗi gọi api tìm kiếm bạn bè trong danh sách bạn bè: " + error)
            return false
        }
    }


    // gọi api lấy thông tin người dùng (iduser)
    async getInformationUser(idUser) {
        // url
        let url = this.apiHost + "/user/information_user?iduser=" + idUser
        try {

            // gọi api 
            const response = await fetch(url, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const result = await response.json()
            if (result.success && result.data.length > 0) {
                return result.data[0]
            }
            return false
        } catch (error) {
            console.log("Lỗi gọi api lấy thông tin người dùng: " + error)
            return false

        }
    }

    // gọi api gửi yêu cầu kết bạn
    async sendFriendRequest(idSender, idReceiver) {

        // địa chỉ url
        let url = this.apiHost + "/user/sendFriendrequest?idSender=" + idSender + "&idReceiver=" + idReceiver

        // thực hiện gọi api 
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const result = await response.json();
            return result.success
        } catch (error) {
            console.log("Lỗi gọi api gửi lời yêu cầu kết bạn: " + error)
            return false
        }

    }

    // gọi api xoá yêu cầu kết bạn 
    async deleteFriendRequest(idSender, idReceiver) {

        // url
        let url = this.apiHost + "/user/deleteFriendRequest?idSender=" + idSender + "&idReceiver=" + idReceiver

        try {
            // gọi api 
            const response = await fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const result = await response.json();
            return result.success
        } catch (error) {
            console.log("Lỗi trong quá trình xoá yêu cầu kết bạn: " + error)
            return false
        }
    }

    // goi api chấp nhận lời mời kết bạn
    async setAcceptFriendRequest(idRequest) {
        // url
        let url = this.apiHost + "/user/setAcceptFriendRequest?idRequest=" + idRequest
        try {

            // thực hiện gọi api
            const response = await fetch(url, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const result = await response.json()
            return result.success
        } catch (error) {
            console.log("Lỗi chấp nhận lời mời kết bạn: " + error)
            return false
        }
    }

    // gọi api từ chối lời yêu cầu kết bạn
    async setRefuseFriendRequest(idRequest) {

        // url
        let url = this.apiHost + "/user/setRefuseFriendRequest?idRequest=" + idRequest

        try {
            // call api
            const response = await fetch(url, {
                method: 'post',
                headers: {
                    "ContentType": 'application/json'
                }
            })

            const result = await response.json();
            return result.success
        } catch (error) {
            console.log("Lỗi gọi api từ chối yêu cầu kết bạn: " + error)
            return false
        }
    }

    // goi api lấy danh sách yêu cầu kết bạn
    async getFriendRequestList(idUser, offset, limit) {
        // url
        let url = this.apiHost + "/user/getFriendRequestList?idUser=" + idUser + "&offset=" + offset + "&limit=" + limit

        try {
            // call api
            const response = await fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const result = await response.json()
            if (result.success) {
                return result.data
            }
            return false
        } catch (error) {
            console.log("Loi lay danh sach yeu cau loi moi ket ban: " + error)
            return false;
        }
    }

    // gọi api lấy danh sách bạn bè
    async getMyFriendList(idUser, offset, limit) {

        // url
        let url = this.apiHost + "/user/getFriendIdUser?idUser=" + idUser + "&offset=" + offset + "&limit=" + limit
        try {

            // gọi api
            const response = await fetch(url, {
                method: 'post',
                headers: {
                    'ContentType': 'application/json'
                }
            })

            const result = await response.json()
            if (result.success && result.data.length > 0) {
                return result.data
            }
            return false
        } catch (error) {
            return false
        }
    }

    // gọi api kiểm tra trạng thái bạn bè
    async isCheckMyFriend(idUser1, idUser2) {
        // url
        let url = this.apiHost + "/user/isCheckMyFriend?idUser1=" + idUser1 + "&idUser2=" + idUser2

        try {
            // Thực hiện gọi api
            const response = await fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const result = await response.json();
            if (result.success) {
                return result.data[0]
            }
            return false;
        } catch (error) {
            console.log("Lỗi trong quá trình kiếm tra bạn bè: " + error)
            return false;
        }

    }

    static host = "http://192.168.1.9:3000"
    static urlRegisterUser = "/user/register/"
    static urlLoginUser = "/user/login/";
    static urlInformation_user = "/user/information_user"
    static urlGetStatusPost = "/statuspost/getstatuspost/"
    static urlPost_anarticle = "/post/postanarticle/"
    static urlGet_posts = "/post/getposts"
    static urlGet_imagesPost = "/post/imagespost"
    static url_imagespost_image = "/post/image"
    static url_AddNews_Document = "/news/addnewdocument"

}