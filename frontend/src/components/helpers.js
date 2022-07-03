export function getAccessToken(navigate){
    var access_token = localStorage.getItem("access_token")
    var last_saved = localStorage.getItem('last_saved') || 0;
    var current_time = new Date().getTime()
    if(access_token != undefined && current_time - last_saved <= 55*60*1000) return access_token
    else{
        localStorage.clear()
        navigate("/login")
    }
}
var PROD_URL = "http://20.204.64.17:8000"
var TEST_URL = "http://localhost:8000"
export const Constants = {
    BACKEND_URL: PROD_URL
}