"use strict";(self.webpackChunkharry_potter_social_network=self.webpackChunkharry_potter_social_network||[]).push([[497],{7497:function(n,e,t){t.r(e),t.d(e,{default:function(){return G}});var r=t(5671),o=t(3144),i=t(136),s=t(516),a=t(2177),u=t(1413),l=t(2791),c={users:"Users_users__QPuRC",user:"Users_user__trAiR",avatarBlock:"Users_avatarBlock__0DGMf",profile:"Users_profile__FXaoJ",description:"Users_description__sGAYm"},f=t(6083),p=t(1087),g=t(184),d=function(n){return(0,g.jsxs)("div",{className:c.user,children:[(0,g.jsxs)("div",{className:c.profile,children:[(0,g.jsx)("div",{className:c.avatarBlock,children:(0,g.jsx)(p.rU,{to:"/profile/".concat(n.id),children:(0,g.jsx)("img",{src:n.photos.small?n.photos.small:f,alt:"userImage"})})}),(0,g.jsx)("div",{children:(0,g.jsx)("button",{disabled:n.followingInProgress.some((function(e){return e===n.id})),onClick:n.followed?function(){n.unfollow(n.id)}:function(){n.follow(n.id)},children:n.followed?"Unfollow":"Follow"})})]}),(0,g.jsxs)("div",{className:c.description,children:[(0,g.jsx)("div",{children:n.name}),(0,g.jsx)("div",{children:n.status?n.status:"Support Ukraine"}),(0,g.jsx)("div",{className:c.country,children:"props.location.country"}),(0,g.jsx)("div",{className:c.city,children:"props.location.city"})]})]})},h=t(6774),v=t(4942),_="Pagination_pagination__L4RR7",m="Pagination_pageNumber__V2ANc",w="Pagination_pageNumber_selected__mgVXW",y="Pagination_arrowButton__zxfh+",P="Pagination_arrowButton_hidden__t09if",k="Pagination_arrow__OzC4P",j="Pagination_arrow_left__L3M7l",x="Pagination_arrow_right__1ZBJO",C=t(1694),N=t.n(C),U=function(n){for(var e,t=n.totalItemsCount,r=n.pageSize,o=n.activePage,i=void 0===o?1:o,s=n.onPageClick,a=n.portionSize,u=void 0===a?5:a,l=Math.ceil(t/r),c=[],f=1;f<=l;f++)c.push(f);return e=i<Math.floor(u/2)+1?c.slice(0,u):l-i<Math.ceil(u/2)?c.slice(l-u,l):c.slice(i-Math.floor(u/2)-1,i+Math.ceil(u/2)-1),(0,g.jsxs)("div",{className:_,children:[(0,g.jsx)("button",{onClick:function(){return s(i-1)},className:N()((0,v.Z)({},P,1===i),y),children:(0,g.jsx)("i",{className:"".concat(k," ").concat(j)})}),e.map((function(n){return(0,g.jsx)("span",{onClick:function(){return s(n)},className:N()(m,(0,v.Z)({},w,i===n)),children:n},n)})),(0,g.jsx)("button",{onClick:function(){return s(i+1)},className:N()((0,v.Z)({},P,i===l),y),children:(0,g.jsx)("i",{className:"".concat(k," ").concat(x)})})]})},z=function(n){return(0,g.jsxs)("section",{className:c.users,children:[(0,g.jsx)(U,{totalItemsCount:n.totalUsersCount,pageSize:n.pageSize,activePage:n.activePage,onPageClick:n.onPageClick,portionSize:5}),n.isLoading?(0,g.jsx)(h.Z,{}):n.users.map((function(e){return(0,g.jsx)(d,(0,u.Z)({follow:n.follow,unfollow:n.unfollow,followingInProgress:n.followingInProgress},e),e.id)}))]})},S=t(946),b="NOT_FOUND";var A=function(n,e){return n===e};function I(n,e){var t="object"===typeof e?e:{equalityCheck:e},r=t.equalityCheck,o=void 0===r?A:r,i=t.maxSize,s=void 0===i?1:i,a=t.resultEqualityCheck,u=function(n){return function(e,t){if(null===e||null===t||e.length!==t.length)return!1;for(var r=e.length,o=0;o<r;o++)if(!n(e[o],t[o]))return!1;return!0}}(o),l=1===s?function(n){var e;return{get:function(t){return e&&n(e.key,t)?e.value:b},put:function(n,t){e={key:n,value:t}},getEntries:function(){return e?[e]:[]},clear:function(){e=void 0}}}(u):function(n,e){var t=[];function r(n){var r=t.findIndex((function(t){return e(n,t.key)}));if(r>-1){var o=t[r];return r>0&&(t.splice(r,1),t.unshift(o)),o.value}return b}return{get:r,put:function(e,o){r(e)===b&&(t.unshift({key:e,value:o}),t.length>n&&t.pop())},getEntries:function(){return t},clear:function(){t=[]}}}(s,u);function c(){var e=l.get(arguments);if(e===b){if(e=n.apply(null,arguments),a){var t=l.getEntries(),r=t.find((function(n){return a(n.value,e)}));r&&(e=r.value)}l.put(arguments,e)}return e}return c.clearCache=function(){return l.clear()},c}function Z(n){var e=Array.isArray(n[0])?n[0]:n;if(!e.every((function(n){return"function"===typeof n}))){var t=e.map((function(n){return"function"===typeof n?"function "+(n.name||"unnamed")+"()":typeof n})).join(", ");throw new Error("createSelector expects all input-selectors to be functions, but received the following types: ["+t+"]")}return e}function O(n){for(var e=arguments.length,t=new Array(e>1?e-1:0),r=1;r<e;r++)t[r-1]=arguments[r];var o=function(){for(var e=arguments.length,r=new Array(e),o=0;o<e;o++)r[o]=arguments[o];var i,s=0,a={memoizeOptions:void 0},u=r.pop();if("object"===typeof u&&(a=u,u=r.pop()),"function"!==typeof u)throw new Error("createSelector expects an output function after the inputs, but received: ["+typeof u+"]");var l=a,c=l.memoizeOptions,f=void 0===c?t:c,p=Array.isArray(f)?f:[f],g=Z(r),d=n.apply(void 0,[function(){return s++,u.apply(null,arguments)}].concat(p)),h=n((function(){for(var n=[],e=g.length,t=0;t<e;t++)n.push(g[t].apply(null,arguments));return i=d.apply(null,n)}));return Object.assign(h,{resultFunc:u,memoizedResultFunc:d,dependencies:g,lastResult:function(){return i},recomputations:function(){return s},resetRecomputations:function(){return s=0}}),h};return o}var M=O(I),L=M((function(n){return n.usersPage.users}),(function(n){return n.filter((function(n){return n}))})),R=function(n){return n.usersPage.pageSize},B=function(n){return n.usersPage.totalUsersCount},E=function(n){return n.usersPage.activePage},q=function(n){return n.usersPage.isLoading},F=function(n){return n.usersPage.followingInProgress},D=function(n){(0,i.Z)(t,n);var e=(0,s.Z)(t);function t(){var n;(0,r.Z)(this,t);for(var o=arguments.length,i=new Array(o),s=0;s<o;s++)i[s]=arguments[s];return(n=e.call.apply(e,[this].concat(i))).onPageClick=function(e){n.props.getUsersOnClick(e,n.props.pageSize)},n}return(0,o.Z)(t,[{key:"componentDidMount",value:function(){this.props.requestUsers(this.props.activePage,this.props.pageSize,this.props.users)}},{key:"render",value:function(){return(0,g.jsx)(z,{users:this.props.users,activePage:this.props.activePage,totalUsersCount:this.props.totalUsersCount,pageSize:this.props.pageSize,isLoading:this.props.isLoading,follow:this.props.follow,unfollow:this.props.unfollow,followingInProgress:this.props.followingInProgress,onPageClick:this.onPageClick})}}]),t}(l.Component),G=(0,a.$j)((function(n){return{users:L(n),pageSize:R(n),totalUsersCount:B(n),activePage:E(n),isLoading:q(n),followingInProgress:F(n)}}),{requestUsers:S.D7,getUsersOnClick:S.hA,follow:S.ZN,unfollow:S.fv})(D)}}]);
//# sourceMappingURL=497.ac750301.chunk.js.map