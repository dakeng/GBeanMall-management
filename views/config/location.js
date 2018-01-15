import path from 'path';

//page目录地址
const projectsPath = path.resolve(__dirname, './../');

export default function getLocation(name){
    let currentProject = name,
        entry = {},
        pages = [],
        publicPath = '/GBeanMall-management/views/';
    
    currentProject = 'manage/';
    publicPath += 'manage/bundle/';
    entry = {
        login: path.resolve(projectsPath, currentProject + 'login/entry/entry.js')
    };
    pages = [{
        entry: path.resolve(projectsPath, currentProject + 'login/index.dev.html'),
        output: path.resolve(projectsPath, currentProject + 'login/index.html'),
        matches: {
            js: 'login',
            css: 'login'
        }
    }];

    return {
        currentProject: currentProject,
        entry: entry,
        publicPath: publicPath,
        pages: pages
    };
}