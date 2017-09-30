
let trigger

$(document).ready(function () {
    $('.inputField').on('keyup', (e) => {
        clearTimeout(trigger)
        trigger = setTimeout(() => {
            $.ajax({
                url: 'https://api.github.com/search/users',
                data: {
                    sort: 'followers',
                    order: 'desc',
                    q: $(e.target).val()
                },
                success: (res) => {
                    loadUsers(res.items)
                },
                error: (err) => {
                    console.log(err)
                }
            })
        }, 500)
    })
})

let getUser = (username, cb) => {
    $.ajax({
        url: `https://api.github.com/users/${username}`,
        success: (res) => {
            cb(null, res)
        },
        error: (err) => {
            cb(err, null)
        }
    })
}

let loadUsers = (users) => {
    $('.searchResults').empty()
    users.map((user) => {
        getUser(user.login, (err, user) => {
            if (!err) {
                $('.searchResults').append(getUserHtml(user))
            }
        })

    })
}

let getUserHtml = (user) => {
    return `    <div class="row">
                    <div class="col-xs-12 col-sm-6 col-md-3">
                        <img class="full-width img img-circle" src="${user.avatar_url}" />
                    </div>
                    <div class="col-xs-12 col-sm-6 col-mg-9">
                        <p class="name">${user.name}</p>
                        <p class="username">@${user.login}</p>
                        <p class="bio">${user.bio}</p>
                    </div>
                </div>`
}