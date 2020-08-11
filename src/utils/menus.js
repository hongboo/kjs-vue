import { getRequest } from "./api";
import Home from '@/views/Home.vue'
import KjsHome from '@/views/kjs/KjsHome.vue'

export const initMenu = (router, store) => {
    if (store.state.routes.length > 0) {
        return;
    }
    getRequest("/system/config/menu").then(data => {
        if (data) {
            console.log('菜单数据', data)
            let fmtRoutes = formatRoutes(data);


            // let tmpRoutes = [
            //     {
            //         path: '/kjshome',
            //         component: KjsHome,
            //         enabled: true,
            //         name: '首页'
            //     },
            //     {
            //         path: '/bank_detail',
            //         component: Home,
            //         name: '银行明细'
            //     },
            //     {
            //         path: '/trade_record',
            //         component: Home,
            //         name: '交易记录'
            //     },
            // ]
            // fmtRoutes.unshift(...tmpRoutes);
            // console.log(fmtRoutes)


            router.addRoutes(fmtRoutes);
            store.commit('initRoutes', fmtRoutes);
            store.dispatch('connect');
        }
    })
}
export const formatRoutes = (routes) => {
    let fmRoutes = []; // 添加动态路由，数据由后端提供

    

    routes.forEach(router => {


        if (router.path) {


            let {
                path,
                component,
                name,
                meta,
                iconCls,
                children
            } = router;
            if (children && children instanceof Array) {
                children = formatRoutes(children);
            }
            let fmRouter = {
                path: path,
                name: name,
                iconCls: iconCls,
                meta: meta,
                children: children,
                component(resolve) {
                    if (component.startsWith("Home")) {
                        require(['../views/' + component + '.vue'], resolve);
                    } else if (component.startsWith("Emp")) {
                        require(['../views/emp/' + component + '.vue'], resolve);
                    } else if (component.startsWith("Per")) {
                        require(['../views/per/' + component + '.vue'], resolve);
                    } else if (component.startsWith("Sal")) {
                        require(['../views/sal/' + component + '.vue'], resolve);
                    } else if (component.startsWith("Sta")) {
                        require(['../views/sta/' + component + '.vue'], resolve);
                    } else if (component.startsWith("Sys")) {
                        require(['../views/sys/' + component + '.vue'], resolve);
                    } else if (component.startsWith("KjsHome")) { //新加的路由
                        require(['../views/kjs/' + component + '.vue'], resolve);
                    }
                }
            }
            fmRoutes.push(fmRouter);


        }

    })




    // let tempRouter = {
    //     path: '/kjs/kjshome',
    //     name: '首页',
    //     iconCls: '',
    //     meta: '',
    //     children: null,
    //     component(resolve) {
    //         require(['../views/kjs/KjsHome.vue'], resolve);
    //     }
    // }
    // fmRoutes.unshift(tempRouter)





    return fmRoutes;
}