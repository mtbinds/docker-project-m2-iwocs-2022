import isDef from "./is-def";
import nameGenerator from "./name-generator";

export function getSocketName(dom) {
    const cookies = dom.cookie.split(';');
    let wsname = cookies.find(function (c) {
        if (c.match(/wsname/) !== null) return true;
        return false;
    });
    if (isDef(wsname)) {
        wsname = wsname.split('=')[1];
    } else {
        wsname = nameGenerator();
        dom.cookie = 'wsname=' + encodeURIComponent(wsname);
    }
    return wsname;
}
