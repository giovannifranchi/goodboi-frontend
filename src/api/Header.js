

const Header = {
    get: {
        'Accept': "application/json",
        "Content-Type": "multipart/form-data",
        'authtoken': null,
    }, 

    post: {
        "Content-Type": "application/x-www-form-urlencoded",
    },

    put: {
        'Accept': "application/json", 
        'authtoken': null,
    }

}

export default Header;